var Users = require('../models/users');
var Sessions = require('../models/sessions');
var Gcms = require('../models/gcms');

var ifExists = {

  user: async function(username){
    
    try {
      var user = await Users.findByUsername(username);
      return user;
    }catch(e){
      return false;
    }
  },

  findRecent: async function(id){
    try{
      var recent = await Users.findById(id).populate('recent', '_id');
      console.log('recent if:',recent)
      return recent;
    }catch(e){
      console.log(e)
      return false;
    }
  },

  gcm: async function(token, userid){
    try{
      var gcm = await Gcms.find({token: token,'users': userid});
      if(gcm.length > 0){
        return gcm;
      }else{
        return false;
      }

    }catch(e){
      console.log(e);
      return false
    }
  },

  gcmToken: async function(token){
    try{
      var gcm = await Gcms.find({token: token});
      if(gcm.length > 0){
        return gcm;
      }else{
        return false;
      }

    }catch(e){
      console.log(e);
      return false
    }
  },

  // session: async function(username){
  //   try {
  //     var result = await Sessions.findOne({'user.username': username}).exec();
  //     return result;
  //   } catch(e) {
  //     return false;
  //   }
  // },
}

module.exports = ifExists;
