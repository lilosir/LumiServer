var mongoose = require('mongoose');

var sessions = mongoose.Schema({
  username: String,
  updated_At: {type:Date, default: Date.now},
  expire_At: {type:Date, default: new Date(new Date().getTime() + 2 * 7 * 24 * 60 * 60 * 1000)},
});

sessions.statics = {

  removeAll: function(cb){
    return this.remove({}).exec(cb);
  },

  findAll: function (cb){
    return this.find({}).exec(cb);
  },

  findOne: function (username, cb){
    return this.find({username:username}).exec(cb);
  },

  updateSession: function (username, time1, time2, cb){
    return this.update({username: username},{
      updated_At: time1, 
      expire_At: time2,
    }).exec(cb);
  },

}

module.exports = sessions;