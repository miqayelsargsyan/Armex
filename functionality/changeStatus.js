const {Order} = require('../models/order');
const {logger} = require('../logger/logger');


let inProcess = (req, res) => {
    let id = req.params.id
        Order.find({_id: id}).then((order) => {
            let status = order[0].status;
                Order.findOneAndUpdate({_id: id}, {$set: {status: 1}}, {new: true}).then((order) => {
                    res.send(order)
                })
        }).catch((e) => logger.log(e))
}

let delivered = (req, res) => {
    let id = req.params.id
        Order.find({_id: id}).then((order) => {
            let status = order[0].status;
                Order.findOneAndUpdate({_id: id}, {$set: {status: 2}}, {new: true}).then((order) => {
                    res.send(order)
                })
        }).catch((e) => logger.log(e))
}

let cancelled = (req, res) => {
    let id = req.params.id
        Order.find({_id: id}).then((order) => {
            let status = order[0].status;
                Order.findOneAndUpdate({_id: id}, {$set: {status: -1}}, {new: true}).then((order) => {
                    res.send(order)
                })
        }).catch((e) => logger.log(e))

let returned = (req, res) => {
    let id = req.params.id
        Order.find({_id: id}).then((order) => {
            let status = order[0].status;
                Order.findOneAndUpdate({_id: id}, {$set: {status: 1}}, {new: true}).then((order) => {
                    res.send(order)
                })
        }).catch((e) => logger.log(e))
}

}

module.exports = {inProcess, delivered, cancelled, returned}