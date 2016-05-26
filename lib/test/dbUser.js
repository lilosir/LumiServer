"use strict";

require("babel-polyfill");
var co = require("co");
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lumi');
var db = mongoose.connection;
db.on('error', function (err) {
  console.log(err);
});

db.on('disconnected', function () {
  console.log('Datebase disconnected!!');
});

var Users = require('../models/users');

//clear the database
// Users.removeAll(function(err, docs) {
//   console.log(docs);
// })

// Users.find({},function (err,user){
//   console.log(user);
// });

/**----------------------------------------------------------------------------
push friends
------------------------------------------------------------------------------**/

function promisefyUpdate(Model, arg1, arg2, options) {
  return new Promise(function (res, rej) {
    Model.update(arg1, arg2, options, function (err, result) {
      if (err) return rej(err);
      res(result);
    });
  });
};

var arrayUser = ['572281817d75053030dff678',
// '572281817d75053030dff679',
'572794119432dab42f451190', '572794305b7c515807c3452d', '572794407b9e0cd4185948d3', '5727944838d4ff801774bdc5'];

var run = co.wrap(regeneratorRuntime.mark(function _callee() {
  var ii;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return promisefyUpdate(Users, { username: 'rsheng2@lakeheadu.ca' }, { $push: { friends: { $each: arrayUser } } }, {});

        case 3:
          ii = _context.sent;


          console.log(ii);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);

          console.log(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this, [[0, 7]]);
}));

// run();

//----------------------------------------------------------------------

// push a recent friend
// Users.findByIdAndUpdate('572281817d75053030dff678',
//         {$push:{'recent': {_id: '5727944838d4ff801774bdc5'}}}).exec();

// Users.update({username: 'rsheng1@lakeheadu.ca'},
//   {$set: {recent: []}},
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
  for (var j = 0; j < 5; j++) {
    nickname += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  array.push({ nickname: nickname, status: "this app is good!", username: 'rsheng' + i + '@lakeheadu.ca', password: '123456', activated: true, activate_token: '' });
};

var createusers = co(regeneratorRuntime.mark(function _callee2() {
  var i, user;
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          i = 0;

        case 2:
          if (!(i < array.length)) {
            _context2.next = 10;
            break;
          }

          _context2.next = 5;
          return Users.create(array[i]);

        case 5:
          user = _context2.sent;

          console.log(user);

        case 7:
          i++;
          _context2.next = 2;
          break;

        case 10:
          ;
          _context2.next = 16;
          break;

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](0);

          console.log(_context2.t0);

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, this, [[0, 13]]);
}));