var Sessions = require("../models/sessions");
var ifExists = require("../utilities/ifExists")

module.exports = {

  getSession: async function (req, res, next){
    console.log(req.body);
    var data = req.body;

    try{
      var session = await ifExists.session(data.username);
      var now = new Date().getTime();

      console.log("session.expire_At:",session.expire_At);
      console.log("now:",now);
 
      if (session.expire_At < now) {
        return next({
            status: 401,
            message: 'login please!',
        });
      } else {
        return res.send(session);
      }
    }catch(e){
      console.log("Cannot find this user's session");
      return next({status: 401, message: 'login please!',});
    }

  },
}