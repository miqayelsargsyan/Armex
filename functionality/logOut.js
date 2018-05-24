const {Admin} = require('../models/admin')
let pull = require('array-pull') 
let token;

let logOut = function(req, res) {
    Admin.find().then((admin) => {
      token = req.body
      admin[0].update({$pull: {tokens: token}}).then((adm) => {
        res.send(adm)
      })
    }) 
}

module.exports = {logOut}