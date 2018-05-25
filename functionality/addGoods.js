let {Goods} = require('../models/goods')

let body;
let goods;

let addGoods = (req, res) => { 
    Goods.find().then((goods) => {
        for( let i = 0; i < goods.length; ++i){
            if(goods[i].code === req.body.code){
                return  res.status(400).send('You have already added the same product')
            }
        }
    })

    body = {
        brand: req.body.brand,
        name: req.body.name,
        type: req.body.type,
        costPrice: req.body.costPrice,
        wholesale: req.body.wholesale,
        retail: req.body.retail,
        image: req.body.image,
        characteristics: req.body.characteristics,
        count: req.body.count,
        code: req.body.code,
        popularity: req.body.popularity,
        isSale: req.body.isSale,
        saleImage: req.body.saleImage,
        newPrice: req.body.newPrice,
        createdAt: new Date()
    }
        goods = new Goods(body)
            goods.save().then((goods) => {
                res.send(goods);
        }).catch((e) => {console.log(e)})
}

module.exports = {addGoods}

