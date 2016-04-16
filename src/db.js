require("babel-polyfill");
var co = require("co");
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
var Messages = require('./models/messages');

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


// Users.update({_id:"56f2f400b6e073d43245d6fb"},{friends:[]},function(err,docs){
//   if(err){
//     console.log(err);
//   }
//   console.log(docs);
// })

//show sessions
// Sessions.findAll(function (err,session){
//   console.log(session);
// });


// Users.find({username: "rsheng@lakeheadu.ca"}, function (err,user){
//   console.log(user[0].friends);
// }).populate("friends");


function promisefyUpdate(Model, arg1, arg2, options) {
  return new Promise(function(res, rej) {
     Model.update(arg1, arg2, options, function(err, result){
        if (err) return rej(err);
        res(result);
     })
  });
};

var arrayUser = [
'570fc8290fdec5502fe3e4c0',
// '570fc847d9449b842c7d6319',
'570fc847d9449b842c7d631a',
'570fc847d9449b842c7d631b',
'570fc847d9449b842c7d631c',
'570fc847d9449b842c7d631d',
'570fc847d9449b842c7d631e',
'570fc847d9449b842c7d631f',
'570fc847d9449b842c7d6320',
'570fc847d9449b842c7d6321',
'570fc847d9449b842c7d6322',
'570fc847d9449b842c7d6323',
'570fc847d9449b842c7d6324',
'570fc847d9449b842c7d6325',
'570fc847d9449b842c7d6326',
'570fc847d9449b842c7d6327',
'570fc847d9449b842c7d6328',
'570fc847d9449b842c7d6329',
'570fc847d9449b842c7d632a',
'570fc847d9449b842c7d632b',
'570fc847d9449b842c7d632c' 
];

var run = co.wrap(function* (){
  try {
    var ii = yield promisefyUpdate(Users, {username:'rsheng1@lakeheadu.ca'},
                 {$push:{friends:  { $each: arrayUser }}},
                 {});

    console.log(ii);
    }catch(e){
      console.log(e);
    }

})

// run();


//create a user
// var user = new Users({username: 'rsheng@lakeheadu.ca', password: '123456', activated: true, activate_token: ''});
// user.save(function (err, user) {
//   if (err) {
//     console.log(err);
//   }
//   console.log(user);
// });

var array = [];
for (var i = 1; i < 21; i++) {
  array.push({username: 'rsheng'+i+'@lakeheadu.ca', password: '123456', activated: true, activate_token: ''})
};

var creatUsers = co.wrap(function* (){
  try{
    for (var i = 0; i < array.length; i++) {
      var user = yield Users.create(array[i]);
      console.log(user);
    };
  }catch(e){
    console.log(e)
  }
    
})

// creatUsers();



//login user create session
// var session = new Sessions({session_token:"sdfsdfsdfsdfsdfsdfsfd",user: "56f2f400b6e073d43245d6fb"});
// session.save(function (err, session) {
//   if (err) {
//     console.log(err);
//   }
//   console.log(session);
// });

//create a message
// var message = new Messages({from: "570fc847d9449b842c7d6319", to: '570fc8290fdec5502fe3e4c0', message: "hello, rsheng",});
// message.save((err, doc) =>{
//   err && console.log(err);
//   console.log(doc);
// });
// Messages.find({from: "570fc8290fdec5502fe3e4c0"}, function (err,mes){
//   console.log(mes[0]);
// }).populate("from");

//descending sort created_at, 
// Messages.find({$or: [{from :"570fc8290fdec5502fe3e4c0", to: '570fc847d9449b842c7d6319'},
//                      {from :"570fc847d9449b842c7d6319", to: '570fc8290fdec5502fe3e4c0'}]}, (err,mes)=>{
//                         err && console.log(err);
//                         console.log(mes);
//                      }).sort('created_at').populate("from").populate("to");


// Users.findOne({_id: "56f2f400b6e073d43245d6fb"}).populate('friends', 'username password').exec().then((user)=> console.log(user.friends));

Sessions.findOne({_id: '570fc953cbdc94b8264424e7'},function(err,docs){
  err && console.log(err);
  console.log(docs)
}).populate("user", "username avatar");

