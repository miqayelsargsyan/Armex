const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require ('lodash');
const bcrypt = require('bcryptjs');

let adminSchema = new mongoose.Schema({
    login: {
    type: String,
    required: true,
    minlenght: 1,
    trim: true,
    unique: true
 },
    password: {
        type: String,
        required:true,
        minlenght: 6
    },
    tokens: [{
        access: {
            type: String
        //   required: true
        },
        token: {
            type: String
            // required: true
            
        }
    }]
    
}); 

adminSchema.methods.toJSON = function() {
    let admin = this;
    let adminObject = admin.toObject();
    return _.pick(adminObject,['_id', 'login']);
};

adminSchema.methods.generateAuthToken = function () {
    let admin = this;
    let access = 'auth';
    let token = jwt.sign({_id: admin._id.toHexString(), access}, '3s-ge').toString();
        admin.tokens.push({access, token});

    return admin.save().then(() => {
       return token;
    });
};

adminSchema.methods.removeToken = function (token) {
    let admin = this;
  
    return admin.update({},{
      $pull: {
        tokens: {token}
      }
    }, {multi: true});
  };

adminSchema.statics.findByToken = function (token) {
 let Admin = this;
 let decoded;

  try {
   decoded = jwt.verify(token, '3s-ge');
  } catch(e) {
   return Promise.reject();
  }
  return Admin.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

adminSchema.statics.findByCredentials = function(login, password) {
  let Admin = this;
  return Admin.findOne({login}).then((admin) => {
      if(!admin) {
          return Promise.reject();
      }
      return new Promise((resolve, reject) => {
     bcrypt.compare(password, admin.password, (err, res) => {
         if(res){
             resolve(admin);
         } else {
             reject();
         }
     });
    });
  })
};

//Hashing password
adminSchema.pre('save', function(next) {
   let admin = this;

   if(admin.isModified('password')) {
       bcrypt.genSalt(10, (err,salt) => {
           bcrypt.hash(admin.password, salt, (err, hash) => {
               admin.password = hash;
               next();
           });
       });
   } else{
       next();
   };
});


let Admin = mongoose.model('Admin', adminSchema );

module.exports = {Admin};