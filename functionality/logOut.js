const {Admin} = require('../models/admin')
let token;

let logOut = function(req, res) {
    Admin.find().then((admin) => {
      token = req.headers
      console.log(token)
      
      admin[0].update({$pull: {tokens: token}}).then((adm) => {
        res.send(adm)
      })
    }) 
}

module.exports = {logOut}