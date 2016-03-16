var Users = require('../models/users');
var mailder = require('nodemailer');
var Sessions = require("../models/sessions");
var ifExists = require("../utilities/ifExists");
var GUID = require("../utilities/GUID");

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

  login: async function (req, res, next){
    console.log("login requst body:",req.body);
    var data = req.body;
    var user, session;
    try{
      user = await ifExists.user(data.username);

      if (!user)
        return next({message: "please create a new account", status: 401});

      if(user.activated === false)
        return next({message: "please activate your account", status: 401});
      
      if(data.username != user.username)
        return next({message: "username do not match", status: 401});

      if(data.password != user.password)
        return next({message: "invalid password!", status: 401});

      session = await ifExists.session(data.username);
      //if the session does not exist, so create one session
      if (!session) {
        var {username, _id} = user;
        session = await Sessions.create({user: {username, _id}, session_token: GUID()});
      }

      var new_expire = new Date(new Date().getTime()+ 2 * 7 * 24 * 60 * 60 * 1000);
      // session = await Sessions.updateSession(data.username, GUID(), new_expire);

      await session.update({ expire_At: new_expire }).exec();

      return res.send(session);

    } catch(e) {
      return next({message: e.message});
      // 
      // try{
      //   session = new Sessions({username: user.username, session_token: GUID()});
      //   session.save(function(err){
      //     if(err){
      //       return next({message: err.message});
      //     }
      //   })
      //   console.log("create a new session:",session);
      //   return res.send(session);
      // } catch(e) {
      //   return next({message: e.message});
      // }
    }

    //if the session exists, so update/extend the expire time
    // try{
    //   var new_expire = new Date(new Date().getTime()+ 2 * 7 * 24 * 60 * 60 * 1000);
    //   session = await Sessions.updateSession(data.username, GUID(), new_expire);
     
    // } catch(e){
    //   return next({message: e.message});
    // }

    // try{
    //   session = await Sessions.findByUsername(data.username);
    //   console.log("updated session:",session);
    //   return res.send(session);
    // }catch(e){
    //   return next({message: e.message});
    // }

  },

  renderUsers: function (req, res, next) {
    Users.find(function (err, docs){
      if(err){
        next(new Error("error! render failed"));
      }
      res.render('users', { data: docs });
      res.send({})
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

  getOneUser: async function (req, res, next){
    var id = req.params.id;
    try{
      var user = await Users.findByUserId(id);
      res.send(user);
      console.log(user);
    }catch(e){
      return next({message: "please login", status: 401});
    }
    
  },
}