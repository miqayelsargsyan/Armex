let {Goods} = require('../models/goods')
const {logger} = require('../logger/logger')

let changePopularity = (req, res) => {

    let id = req.params.id
    
        Goods.find({_id: id}).then((goods) => {
            let popularity = goods[0].popularity;
                Goods.findOneAndUpdate({_id: id}, {$set: {popularity: popularity + 1}}, {new: true}).then((goods) => {
                    res.send(goods)
                })
        }).catch((e) => logger.log(e))
}

module.exports = {changePopularity}
