const mongoose = require('mongoose');

let orderSchema = new mongoose.Schema({
    items: [{
        code: String,
        count: Number,
        price: Number,
        retail: Number,
        wholesale: Number
    }],
    user: {
        phone: String,
        name: String,
        email: String,
        address: String 
   },
    status: {
       type: Number
   },
    totalPrice: {
       type: Number  
   },
    createdAt:{
        type: Date
   }
})

let Order = mongoose.model('Order', orderSchema );

module.exports = {Order};