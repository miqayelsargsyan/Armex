let mongoose = require('mongoose');
let config = require('../config')

mongoose.Promise = global.Promise;
mongoose.connect(config.mongo_server);

module.exports = {mongoose};