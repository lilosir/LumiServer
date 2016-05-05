var Messages = require('../models/messages');
var Users = require('../models/users');

module.exports = {

  register: function(req, res, next){

  },


  sendMessage: function(req, res, next) {
    // var {
    //   to,
    //   from,
    //   text
    // } = req.body;

    // var token = getTokenByID(to);
    // sendGCM(token, req.body);
  },

  // getEarlierMessages: async function({query:{from = "none", to = "none"}}, res, next){
  getEarlierMessages: async function (req, res, next){

    var users = {};
    users['from'] = req.query.from;
    users['to'] = req.query.to;
    console.log("from and to:",users['from'],users['to']);
    try{
      
      var user_from = await Users.findByUsername(users['from']+"@lakeheadu.ca");
      if(!user_from){
        user_from = "none";
      }
      user_from = user_from._id;

      var user_to = await Users.findByUsername(users['to']+"@lakeheadu.ca");
      if(!user_to){
        user_to = "none";
      }
      user_to = user_to._id;

      console.log(user_from+" "+user_to);

      var messages = await Messages.find({$or: [{from :user_from, to: user_to},{from :user_to, to: user_from}]})
        .sort('created_at')
        .populate("from","username avatar")
        .populate("to","username avatar")
        .exec();

      if(!messages){
        return next({message: "there is no earlier messages"});
      }
      console.log(messages);
      return res.send(messages);

    }catch(e){
      return next({message: e.message});
    }   

  }
}