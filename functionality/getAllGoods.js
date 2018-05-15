let {Goods} = require('../models/goods')

let getAllGoods = (req, res) => {
    let offset = undefined;
    offset = offset + 12;
    let limit;

    if (limit === undefined) {
        limit = 12;
    }

    Goods.find().then((goodS) => {
        Goods.find().limit(Number(limit)).skip(Number(offset)).then((goods) => {
            res.send({
                count: goodS.length,
                results: [{
                    resultsCount: goods.length,
                    goods
                }]
            })
        }).catch((e) => {console.log(e)})
    })
     
}

module.exports = {getAllGoods}