const mongoose = require('mongoose');

let orderSchema = new mongoose.Schema({
   items: [{
       code: String,
       count: Number
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
   price: {
       type: Number
   },
   wholesale: {
       type: Number
   },
   retail: {
       type: Number
   },
   totalPirce: {
       type: Number  
   },
   createdAt:{
        type: Date
   }
})

let Order = mongoose.model('Order', orderSchema );

module.exports = {Order};