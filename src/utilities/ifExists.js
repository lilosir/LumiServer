var Users = require('../models/users');
var Sessions = require('../models/sessions');

var ifExists = {

  user: async function(username){
    try {
      var user = await Users.findByUsername(username);
      return user;
    }catch(e){
      return false;
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
