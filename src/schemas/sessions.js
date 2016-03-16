var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var sessions = new mongoose.Schema({
  // username: String,
  session_token: String,
  updated_At: {type:Date, default: new Date()},
  expire_At: {type:Date, default: new Date(new Date().getTime() + 2 * 7 * 24 * 60 * 60 * 1000)},
  user: { username: String, _id: Schema.Types.ObjectId},
});

sessions.statics = {

  removeAll: function(cb){
    return this.remove({}).exec(cb);
  },

  findAll: function (cb){
    return this.find({}).exec(cb);
  },

  findByUsername: function (username, cb){
    return this.findOne({'user.username':username}).exec(cb);
  },

}

module.exports = sessions;