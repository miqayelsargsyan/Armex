let {Goods} = require('../models/goods')

let getAllGoods = (res) => {
    Goods.find().then((goods) => {
        res.send(goods)
    }).catch((e) => {console.log(e)})
}

module.exports = {getAllGoods}