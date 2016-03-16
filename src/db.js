require("babel-polyfill");
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lumi');
var db = mongoose.connection;
db.on('error',function (err){
  console.log(err);
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


// Sessions.updateSession("rsheng@lakeheadu.ca", '123', 0);

//show sessions
Sessions.findAll(function (err,session){
  console.log(session);
});


// Users.findByUsername("rsheng@lakeheadu.ca",function (err,user){
//   console.log(user);
// });

// Users.findAll(function (err,user){
//   console.log(user);
// });

// var run = async function (){
// for (var i = 0; i < 20; i++) {
//   await Users.update({username:'rsheng@lakeheadu.ca'},
//                {$push:{friends:{username:i+'11@lakeheadu.ca'}}},
//                {},
//                function(err,docs){
//                 if(err){
//                   console.log(err);
//                 }
//                 console.log(docs);
//               })
//   }
// }

// run();


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