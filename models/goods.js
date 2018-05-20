const mongoose = require('mongoose');

let goodsSchema = new mongoose.Schema({
    brand: {
        type: String
    },
    type: {
        type: String
    },
    price: {
        type: Number
    },
    createdAt: {
        type: String,
        default: ""
    },
    name: {
        type: String
    },
    image: {
        type: String,
        default: ''
    },
    characteristics: [
        {
            title: String,
            value: String
        }
    ],
    count: {
        type: Number
    },
    code: {
        type: String
    },
    isSale: {
        type: Boolean
    },
    saleImage: {
        type: String
    },
    newPrice: {
        type: Number
    }
})

let Goods = mongoose.model('Goods', goodsSchema );

module.exports = {Goods};