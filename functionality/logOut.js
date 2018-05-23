const {Admin} = require('../models/admin')
let _ = require('lodash')
 
let logOut = function(req, res) {
    Admin.find().then((admin) => {
        let body = _.pick(req.body, 'token');
        console.log(body.token)
        admin[0].removeToken(body.token);
      });
        return res.status(200).send();
}




module.exports = {logOut}