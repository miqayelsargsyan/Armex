let {Order} = require('../models/order')

let getOrders = (req, res) => {
    let limit = req.params.limit || 2;
    let offset = req.params.offset || 0;
    let prevString = '/api/v1/getOrders/';
    let nextString = '/api/v1/getOrders/';

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
    let sort = req.params.sortBy || undefined;
    let sortType = req.params.sortType || undefined;
    
    Order.find().then((allOrders) => {
        const allCount = allOrders.length;
        Goods.find().limit(Number(limit)).skip(Number(offset)).sort({[sort]: sortType}).then((orders) => {
            //Stugum enq ete verjinnern en next chlni
            if(offset + limit > orders.length) {
                nextString = null
            } else {
                nextString += `&limit=${limit}&offset=${limit + offset}`
            }

            if(brand) {
                orders = orders.filter(item => item.brand === brand)
                if(nextString) nextString += `&brand=${brand}`
                if(prevString) prevString += `&brand=${brand}`
            }
            if(type) {
                orders = orders.filter(item => item.type === type)
                if(nextString) nextString += `&type=${type}`
                if(prevString) prevString += `&type=${type}`
            } 
            if(priceFrom) {
                orders = orders.filter(item => item.price >= priceFrom)
                if(nextString) nextString += `&priceFrom=${priceFrom}`
                if(prevString) prevString += `&priceFrom=${priceFrom}`
            }
            if(priceTo) {
                order = orders.filter(item => item.price <= priceTo)
                if(nextString) nextString += `&priceFrom=${priceTo}`
                if(prevString) prevString += `&priceFrom=${priceTo}`
            }
                res.send({
                    next: nextString,
                    prev: prevString,
                    count: allCount,
                    currentCount: orders.length,
                    results: orders
            })
        })  
    })
}

module.exports = {getOrders}