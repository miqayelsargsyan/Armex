const {Order} = require('../models/order')
const {Goods} = require('../models/goods')

let orderCount;
let goodsCount
let code;

let changeCount = (req, res) => {
    code = req.params.code
        Order.find().then((orders) => {
            orders = orders.filter(order => order.items[0].code === code)
            orderCount = orders[0].items[0].count
            console.log(orderCount)
        }).catch((e) => {console.log(e)})
        Goods.find({code: code}).then((goods) => {
            goodsCount = goods[0].count
                Goods.findOneAndUpdate({code: code}, {$set: {count: goodsCount - orderCount}}, {new: true}).then((goods) => {
                    res.send(goods)
                }).catch((e) => {console.log(e)})
            }).catch((e) => {console.log(e)})
}

module.exports = {changeCount}
