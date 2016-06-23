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

var Users = require('../models/users');

//clear the database
// Users.removeAll(function(err, docs) {
//   console.log(docs);
// })

Users.find({},function (err,user){
  console.log(user);
});

/**----------------------------------------------------------------------------
push friends
------------------------------------------------------------------------------**/

function promisefyUpdate(Model, arg1, arg2, options) {
  return new Promise(function(res, rej) {
     Model.update(arg1, arg2, options, function(err, result){
        if (err) return rej(err);
        res(result);
     })
  });
};

var arrayUser = [
'572281817d75053030dff678',
// '572281817d75053030dff679',
'572794119432dab42f451190',
'572794305b7c515807c3452d',
'572794407b9e0cd4185948d3',
'5727944838d4ff801774bdc5', 
];

var run = co.wrap(function* (){
  try {
    var ii = yield promisefyUpdate(Users, {username:'rsheng2@lakeheadu.ca'},
                 {$push:{friends:  { $each: arrayUser }}},
                 {});

    console.log(ii);
    }catch(e){
      console.log(e);
    }

})

// run();

//----------------------------------------------------------------------

// push a friend
// Users.findByIdAndUpdate('574761f43ce12658159781b3', 
//         {$push:{'friends':'574761f43ce12615978115'}},function(err, docs){
//         	if(err){
//         		console.log(err);
//         	}
//         	console.log(docs)
//         });

//delete a friend
// Users.findByIdAndUpdate('574761f43ce12658159781b5', 
//         {$pull:{'friends': '574761f43ce12658159781b3'}},function(err, docs){
//           if(err){
//             console.log(err);
//           }
//           console.log(docs)
//         });

// Users.findOne({_id: '574761f43ce12658159781b3', friends: '574761f43ce12658159781b5' },
// 	function(err, docs){
//         	if(err){
//         		console.log(err);
//         	}
//         	console.log(docs)
//         });

// Users.findByIdAndUpdate('574761f43ce12658159781b6', 
//   {$set: {friends: []}}, 
//   function(err, res){
//     console.log(res)
//   })

// Users.findById('572281817d75053030dff678')
//   .populate({
//     path: 'recent',
//     match: {_id: '5727944838d4ff801774bdc5'}
//   })
//   .exec(function(err, docs){
//     console.log(docs);
//   })


var array = [];
for (var i = 1; i < 21; i++) {

	var nickname = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var j=0; j < 5; j++ ){
        nickname += possible.charAt(Math.floor(Math.random() * possible.length));
    }
  	array.push({nickname: nickname, status: "this app is good!", username: 'rsheng'+i+'@lakeheadu.ca', password: '123456', activated: true, activate_token: ''})
};


// co(function* (){
//   try{
//     for (var i = 0; i < array.length; i++) {
//       var user = yield Users.create(array[i]);
//       console.log(user);
//     };
//   }catch(e){
//     console.log(e);
//   }
    
// })
