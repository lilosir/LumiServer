var Users = require('../models/users');
var Sessions = require('../models/sessions');

var ifExists = {

  user: function(username){

    var p = new Promise(function (resolve, reject) {
      Users.findOne(username, function(err, user){
        if(user.length > 0){
          resolve(user[0]);
        }
        else{
          reject(err || new Error("user not found, please sign up"));
        }
      })
    });
    return p;
  },

  session: function(username){
    var p = new Promise(function (resolve, reject){
      Sessions.findOne(username, function (err, session){
        if(session.length>0){
          resolve(session[0]);
        }else{
          reject(err);
        }
      })
    });
    return p;
  },
}

module.exports = ifExists;
