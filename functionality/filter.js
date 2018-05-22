let {Goods} = require('../models/goods')

let filter = (req, res) => {

    //section of limit and offset
    let limit = req.params.limit || 2;
    let offset = req.params.offset || 0;
    let prevString = '/api/v1/getGoods/';
    let nextString = '/api/v1/getGoods/';

    if(offset == 0 || offset == limit) {
        prevString = null
    } else {
        prevString += `&limit=${limit}&offset=${offset - limit < 0 ? 0 : offset - limit}`
    }

    // Section of filtering goods by several parameters
    let brand = req.params.brand || undefined;
    let type = req.params.type || undefined;
    let priceFrom = req.params.priceFrom || undefined;
    let priceTo = req.params.priceTo || undefined;
    let sortBy = req.params.sortBy || 'popularity';
    let sortType = req.params.sortType || 1;
    
    Goods.find().then((allGoods) => {
        const allCount = allGoods.length;
        Goods.find().limit(Number(limit)).skip(Number(offset)).sort({[sortBy]: sortType}).then((goods) => {
            //Stugum enq ete verjinnern en next chlni
            if(offset + limit > goods.length) {
                nextString = null
            } else {
                nextString += `&limit=${limit}&offset=${limit + offset}`
            }

            if(brand) {
                goods = goods.filter(item => item.brand === brand)
                if(nextString) nextString += `&brand=${brand}`
                if(prevString) prevString += `&brand=${brand}`
            }
            if(type) {
                goods = goods.filter(item => item.type === type)
                if(nextString) nextString += `&type=${type}`
                if(prevString) prevString += `&type=${type}`
            } 
            if(priceFrom) {
                goods = goods.filter(item => item.price >= priceFrom)
                if(nextString) nextString += `&priceFrom=${priceFrom}`
                if(prevString) prevString += `&priceFrom=${priceFrom}`
            }
            if(priceTo) {
                goods = goods.filter(item => item.price <= priceTo)
                if(nextString) nextString += `&priceFrom=${priceTo}`
                if(prevString) prevString += `&priceFrom=${priceTo}`
            }
                res.send({
                    next: nextString,
                    prev: prevString,
                    count: allCount,
                    currentCount: goods.length,
                    results: goods
            })
        })  
    })
}


module.exports = {filter}