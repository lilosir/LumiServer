var Ctrl = require('../Controller');
var Sessions = require("../models/sessions");
var Users = require('../models/users');

/**
to get current user if is a valid user, then in the 'next' function to check if it is leagl
**/
Ctrl.addCustomAction('findSession',async function(req, res, next) {

  try{

    var session_token = req.headers["session-token"];
    var session;
    if(session_token){
      session = await Sessions.findOne({session_token:session_token}).populate('user').exec();   
    }

    if (!session) throw {message: "cannot find session", status: 401};

    req.session = session;
    req.current_user = session.user;
    if (!req.current_user) 
      throw {message: "cannot find session user", status: 401};

  } catch(e){
      return next(e);
  }
});