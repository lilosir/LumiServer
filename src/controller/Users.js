var Users = require('../models/users');
var mailder = require('nodemailer');
var Sessions = require("../models/sessions");
var ifExists = require("../utilities/ifExists");
var GUID = require("../utilities/GUID");

var Ctrl = require('../Controller');

module.exports = Ctrl.createController({

  //the array below contains the registed functions which are need to add extra functions before executing
  findSession: ['getUserFriends'],

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

      session = await Sessions.findOne({user:user._id}).exec();

      //if the session does not exist, so create one session
      if (!session) {
        // var {username, user_id} = user;

        var username = user.username;
        var user_id = user._id;
        
        session = await Sessions.create({user: user_id, session_token: GUID()});
      }
      console.log("before update session",session);
      var new_expire = new Date(new Date().getTime()+ 2 * 7 * 24 * 60 * 60 * 1000);

      await session.update({ expire_At: new_expire,session_token: GUID() }).exec();
      console.log("updated session1:",session);
     
      session = await Sessions.findOne({user:user._id}).populate("user", "username avatar").exec();

      console.log("updated session2:",session);
      return res.send(session);

    } catch(e) {
      return next({message: e.message});
    }
  },

  renderUsers: function (req, res, next) {
    Users.find(function (err, docs){
      if(err){
        next(new Error("error! render failed"));
      }
      res.render('users', { data: docs });
    });
  },

  activateUser: function(req, res, next){
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

  getUserFriends: async function ({params, current_user, body, query}, res, next){
  
    // console.log("getOneUser", req.current_user);
    // console.log('params',params);
    // console.log('current_user',current_user);    

    if (params.id == current_user._id){
      try{
        var user = await Users.findById({_id: current_user._id}).populate("friends",'username avatar');  
        var friends = user.friends;
        res.send(friends);
        // return next({message: "shsi", status: 500});
      }catch(e){
        console.log(e)
      }
      
    }
    else{
      res.send(current_user);
      console.log("illegal user");
    }     
  },

  searchFriends: async function(req, res, next){
    console.log("login query name:",req.query.name);
    
    try{
      var name = await Users.findBySimilarUsername(req.query.name);
      res.send(name); 
    }catch(e){
      console.log(e);
    }
    

  },

});
