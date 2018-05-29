const {Admin} = require('../models/admin');
const {logger} = require('../logger/logger')

let authenticate = (req, res, next) => {
    let token = req.header('x-auth');
    Admin.findByToken(token).then((admin) => {
        if(!admin){
            return res.send('You are not Admin!')
        }
            req.admin = admin;
            req.token = token;   
            next();       
    },(e) => {
        res.status(401).logger.error(e);
        }).catch((e) => {logger.debug(e)})
} 

module.exports = {authenticate};