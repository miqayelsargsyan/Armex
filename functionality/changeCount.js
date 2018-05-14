let {Goods} = require('../models/goods')

let changeCount = (req, res) => {
    let id = req.params.id
    Goods.findOneAndUpdate({_id: id}, {$set: {count: req.body.count}}, {new: true}).then((goods) => {
        res.send(goods)
    })
}

module.exports = {changeCount}