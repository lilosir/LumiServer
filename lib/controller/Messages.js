'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var Messages = require('../models/messages');
var Users = require('../models/users');
var gcm = require('node-gcm');
var Ctrl = require('../Controller');
var ifExists = require("../utilities/ifExists");
var Gcms = require('../models/googleCloudMessaging');

module.exports = Ctrl.createController({

  findSession: ['sendMessages'],

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
                _context2.next = 19;
                break;
              }

              _context2.prev = 3;
              _context2.next = 6;
              return Gcms.findOne({ user: to });

            case 6:
              user = _context2.sent;

              if (user) {
                regTokens = user.tokens;
              }
              _context2.next = 14;
              break;

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2['catch'](3);

              console.log("failed to find destination user");
              return _context2.abrupt('return', next({ message: "failed to find destination user" }));

            case 14:

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
                  key2: to
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
              _context2.next = 21;
              break;

            case 19:
              console.log("illegal user");
              res.send(current_user);

            case 21:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[3, 10]]);
    }));

    return function sendMessages(_x4, _x5, _x6) {
      return ref.apply(this, arguments);
    };
  }(),

  // getEarlierMessages: async function({query:{from = "none", to = "none"}}, res, next){
  getEarlierMessages: function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(req, res, next) {
      var users, user_from, user_to, messages;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              users = {};

              users['from'] = req.query.from;
              users['to'] = req.query.to;
              console.log("from and to:", users['from'], users['to']);
              _context3.prev = 4;
              _context3.next = 7;
              return Users.findByUsername(users['from'] + "@lakeheadu.ca");

            case 7:
              user_from = _context3.sent;

              if (!user_from) {
                user_from = "none";
              }
              user_from = user_from._id;

              _context3.next = 12;
              return Users.findByUsername(users['to'] + "@lakeheadu.ca");

            case 12:
              user_to = _context3.sent;

              if (!user_to) {
                user_to = "none";
              }
              user_to = user_to._id;

              console.log(user_from + " " + user_to);

              _context3.next = 18;
              return Messages.find({ $or: [{ from: user_from, to: user_to }, { from: user_to, to: user_from }] }).sort('created_at').populate("from", "username avatar").populate("to", "username avatar").exec();

            case 18:
              messages = _context3.sent;

              if (messages) {
                _context3.next = 21;
                break;
              }

              return _context3.abrupt('return', next({ message: "there is no earlier messages" }));

            case 21:
              console.log(messages);
              return _context3.abrupt('return', res.send(messages));

            case 25:
              _context3.prev = 25;
              _context3.t0 = _context3['catch'](4);
              return _context3.abrupt('return', next({ message: _context3.t0.message }));

            case 28:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this, [[4, 25]]);
    }));

    return function getEarlierMessages(_x7, _x8, _x9) {
      return ref.apply(this, arguments);
    };
  }()
});