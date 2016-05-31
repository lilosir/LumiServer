'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var Users = require('../models/users');
var mailder = require('nodemailer');
var Sessions = require("../models/sessions");
var Notifications = require("../models/notifications");
var ifExists = require("../utilities/ifExists");
var GUID = require("../utilities/GUID");

var Ctrl = require('../Controller');
var gcm = require('node-gcm');
var Gcms = require('../models/googleCloudMessaging');

module.exports = Ctrl.createController({

  //the array below contains the registed functions which are need to add extra functions before executing
  findSession: ['getMyself', 'getUserFriends', 'updateRecent', 'getRecent', 'isFriend', 'addFriendRequest'],

  registers: function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res, next) {
      var data, user, activate_token, nickname;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log(req.body);
              data = req.body;
              _context.prev = 2;
              _context.next = 5;
              return ifExists.user(data.username);

            case 5:
              user = _context.sent;

              if (!user) {
                _context.next = 8;
                break;
              }

              return _context.abrupt('return', res.send({ message: "this account already exists", status: 401 }));

            case 8:
              activate_token = new Date().getTime();
              nickname = data.username.split("@lakeheadu.ca")[0];
              _context.next = 12;
              return Users.create({ nickname: nickname, username: data.username, password: data.password, activated: false, activate_token: activate_token });

            case 12:
              user = _context.sent;

              if (!user) {
                _context.next = 18;
                break;
              }

              user.sendVerification();
              return _context.abrupt('return', res.send({ message: 'check your mailbox to activate' }));

            case 18:
              return _context.abrupt('return', res.send({ message: 'create account failed, try agian', status: 500 }));

            case 19:
              _context.next = 24;
              break;

            case 21:
              _context.prev = 21;
              _context.t0 = _context['catch'](2);
              return _context.abrupt('return', next({ message: _context.t0.message }));

            case 24:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[2, 21]]);
    }));

    return function registers(_x, _x2, _x3) {
      return ref.apply(this, arguments);
    };
  }(),

  getMyself: function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(_ref, res, next) {
      var params = _ref.params;
      var current_user = _ref.current_user;
      var body = _ref.body;
      var query = _ref.query;
      var user;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(params.id == current_user._id)) {
                _context2.next = 17;
                break;
              }

              _context2.prev = 1;
              _context2.next = 4;
              return Users.findById(params.id).exec();

            case 4:
              user = _context2.sent;

              if (!user) {
                _context2.next = 9;
                break;
              }

              return _context2.abrupt('return', res.send(user));

            case 9:
              return _context2.abrupt('return', next({ message: "please create a new account", status: 401 }));

            case 10:
              _context2.next = 15;
              break;

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2['catch'](1);
              return _context2.abrupt('return', next({ message: _context2.t0.message }));

            case 15:
              _context2.next = 19;
              break;

            case 17:

              console.log("illegal user");
              res.send(current_user);

            case 19:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[1, 12]]);
    }));

    return function getMyself(_x4, _x5, _x6) {
      return ref.apply(this, arguments);
    };
  }(),

  login: function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(req, res, next) {
      var data, user, session, username, user_id, new_expire;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              // console.log("login requst body:",req.body);
              data = req.body;
              _context3.prev = 1;
              _context3.next = 4;
              return ifExists.user(data.username);

            case 4:
              user = _context3.sent;

              if (user) {
                _context3.next = 7;
                break;
              }

              return _context3.abrupt('return', next({ message: "This account does exist", status: 401 }));

            case 7:
              if (!(user.activated === false)) {
                _context3.next = 9;
                break;
              }

              return _context3.abrupt('return', next({ message: "please activate your account", status: 401 }));

            case 9:
              if (!(data.username != user.username)) {
                _context3.next = 11;
                break;
              }

              return _context3.abrupt('return', next({ message: "username do not match", status: 401 }));

            case 11:
              if (!(data.password != user.password)) {
                _context3.next = 13;
                break;
              }

              return _context3.abrupt('return', next({ message: "invalid password!", status: 401 }));

            case 13:
              _context3.next = 15;
              return Sessions.findOne({ user: user._id }).exec();

            case 15:
              session = _context3.sent;

              if (session) {
                _context3.next = 22;
                break;
              }

              // var {username, user_id} = user;

              username = user.username;
              user_id = user._id;
              _context3.next = 21;
              return Sessions.create({ user: user_id, session_token: GUID() });

            case 21:
              session = _context3.sent;

            case 22:
              // console.log("before update session",session);
              new_expire = new Date(new Date().getTime() + 2 * 7 * 24 * 60 * 60 * 1000);
              _context3.next = 25;
              return session.update({ expire_At: new_expire, session_token: GUID() }).exec();

            case 25:
              _context3.next = 27;
              return Sessions.findOne({ user: user._id }).populate("user", "username avatar").exec();

            case 27:
              session = _context3.sent;
              return _context3.abrupt('return', res.send(session));

            case 31:
              _context3.prev = 31;
              _context3.t0 = _context3['catch'](1);
              return _context3.abrupt('return', next({ message: _context3.t0.message }));

            case 34:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this, [[1, 31]]);
    }));

    return function login(_x7, _x8, _x9) {
      return ref.apply(this, arguments);
    };
  }(),

  renderUsers: function renderUsers(req, res, next) {
    Users.find(function (err, docs) {
      if (err) {
        next(new Error("error! render failed"));
      }
      res.render('users', { data: docs });
    });
  },

  activateUser: function activateUser(req, res, next) {
    var user_id = req.params.id;
    Users.find({ _id: user_id, activate_token: req.query.activate_token }, function (err, doc) {
      if (doc && doc[0]) {
        Users.activateUser(user_id, function (err) {
          if (err) {
            console.error(err);
          } else console.log("activated successfully!");
        });
        res.send("activated successfully!");
      } else {
        res.status(405).send({ error: 'activation failure' });
      }
    });
  },

  getUserFriends: function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(_ref2, res, next) {
      var params = _ref2.params;
      var current_user = _ref2.current_user;
      var body = _ref2.body;
      var query = _ref2.query;
      var user, friends;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!(params.id == current_user._id)) {
                _context4.next = 15;
                break;
              }

              _context4.prev = 1;
              _context4.next = 4;
              return Users.findById({ _id: current_user._id }).populate("friends", 'nickname status username avatar');

            case 4:
              user = _context4.sent;
              friends = user.friends;

              console.log('friends', friends);
              res.send(friends);
              // return next({message: "shsi", status: 500});
              _context4.next = 13;
              break;

            case 10:
              _context4.prev = 10;
              _context4.t0 = _context4['catch'](1);

              console.log(_context4.t0);

            case 13:
              _context4.next = 17;
              break;

            case 15:
              res.send(current_user);
              console.log("illegal user");

            case 17:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this, [[1, 10]]);
    }));

    return function getUserFriends(_x10, _x11, _x12) {
      return ref.apply(this, arguments);
    };
  }(),

  searchFriends: function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(req, res, next) {
      var name;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return Users.findBySimilarUsername(req.query.name);

            case 3:
              name = _context5.sent;

              res.send(name);
              _context5.next = 10;
              break;

            case 7:
              _context5.prev = 7;
              _context5.t0 = _context5['catch'](0);

              console.log(_context5.t0);

            case 10:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this, [[0, 7]]);
    }));

    return function searchFriends(_x13, _x14, _x15) {
      return ref.apply(this, arguments);
    };
  }(),

  updateRecent: function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(_ref3, res, next) {
      var params = _ref3.params;
      var current_user = _ref3.current_user;
      var body = _ref3.body;
      var query = _ref3.query;
      var user, user_updated;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!(params.id == current_user._id)) {
                _context6.next = 28;
                break;
              }

              _context6.prev = 1;
              _context6.next = 4;
              return Users.findById(params.id).populate({
                path: 'recent',
                match: { _id: body.friendID }
              }).exec();

            case 4:
              user = _context6.sent;

              if (!(user.recent.length !== 0)) {
                _context6.next = 9;
                break;
              }

              _context6.next = 8;
              return Users.findByIdAndUpdate(params.id, { $pull: { recent: body.friendID } }).exec();

            case 8:
              user = _context6.sent;

            case 9:
              _context6.next = 11;
              return Users.findByIdAndUpdate(params.id, { $push: { 'recent': { _id: body.friendID }, $position: 0 } }).exec();

            case 11:
              user = _context6.sent;

              if (user) {
                _context6.next = 14;
                break;
              }

              return _context6.abrupt('return', next({ message: "cannot find this user", status: 401 }));

            case 14:
              _context6.next = 16;
              return Users.findById(params.id).populate('recent', 'username _id avatar').exec();

            case 16:
              user_updated = _context6.sent;

              if (user_updated) {
                _context6.next = 19;
                break;
              }

              return _context6.abrupt('return', res.send({}));

            case 19:
              return _context6.abrupt('return', res.send(user_updated.recent));

            case 22:
              _context6.prev = 22;
              _context6.t0 = _context6['catch'](1);

              console.log(_context6.t0);
              return _context6.abrupt('return', next({ message: _context6.t0.message }));

            case 26:
              _context6.next = 30;
              break;

            case 28:
              res.send(current_user);
              console.log("illegal user");

            case 30:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this, [[1, 22]]);
    }));

    return function updateRecent(_x16, _x17, _x18) {
      return ref.apply(this, arguments);
    };
  }(),

  getRecent: function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(_ref4, res, next) {
      var params = _ref4.params;
      var current_user = _ref4.current_user;
      var body = _ref4.body;
      var query = _ref4.query;
      var user;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (!(params.id == current_user._id)) {
                _context7.next = 14;
                break;
              }

              _context7.prev = 1;
              _context7.next = 4;
              return Users.findById(params.id).populate('recent', 'nickname status username _id avatar').exec();

            case 4:
              user = _context7.sent;
              return _context7.abrupt('return', res.send(user.recent));

            case 8:
              _context7.prev = 8;
              _context7.t0 = _context7['catch'](1);

              console.log(_context7.t0);
              return _context7.abrupt('return', next({ message: _context7.t0.message }));

            case 12:
              _context7.next = 16;
              break;

            case 14:

              console.log("illegal user");
              res.send(current_user);

            case 16:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, this, [[1, 8]]);
    }));

    return function getRecent(_x19, _x20, _x21) {
      return ref.apply(this, arguments);
    };
  }(),

  queryOne: function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee8(req, res, next) {
      var id, user;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              // console.log("query id: ", req.query.id);
              id = req.query.id;
              _context8.prev = 1;
              _context8.next = 4;
              return Users.findById(id).exec();

            case 4:
              user = _context8.sent;

              if (!user) {
                _context8.next = 9;
                break;
              }

              res.send({
                nickname: user.nickname,
                username: user.username,
                avatar: user.avatar,
                status: user.status,
                gender: user.gender,
                birthday: user.birthday,
                friends: user.friends
              });
              _context8.next = 10;
              break;

            case 9:
              return _context8.abrupt('return', next({ message: "cannot find that user" }));

            case 10:
              _context8.next = 16;
              break;

            case 12:
              _context8.prev = 12;
              _context8.t0 = _context8['catch'](1);

              console.log(_context8.t0);
              return _context8.abrupt('return', next({ message: _context8.t0.message }));

            case 16:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, this, [[1, 12]]);
    }));

    return function queryOne(_x22, _x23, _x24) {
      return ref.apply(this, arguments);
    };
  }(),

  isFriend: function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee9(_ref5, res, next) {
      var params = _ref5.params;
      var current_user = _ref5.current_user;
      var body = _ref5.body;
      var query = _ref5.query;
      var friend_id, current_id, user;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              if (!(query.current_id == current_user._id)) {
                _context9.next = 19;
                break;
              }

              friend_id = query.friend_id;
              current_id = query.current_id;
              _context9.prev = 3;
              _context9.next = 6;
              return Users.findOne({ _id: current_id, friends: friend_id }).exec();

            case 6:
              user = _context9.sent;

              if (!user) {
                _context9.next = 11;
                break;
              }

              return _context9.abrupt('return', res.send({
                nickname: user.nickname,
                username: user.username,
                avatar: user.avatar,
                status: user.status,
                gender: user.gender,
                birthday: user.birthday,
                friends: user.friends }));

            case 11:
              return _context9.abrupt('return', res.send({ message: false }));

            case 12:
              _context9.next = 17;
              break;

            case 14:
              _context9.prev = 14;
              _context9.t0 = _context9['catch'](3);
              return _context9.abrupt('return', next({ message: _context9.t0.message }));

            case 17:
              _context9.next = 21;
              break;

            case 19:
              console.log("illegal user");
              res.send(current_user);

            case 21:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, this, [[3, 14]]);
    }));

    return function isFriend(_x25, _x26, _x27) {
      return ref.apply(this, arguments);
    };
  }(),

  addFriendRequest: function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee10(_ref6, res, next) {
      var params = _ref6.params;
      var current_user = _ref6.current_user;
      var body = _ref6.body;
      var query = _ref6.query;
      var from, to, notification, user, regTokens, message, sender;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              from = body.from;
              to = body.to;

              if (!(params.id == current_user._id)) {
                _context10.next = 38;
                break;
              }

              _context10.prev = 3;
              _context10.next = 6;
              return Gcms.findOne({ user: to });

            case 6:
              user = _context10.sent;

              if (!user) {
                _context10.next = 26;
                break;
              }

              regTokens = user.tokens;
              _context10.next = 11;
              return ifExists.notification(to);

            case 11:
              notification = _context10.sent;

              if (!notification) {
                _context10.next = 21;
                break;
              }

              _context10.next = 15;
              return Notifications.findOne({
                user: to,
                'contents.from': params.id,
                'contents.classificaiton': 'addFriendRequest',
                'contents.text': from + " wants to add you as friend"
              }).exec();

            case 15:
              notification = _context10.sent;

              if (!notification) {
                _context10.next = 19;
                break;
              }

              console.log("already sent request");
              return _context10.abrupt('return', res.send({ message: "already sent request" }));

            case 19:
              _context10.next = 24;
              break;

            case 21:
              _context10.next = 23;
              return Notifications.create({ user: to });

            case 23:
              notification = _context10.sent;

            case 24:
              _context10.next = 28;
              break;

            case 26:
              console.log("failed to find destination user");
              return _context10.abrupt('return', next({ message: "failed to find destination user" }));

            case 28:
              _context10.next = 33;
              break;

            case 30:
              _context10.prev = 30;
              _context10.t0 = _context10['catch'](3);
              return _context10.abrupt('return', next({ message: _context10.t0.message }));

            case 33:

              // var content = JSON.stringify(body);  
              message = new gcm.Message({
                collapseKey: 'demo',
                priority: 'high',
                contentAvailable: true,
                data: {
                  key1: params.id,
                  key2: to,
                  key3: 'addFriendRequest',
                  key4: 'unread'
                }
              });

              // Set up the sender with you API key

              sender = new gcm.Sender('AIzaSyD5f7HQE8I6IJNGaJAbPjL8qBYUThz83dA');

              // Now the sender can be used to send messages

              sender.send(message, { registrationTokens: regTokens }, function (err, response) {
                if (err) {
                  console.error(err);
                } else {
                  console.log("gcm send to friend request:", response);
                  Notifications.findOneAndUpdate({ user: to }, { $push: { 'contents': {
                        from: params.id,
                        classificaiton: 'addFriendRequest',
                        text: from + " wants to add you as friend",
                        ifread: false
                      } } }, function (err, docs) {
                    if (err) {
                      return next({ message: err.message });
                    } else {
                      return res.send({ message: 'send request successfully' });
                    }
                  });
                }
              });
              _context10.next = 40;
              break;

            case 38:
              console.log("illegal user");
              res.send(current_user);

            case 40:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, this, [[3, 30]]);
    }));

    return function addFriendRequest(_x28, _x29, _x30) {
      return ref.apply(this, arguments);
    };
  }()

});