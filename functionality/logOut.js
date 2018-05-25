const {Admin} = require('../models/admin')
const {logger} = require('../logger/logger')
let token;

let logOut = function(req, res) {
    Admin.find().then((admin) => {
      token = req.headers
      admin[0].update({$pull: {tokens: token}}).then((adm) => {
        res.send(adm)
      })
    }).catch((e) => {logger.debug(e)})
}

module.exports = {logOut}