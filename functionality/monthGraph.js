const {Order} = require('../models/order')
const {logger} = require('../logger/logger')
const moment = require('moment')

let monthGraph = (req, res) => {
    let now = moment();
    let data = [];
    let income;
    let soldPrice;
    let createDate;
    Order.find({status: 2}).then((orders) => {
        orders.forEach((order) => {
            soldPrice = order.items[0].wholesale || order.items[0].retail;
            income = (soldPrice - order.items[0].price)* orders.length
            createDate = moment(order.createdAt);
            if(now.year() == createDate.year() && now.month() == createDate.month()){
                if(data[createDate.date() - 1]) {
                    data[createDate.date() - 1] += income
                } else {
                    data[createDate.date() - 1] = income
                }
            }
        })
        console.log(income)
        res.send(data);
    }).catch((e) => logger.debug(e))
}

module.exports = {monthGraph}