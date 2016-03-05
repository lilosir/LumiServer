var Users = require('../models/users');
var mailder = require('nodemailer');
var Sessions = require("../models/sessions");
var ifExists = require("../utilities/ifExists")

module.exports = {

  registers: function (req, res, next) {
    console.log(req.body);
    var data = req.body;

    ifExists.user(data.username).then(function(user) {    
      console.log(user);   
      res.status(403).send({error: 'this user already exits!'});
    })
    .catch(function() {
      // register user
      var activate_token = new Date().getTime();
      var user = new Users({username: data.username, password: data.password, activated: false, activate_token: activate_token});
      
      user.save(function (err, s) {
        if (err) {
          next(new Error("error! save failed"));
        }
        user.sendVerification();        
        res.send({message:'check your mailbox to activate'});
      });
    })
  },

  login: function(req,res,next){
    console.log("login requst body:",req.body);
    var data = req.body;

    ifExists.user(data.username)
    .then(function(user) {
      if(user.activated === false)
        throw new Error("please activate your account");
      if(data.username === user.username && data.password === user.password){

        ifExists.session(data.username).then(function (session){
          // if the session exists, it will extend/update the session time
          Sessions.updateSession(data.username,data.updated_At,data.expire_At, function (err,session){
            if(err){
              console.log("update the session err:",err);
              throw err;
            }
            console.log("update the session:",session);
          });

        }).catch(function(){
          //if the session does not exist, which means the first time to login, need create a session
          var session = new Sessions({username: user.username, updated_At: data.updated_At, expire_At: data.expire_At});
          console.log("session:",session);
          session.save(function (err,s){
            if(err){
              throw err;
            }
            res.send(s);
          });
        });    

      }else{
        console.log("username and password do not match");
        throw new Error("username and password do not match");
      }
    })
    .catch(function(err) {
      res.status(403).send({error: err.message});
    })
  },


  renderUsers: function (req, res, next) {
    Users.find(function (err, docs){
      if(err){
        next(new Error("error! render failed"));
      }
      res.render('users', { data: docs });
    });
  },

  verifyUser: function(req, res, next){
    var user_id = req.params.id;
    Users.find({_id: user_id, activate_token: req.query.activate_token}, 
      function(err, doc) {
      if(doc && doc[0]){
        Users.activateUser(user_id, function(err){
          if(err){
            console.error(err);
          } else
          console.log("activated successfully!");          
        })
        res.send("activated successfully!");
      } else{
        res.status(405).send({error: 'activation failure'});
      }
    });
  },
}