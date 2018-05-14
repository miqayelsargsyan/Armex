let {Goods} = require('../models/goods')

let body;
let goods;

    let currentdate = new Date(); 
    let datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/"
                + currentdate.getFullYear() + " "
                + currentdate.getHours() +  ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();



let addGoods = (req, res) => { 
    Goods.find().then((goods) => {
        for( let i = 0; i < goods.length; ++i){
            if(goods[i].code === req.body.code){
                return  res.status(400).send('You have already added the same product')
    }
        }
    })

    body = {
        brand: req.body.brand,
        name: req.body.name,
        type: req.body.type,
        price: req.body.price,
        createdAt: datetime,
        image: req.body.image,
        characteristics: req.body.characteristics,
        count: req.body.count,
        code: req.body.code,
        popularity: req.body.popularity,
        sale: {
            isSale: false,
            new_price: req.body.new_price,
            img: req.body.img
        }

    }
    
        goods = new Goods(body)
            goods.save().then((goods) => {
                res.send(goods);
        }).catch((e) => {console.log(e)})
}

module.exports = {addGoods}

