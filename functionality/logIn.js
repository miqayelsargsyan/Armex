const {Admin} = require('../models/admin');
const _ = require('lodash');

let logIn = (req, res) => {
    let body = _.pick(req.body,['login','password']);
    Admin.findByCredentials(body.login, body.password).then((admin) => {
        return admin.generateAuthToken().then((token) => {
            res.json({ login: body.login, jwtToken: token });
        });
    }).catch((e) => {
      res.status(400).send('You are not logged in');
    });
    
}


module.exports = {logIn};