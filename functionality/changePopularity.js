// let {Goods} = require('../models/goods')

// let changePopularity = (req, res) => {

//     let id = req.params.id

//     //     Goods.findOneAndUpdate({_id: id}, {$set: {popularity: +1 }}, {new: true}).then((goods) => {
//     //         res.send(goods)
//     //     })
//         Goods.find({_id: id}).then((goods) => {
//             let popularity = goods.popularity
//             console.log(popularity)
//                 Goods.findOneAndUpdate({goods}, {$set: {popularity: Number(popularity) +1}}, {new: true}).then((goods) => {
//                     res.send(goods)
//                 })
//         })

// }

// module.exports = {changePopularity}