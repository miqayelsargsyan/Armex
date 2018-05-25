const {Admin} = require('../models/admin');
const {logger} = require('../logger/logger')
const _ = require('lodash');


let signUp = (req, res) => {
    let body = _.pick(req.body,['login','password']);

    user = new Admin(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user)
    }).catch((e) => {logger.log(e)});
}


module.exports = {signUp};