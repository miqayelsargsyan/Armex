let {Goods} = require('../models/goods')

let getSales = (req, res) => {
    let limit = req.params.limit || 12;
    let offset = req.params.offset || undefined;
    let newOffset;
    let prevString;

    if(offset === undefined) {
        offset = 0
        newOffset = 0
    } else {
        newOffset = Number(offset) + Number(limit)
    }

    if(newOffset === 0) {
        prevString = null
    } else {
        prevString = `/api/getAllGoods/limit=${limit}/offset=${newOffset - limit}`
    }

    // Section of finding goods by several parameters
    let brand = req.params.brand || undefined;
    let type = req.params.type || undefined;
    let price = req.params.price || undefined;
    let popularity = req.params.popularity || undefined;
    let date = req.params.date || undefined;
    let name = req.params.name || undefined;

    if(brand == undefined && type == undefined && price == undefined && popularity == undefined && date == undefined && name == undefined){
        Goods.find().then((goodS) => {
            Goods.find({isSale: true}).limit(Number(limit)).skip(Number(newOffset)).then((goods) => {
                res.send({
                    next: `/api/getAllGoods/limit=${limit}/offset=${newOffset}`,
                    prev: prevString,
                    count: goodS.length,
                    results: [{
                        resultsCount: goods.length,
                        goods
                    }]
                })
            }).catch((e) => {console.log(e)})
        })  
    } else {
        Goods.find().then((goodS) => {
            Goods.find({$or: [{brand: brand}, {type: type}, {price: price}, {popularity: popularity}, {createdAt: date}, {name: name}], isSale: true}).limit(Number(limit)).skip(Number(newOffset)).then((goods) => {
                if(goods.isSale == false){
                    return res.send('There are no goods statisfying to you filter')
                } 

                res.send({
                    next: `/api/getAllGoods/limit=${limit}/offset=${newOffset}/brand=${brand}/type=${type}/price=${price}/popularity=${popularity}/date=${date}/name=${name}`,
                    prev: prevString,
                    count: goodS.length,
                    results: [{
                        resultsCount: goods.length,
                        goods
                    }]
                })
            }).catch((e) => {console.log(e)})
        })  
    }
}


module.exports = {getSales}