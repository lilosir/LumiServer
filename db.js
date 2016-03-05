
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lumi');
var db = mongoose.connection;
db.on('error',function (err){
  consolo.log(err);
})

db.on('disconnected', function (){
  console.log('Datebase disconnected!!');
})

var Users = require('./models/users');
var Sessions = require('./models/sessions');

// clear the database
// Users.removeAll(function(err, docs) {
//   console.log(docs);
// })

// clear the database
// Sessions.removeAll(function(err, docs) {
//   console.log(docs);
// })

// Sessions.updateSession('rsheng@lakeheadu.ca',new Date(),new Date(new Date().getTime()+ 2 * 7 * 24 * 60 * 60 * 1000), function (err,session){
//   if(err){
//     console.log(err);
//   }
//   console.log(session);
// });

//show sessions
Sessions.findAll(function (err,session){
  console.log(session);
});

// Users.findOne("rsheng@lakeheadu.ca",function (err,users){
//   console.log(users);
// });

//create a user
// var user = new Users({username: 'rsheng@lakeheadu.ca', password: '123456', activated: true, activate_token: ''});
// user.save(function (err, user) {
//   if (err) {
//     console.log(err);
//   }
//   console.log(user);
// });

//login user create session
// var session = new Sessions({username: 'rsheng@lakeheadu.ca',});
// session.save(function (err, session) {
//   if (err) {
//     console.log(err);
//   }
//   console.log(session);
// });