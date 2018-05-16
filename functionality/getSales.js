let {Goods} = require('../models/goods')

let getSales = (req, res) => {
    Goods.find({isSale: true}).then((goods) => {
        res.send(goods)
    }).catch((e) => {console.log(e)})
}


module.exports = {getSales}