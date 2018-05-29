const {Admin} = require('../models/admin');


let authenticate = (req, res, next) => {
    let token = req.header('x-auth');
    Admin.findByToken(token).then((admin) => {
        if(!user){
            return res.send('You are not Admin!')
        }
            req.admin = admin;
            req.token = token;   
            next();       
    },(e) => {
        res.status(401).send(e);
        })
} 

module.exports = {authenticate};