const {Order} = require('../models/order')
const {logger} = require('../logger/logger')

let monthGraph = (req, res) => {
    Order.find({status: 2}).then((orders) => {
            let date = new Date();
            let currentMonth = JSON.stringify('0' + (date.getUTCMonth() + 1));
            if((date.getUTCMonth() + 1) > 9) {
                currentMonth === JSON.stringify(date.getUTCMonth() + 1)
            }
            let ordersCreatedAt = orders[0].createdAt;
            ordersCreatedAt = JSON.stringify(JSON.stringify(orders[0].createdAt).slice(6, 8));
            orders = orders.filter(order => order.createdAt = currentMonth)
            res.send(orders)
    }).catch((e) => logger.debug(e))
}

module.exports = {monthGraph}