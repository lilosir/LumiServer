'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var Messages = require('../models/messages');
var Users = require('../models/users');
var gcm = require('node-gcm');
var Ctrl = require('../Controller');
var ifExists = require("../utilities/ifExists");
var Gcms = require('../models/googleCloudMessaging');

module.exports = Ctrl.createController({

  findSession: ['sendMessages', 'storeMessages', 'getEarlierMessages'],

  register: function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res, next) {
      var _req$body,
      // console.log("----------------",req.body);
      token, userid, gcmUser, gcm, gcmToken;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body;
              token = _req$body.token;
              userid = _req$body.userid;
              _context.prev = 3;
              _context.next = 6;
              return ifExists.gcmUser(userid);

            case 6:
              gcmUser = _context.sent;

              if (gcmUser) {
                _context.next = 14;
                break;
              }

              _context.next = 10;
              return Gcms.create({ user: userid, tokens: [token] });

            case 10:
              gcm = _context.sent;

              res.send({ message: 'registed gcm' });
              _context.next = 25;
              break;

            case 14:
              _context.next = 16;
              return ifExists.gcmToken(userid, token);

            case 16:
              gcmToken = _context.sent;

              if (gcmToken) {
                _context.next = 24;
                break;
              }

              _context.next = 20;
              return Gcms.findOneAndUpdate({ user: userid }, { $push: { 'tokens': token } });

            case 20:
              gcmToken = _context.sent;

              res.send({ message: 'push this token into your list' });
              _context.next = 25;
              break;

            case 24:
              res.send({ message: 'you are already in this token user list' });

            case 25:
              _context.next = 30;
              break;

            case 27:
              _context.prev = 27;
              _context.t0 = _context['catch'](3);
              return _context.abrupt('return', next({ message: _context.t0.message }));

            case 30:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[3, 27]]);
    }));

    return function register(_x, _x2, _x3) {
      return ref.apply(this, arguments);
    };
  }(),

  sendMessages: function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(_ref, res, next) {
      var params = _ref.params;
      var current_user = _ref.current_user;
      var body = _ref.body;
      var query = _ref.query;
      var to, text, user, regTokens, message, sender;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              to = body.to;
              text = body.text;

              if (!(params.id == current_user._id)) {
                _context2.next = 23;
                break;
              }

              _context2.prev = 3;
              _context2.next = 6;
              return Gcms.findOne({ user: to });

            case 6:
              user = _context2.sent;

              if (!user) {
                _context2.next = 11;
                break;
              }

              regTokens = user.tokens;
              _context2.next = 13;
              break;

            case 11:
              console.log("failed to find destination user");
              return _context2.abrupt('return', next({ message: "failed to find destination user" }));

            case 13:
              _context2.next = 18;
              break;

            case 15:
              _context2.prev = 15;
              _context2.t0 = _context2['catch'](3);
              return _context2.abrupt('return', next(_context2.t0));

            case 18:

              // var content = JSON.stringify(body);  
              message = new gcm.Message({
                collapseKey: 'demo',
                priority: 'high',
                contentAvailable: true,
                // delayWhileIdle: true,
                timeToLive: 3,
                // dryRun: true,
                data: {
                  key1: text,
                  key2: to,
                  key3: 'chat',
                  key4: 'unread',
                  key5: params.id
                }
              });

              // var regTokens = ['doR1_AtU_6Q:APA91bH5YL4-1NF-Kn4XaMwtnZK4U5zKqDrQDkrxP2zU5FLsehsSdh57c1_yWgD0fZPBEPjyN8dT6kOqBiEjhyaJg1sTMZJvAsdz4H_fXpeOmyYjo8VGd7f7ukcuLlsnAxbEwEOuw-ln'];

              // Set up the sender with you API key

              sender = new gcm.Sender('AIzaSyD5f7HQE8I6IJNGaJAbPjL8qBYUThz83dA');

              // Now the sender can be used to send messages

              sender.send(message, { registrationTokens: regTokens }, function (err, response) {
                if (err) {
                  console.error(err);
                } else {
                  console.log("gcm registrationTokens response:", response);
                  res.send({ message: "send to gcm successfully" });
                }
              });
              _context2.next = 25;
              break;

            case 23:
              console.log("illegal user");
              res.send(current_user);

            case 25:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[3, 15]]);
    }));

    return function sendMessages(_x4, _x5, _x6) {
      return ref.apply(this, arguments);
    };
  }(),

  storeMessages: function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(_ref2, res, next) {
      var params = _ref2.params;
      var current_user = _ref2.current_user;
      var body = _ref2.body;
      var query = _ref2.query;
      var to, text, message;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              to = body.to;
              text = body.text;


              console.log("store messagaes body", body);

              if (!(params.id == current_user._id)) {
                _context3.next = 17;
                break;
              }

              _context3.prev = 4;
              _context3.next = 7;
              return Messages.create({ from: params.id, to: to, contents: text });

            case 7:
              message = _context3.sent;

              // }
              res.send(message);
              _context3.next = 15;
              break;

            case 11:
              _context3.prev = 11;
              _context3.t0 = _context3['catch'](4);

              console.log("store message failed", _context3.t0);
              return _context3.abrupt('return', next({ message: "failed to store this message" }));

            case 15:
              _context3.next = 19;
              break;

            case 17:
              console.log("illegal user");
              res.send(current_user);

            case 19:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this, [[4, 11]]);
    }));

    return function storeMessages(_x7, _x8, _x9) {
      return ref.apply(this, arguments);
    };
  }(),

  // getEarlierMessages: async function({query:{from = "none", to = "none"}}, res, next){
  getEarlierMessages: function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(_ref3, res, next) {
      var params = _ref3.params;
      var current_user = _ref3.current_user;
      var body = _ref3.body;
      var query = _ref3.query;
      var from, to, deadline, messages;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              console.log(query);

              from = query.from;
              to = query.to;
              deadline = query.deadline;


              console.log('params.id', from);
              console.log('current_user._id', current_user._id);

              if (!(from == current_user._id)) {
                _context4.next = 23;
                break;
              }

              _context4.prev = 7;
              _context4.next = 10;
              return Messages.find({
                from: from,
                to: to,
                "contents.date": { $lt: deadline } }).sort({ 'contents.date': -1 }).limit(20);

            case 10:
              messages = _context4.sent;


              console.log("earlier 5 messages: ", messages);

              if (messages) {
                _context4.next = 14;
                break;
              }

              return _context4.abrupt('return', res.send([]));

            case 14:
              return _context4.abrupt('return', res.send(messages));

            case 17:
              _context4.prev = 17;
              _context4.t0 = _context4['catch'](7);

              console.log("get earlier messages failed", _context4.t0);
              return _context4.abrupt('return', next({ message: "failed to get earlier messages" }));

            case 21:
              _context4.next = 25;
              break;

            case 23:
              console.log("illegal user!");
              res.send(current_user);

            case 25:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this, [[7, 17]]);
    }));

    return function getEarlierMessages(_x10, _x11, _x12) {
      return ref.apply(this, arguments);
    };
  }()
});