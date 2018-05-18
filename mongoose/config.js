let mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://misha:mishana2101@ds135866.mlab.com:35866/armex');

module.exports = {mongoose};