const {Order} = require('../models/order')
const {Goods} = require('../models/goods')
const {logger} = require('../logger/logger')

let orderGoods = (req, res) => {
    let goodsCount;
    let orderCount;

    let body = {
        items: req.body.items,
        totalPrice: req.body.price,
        user: req.body.user,
        createdAt: new Date(),
        status: 0
    }

    body.items.forEach((item) => {
        Goods.find({code: item.code}).then((goods) => {
            goodsCount = goods[0].count
            orderCount = item.count
        })
        Goods.findOneAndUpdate({code: item.code}, {$set: {count: goodsCount - orderCount}}, {new: true}).then((goods) => {
            res.send(goods)
        }).catch((e) => {logger.debug(e)})
    })

    let orderObj = new Order(body)
    
    orderObj.save().then((order) => {
        res.send({order})
    }).catch((e) => logger.debug(e))
}

module.exports = {orderGoods}