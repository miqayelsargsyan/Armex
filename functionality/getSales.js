const {Goods} = require('../models/goods')
const {logger} = require('../logger/logger')

let getSales = (req, res) => {
    Goods.find({isSale: true}).then((goods) => {
        res.send(goods)
    }).catch((e) => {logger.debug(e)})
}


module.exports = {getSales}