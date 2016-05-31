var Users = require('../models/users');
var mailder = require('nodemailer');
var Sessions = require("../models/sessions");
var Notifications = require("../models/notifications");
var ifExists = require("../utilities/ifExists");
var GUID = require("../utilities/GUID");

var Ctrl = require('../Controller');
var gcm = require('node-gcm');
var Gcms = require('../models/googleCloudMessaging');

module.exports = Ctrl.createController({

  //the array below contains the registed functions which are need to add extra functions before executing
  findSession: ['getMyself', 'getUserFriends', 'updateRecent', 'getRecent', 'isFriend',
                'addFriendRequest', ],

  registers: async function (req, res, next) {
    console.log(req.body);
    var data = req.body;

    try{
      var user = await ifExists.user(data.username);

      if(user){
        return res.send({message: "this account already exists", status: 401});
      }

      var activate_token = new Date().getTime();
      var nickname = data.username.split("@lakeheadu.ca")[0];

      user = await Users.create({nickname:nickname, username: data.username, password: data.password, activated: false, activate_token: activate_token});
      
      if(user){
        user.sendVerification();        
        return res.send({message:'check your mailbox to activate'});
      }else{
        return res.send({message:'create account failed, try agian', status: 500});
      }
    }catch(e){
      return next({message: e.message});
    }
    
  },

  getMyself: async function({params, current_user, body, query}, res, next){
    if (params.id == current_user._id){

      try{
        var user = await Users.findById(params.id).exec();

        // console.log('user',user);
        if(user){
          return res.send(user);
        }else{
          return next({message: "please create a new account", status: 401});
        }
      }catch(e){
        return next({message: e.message});
      }

    }else{

      console.log("illegal user");
      res.send(current_user);
    }
  },

  login: async function (req, res, next){
    // console.log("login requst body:",req.body);
    var data = req.body;
    var user, session;
    try{
      user = await ifExists.user(data.username);

      if (!user)
        return next({message: "This account does exist", status: 401});

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
      // console.log("before update session",session);
      var new_expire = new Date(new Date().getTime()+ 2 * 7 * 24 * 60 * 60 * 1000);

      await session.update({ expire_At: new_expire,session_token: GUID() }).exec();
      // console.log("updated session1:",session);
     
      session = await Sessions.findOne({user:user._id}).populate("user", "username avatar").exec();

      // console.log("send session:",session);
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
  
    // console.log("getUserFriends", req.current_user);
    // console.log('params',params);
    // console.log('current_user',current_user);    
    
    if (params.id == current_user._id){
      try{
        var user = await Users.findById({_id: current_user._id}).populate("friends",'nickname status username avatar');  
        var friends = user.friends;
        console.log('friends', friends);
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
    // console.log("login query name:",req.query.name);
    
    try{
      var name = await Users.findBySimilarUsername(req.query.name);
      res.send(name); 
    }catch(e){
      console.log(e);
    }
  },

  updateRecent: async function({params, current_user, body, query}, res, next){

    if (params.id == current_user._id){
     
      //insert the friend id into recent
      try{
        var user = await Users.findById(params.id)
          .populate({
            path: 'recent',
            match: {_id: body.friendID}
          })
          .exec();
        
        if(user.recent.length !== 0){
          // res.send({message: 'already in recent list'});
          // console.log("it already in the list")
          user = await Users.findByIdAndUpdate(params.id,
            {$pull:{recent: body.friendID}}).exec();
        }

        user = await Users.findByIdAndUpdate(params.id,
          {$push:{'recent':  {_id: body.friendID},$position: 0}}).exec();


        if(!user){
          return next({message: "cannot find this user", status: 401})
        }

        var user_updated = await Users.findById(params.id)
          .populate('recent', 'username _id avatar')
          .exec();

        // console.log('user_updated', user_updated);

        if(!user_updated){
          return res.send({});
        }

        // console.log(user_updated.recent);

        return res.send(user_updated.recent);
      }catch(e){
        console.log(e);
        return next({message: e.message});
      }     
    }
    else{
      res.send(current_user);
      console.log("illegal user");
    }
  },

  getRecent: async function({params, current_user, body, query}, res, next){
    if (params.id == current_user._id){

      try{
        var user = await Users.findById(params.id)
          .populate('recent', 'nickname status username _id avatar')
          .exec();

        // console.log('user recent',user.recent);
        
        return res.send(user.recent);
      }catch(e){
        console.log(e);
        return next({message: e.message});
      }

    }else{

      console.log("illegal user");
      res.send(current_user);
    }
  },

  queryOne: async function(req, res, next){
    // console.log("query id: ", req.query.id);
    var id = req.query.id;
    try{
      var user = await Users.findById(id).exec();

      if(user){
        res.send({
          nickname: user.nickname, 
          username: user.username,
          avatar: user.avatar,
          status: user.status,
          gender: user.gender,
          birthday: user.birthday,
          friends: user.friends, 
          });
      }else{
        return next({message: "cannot find that user"});
      }
    }catch(e){
      console.log(e);
      return next({message: e.message});
    }

  },

  isFriend: async function({params, current_user, body, query}, res, next){

    if (query.current_id == current_user._id){

      var friend_id = query.friend_id;
      var current_id = query.current_id;

      try{
        var user = await Users.findOne({_id: current_id, friends: friend_id }).exec();
        if(user){
          return res.send({
                    nickname: user.nickname, 
                    username: user.username,
                    avatar: user.avatar,
                    status: user.status,
                    gender: user.gender,
                    birthday: user.birthday,
                    friends: user.friends, });
        }else{
          return res.send({message: false});
        }
      }catch(e){
        return next({message: e.message});
      }
    }else{
      console.log("illegal user");
      res.send(current_user);
    }
  },

  addFriendRequest: async function({params, current_user, body, query}, res, next){
    
     var {
      from,
      to,
    } = body;   

    if (params.id == current_user._id){
      var notification;
      try{
        var user = await Gcms.findOne({user: to});
        if(user){
           var regTokens = user.tokens;

           notification = await ifExists.notification(to);
            if(notification){
              notification = await Notifications.findOne({
                user:to,
                'contents.from': params.id,
                'contents.classificaiton': 'addFriendRequest',
                'contents.text': from + " wants to add you as friend"
              }).exec();

              if(notification){
                console.log("already sent request")
                return res.send({message: "already sent request"});
              }
            }else{
              notification = await Notifications.create({user: to});
            }
        }else{
          console.log("failed to find destination user");
          return next({message: "failed to find destination user"});
        }
      }catch(e){
        return next({message: e.message});
      }
      
      // var content = JSON.stringify(body);   
      var message = new gcm.Message({
          collapseKey: 'demo',
          priority: 'high',
          contentAvailable: true,
          data: {
              key1: params.id,
              key2: to,
              key3: 'addFriendRequest',
              key4: 'unread',
          },
      });

      // Set up the sender with you API key
      var sender = new gcm.Sender('AIzaSyD5f7HQE8I6IJNGaJAbPjL8qBYUThz83dA');

      // Now the sender can be used to send messages
      sender.send(message, { registrationTokens: regTokens }, function (err, response) {
          if(err){
            console.error(err);
          }else{
            console.log("gcm send to friend request:",response);
            Notifications.findOneAndUpdate({user: to},
               {$push:{'contents': {
                from: params.id,
                classificaiton: 'addFriendRequest',
                text: from + " wants to add you as friend",
                ifread: false,
                }}}, function(err, docs){
                  if(err){
                    return next({message: err.message});
                  }else{
                    return res.send({message: 'send request successfully'})
                  }
               })
          }   
      });
    }else{
      console.log("illegal user");
      res.send(current_user);
    }
  }

});
