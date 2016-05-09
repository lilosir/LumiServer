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
