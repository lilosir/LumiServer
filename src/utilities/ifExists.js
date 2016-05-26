var Users = require('../models/users');
var Sessions = require('../models/sessions');
var Gcms = require('../models/googleCloudMessaging');

var ifExists = {

  user: async function(username){
    
    try {
      var user = await Users.findByUsername(username);
      console.log("this user", user)
      if(user){
        return user;
      }else{
        return false;
      }      
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

  gcmToken: async function(userid, token){
    try{
      var gcm = await Gcms.findOne({'user': userid,tokens: token}).exec();
      if(gcm){
        return gcm;
      }else{
        return false;
      }

    }catch(e){
      console.log(e);
      return false
    }
  },

  gcmUser: async function(userid){
    try{
      var gcm = await Gcms.findOne({user: userid}).exec();
      if(gcm){
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
