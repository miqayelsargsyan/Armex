const {Order} = require('../models/order')
const {Goods} = require('../models/goods')
const {logger} = require('../logger/logger')

let orderCount;
let goodsCount
let code;

let changeCount = (req, res) => {
    code = req.params.code
        Order.find().then((orders) => {
            orders = orders.filter(order => order.items[0].code === code)
            orderCount = orders[0].items[0].count
        }).catch((e) => {logger.debug(e)})
        Goods.find({code: code}).then((goods) => {
            goodsCount = goods[0].count
                Goods.findOneAndUpdate({code: code}, {$set: {count: goodsCount - orderCount}}, {new: true}).then((goods) => {
                    res.send(goods)
                }).catch((e) => {logger.debug(e)})
            }).catch((e) => {logger.debug(e)})
}

module.exports = {changeCount}
