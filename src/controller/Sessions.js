var Sessions = require("../models/sessions");
var Users = require('../models/users');
var ifExists = require("../utilities/ifExists")

module.exports = {

  getSession: async function (req, res, next){
    console.log(req.body);
    var data = req.body;

    try{
      // var session = await ifExists.session(data.username);
      var user = await Users.findByUsername(data.username);
      console.log("chech session user:",user);
      if(!user){
        return next({message: "cannot find this user", status: 401});
      }

      var id = user._id;

      var session = await Sessions.findOne({user:id});
      console.log("chech session session:",session);

      if(!session){
        return next({message: "cannot find this sdssion", status: 401});
      }

      var expire_At = session.expire_At;
      var now = new Date().getTime();

      console.log("session.expire_At:",expire_At);
      console.log("now:",now);
 
      if (expire_At < now) {
        return next({
            status: 401,
            message: 'login please!',
        });
      } else {
        return res.send(session);
      }
    }catch(e){
      return next({message: e.message});
    }

  },
}