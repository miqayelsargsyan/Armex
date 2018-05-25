const {Order} = require('../models/order')
const {Goods} = require('../models/goods')
const {logger} = require('../logger/logger')

let orderGoods = (req, res) => {

    let body = {
        items: req.body.items,
        status: req.body.status,
        totalPrice: req.body.price,
        user: req.body.user,
        createdAt: new Date()
    }

    let orderObj = new Order(body)
    
    orderObj.save().then((order) => {
        res.send({
            order
        })
    }).catch((e) => logger.debug(e))
}

module.exports = {orderGoods}