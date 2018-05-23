const {Admin} = require('../models/admin');
const _ = require('lodash');

let logIn = (req, res) => {
    let user = _.pick(req.body,['login','password']);
    Admin.findByCredentials(user.login, user.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.json({ login: user.login, jwtToken: token });
        });
    }).catch((e) => {
      res.status(400).send('You are not logged in');
    });
    
}


module.exports = {logIn};