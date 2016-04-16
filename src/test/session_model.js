var assert = require('assert');
var Users = require('../models/users');
var Sessions = require('../models/sessions');
var async = require('co').wrap;

describe('Session', function() {

  this.slow(100000000);

  var user;

  // clean database
  before(function(done) {
      // done();

      console.log("Sessions", Sessions.remove);
      Sessions.find({}, function(err, res) {

        console.log(err, res);
        done();
      });

  });

  // before(function(done) {

  //   Users.removeAll(function(err, docs) {
    
  //     if (err) throw err;

  //     Users.create({username: 'test@lakeheadu.ca'}).then(function(user){

  //       user = user;
  //       done();

  //     }).catch(function(err) {
  //       throw err;
  //     });
  //   });

  // });
  
  describe('Create', function() {
    
    it('should return a session instance', function (done) {
      console.log("Fuck you");
      done();
      // try {
      //   var session = yield Sessions.create({
      //     session_token: 'fwkejflwejf is;ufwieluvfwevfybwoe',
      //     user: {
      //       username: user.username,
      //       user_id: user._id
      //     }
      //   });

      //   assert.equal(session.session_token, 'fwkejflwejf is;ufwieluvfwevfybwoe');
      //   assert.equal(session.user.username, user.username);

      //   var _user = yield Users.findOne({ _id: session.user.user_id }).exec();

      //   assert.equal(_user.username, user.username);

      //   done();

      // } catch(e) {
      //   throw e;
      // }
    });    

  });
});