var Users = require('../models/users');
var mailder = require('nodemailer');

module.exports = {

  registers: function (req, res, next) {
    console.log(req.body);
    data = req.body;

    Users.findOne(data.username, function(err, user){
      console.log(user);
      if(user.length > 0) {
        console.error("this user already exits!");
        res.status(403).send({error: 'this user already exits!'});
      }else{

        // register user
        var activate_token = new Date().getTime();
        var user = new Users({username: data.username, password: data.password, activated: false, activate_token: activate_token});
        
        user.save(function (err, s) {
          if (err) {
            next(new Error("error! save failed"));
          }
          user.sendVerification();          
          res.send("added successfully");
        });
      }
    });
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