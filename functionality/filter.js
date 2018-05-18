let {Goods} = require('../models/goods')

let filter = (req, res) => {

    //section of limit and offset
    let limit = req.params.limit || 2;
    let offset = req.params.offset || 0;
    let prevString = '/api/getGoods/';
    let nextString = '/api/getGoods/';

    if(offset == 0 || offset == limit) {
        prevString = null
    } else {
        prevString += `&limit=${limit}&offset=${offset - limit < 0 ? 0 : offset - limit}`
    }

    // Section of filtering goods by several parameters
    let brand = req.params.brand || undefined;
    let type = req.params.type || undefined;

    Goods.find().then((allGoods) => {
        const allCount = allGoods.length;
        Goods.find({$or: [{brand: brand}, {type: type}]}).limit(limit).skip(offset).then((goods) => {
            //Stugum enq ete verjinnern en next chlni
            if(offset + limit > goods.length) {
                nextString = null
            } else {
                nextString += `&limit=${limit}&offset=${limit + offset}`
            }

            if(brand) {
                goods = goods.filter(item => item.brand === brand)
                nextString += `&brand=${brand}`
                prevString += `&brand=${brand}`
            }
            if(type) {
                goods = goods.filter(item => item.type === type)
                nextString += `&type=${type}`
                prevString += `&type=${type}`
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