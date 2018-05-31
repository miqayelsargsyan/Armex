const {Order} = require('../models/order')
const {logger} = require('../logger/logger')
const moment = require('moment')

let monthGraph = (req, res) => {
    let now = moment();
    let data = [];
    Order.find({status: 2}).then((orders) => {
        orders.forEach((order) => {
            console.log(order.totalPrice)
            let createDate = moment(order.createdAt);
            if(now.year() == createDate.year() && now.month() == createDate.month()){
                if(data[createDate.date() - 1]) {
                    data[createDate.date() - 1] += order.totalPrice
                } else {
                    data[createDate.date() - 1] = order.totalPrice
                }
            }
        })
        res.send(data);
    }).catch((e) => logger.debug(e))
}

module.exports = {monthGraph}