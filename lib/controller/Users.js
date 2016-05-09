'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var Users = require('../models/users');
var mailder = require('nodemailer');
var Sessions = require("../models/sessions");
var ifExists = require("../utilities/ifExists");
var GUID = require("../utilities/GUID");

var Ctrl = require('../Controller');

module.exports = Ctrl.createController({

  //the array below contains the registed functions which are need to add extra functions before executing
  findSession: ['getUserFriends', 'updateRecent', 'getRecent'],

  registers: function registers(req, res, next) {
    console.log(req.body);
    var data = req.body;

    ifExists.user(data.username).then(function (user) {
      console.log(user);
      res.status(403).send({ error: 'this user already exits!' });
    }).catch(function () {
      // register user
      var activate_token = new Date().getTime();
      var user = new Users({ username: data.username, password: data.password, activated: false, activate_token: activate_token });

      user.save(function (err, s) {
        if (err) {
          next(new Error("error! save failed"));
        }
        user.sendVerification();
        res.send({ message: 'check your mailbox to activate' });
      });
    });
  },

  login: function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res, next) {
      var data, user, session, username, user_id, new_expire;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log("login requst body:", req.body);
              data = req.body;
              _context.prev = 2;
              _context.next = 5;
              return ifExists.user(data.username);

            case 5:
              user = _context.sent;

              if (user) {
                _context.next = 8;
                break;
              }

              return _context.abrupt('return', next({ message: "please create a new account", status: 401 }));

            case 8:
              if (!(user.activated === false)) {
                _context.next = 10;
                break;
              }

              return _context.abrupt('return', next({ message: "please activate your account", status: 401 }));

            case 10:
              if (!(data.username != user.username)) {
                _context.next = 12;
                break;
              }

              return _context.abrupt('return', next({ message: "username do not match", status: 401 }));

            case 12:
              if (!(data.password != user.password)) {
                _context.next = 14;
                break;
              }

              return _context.abrupt('return', next({ message: "invalid password!", status: 401 }));

            case 14:
              _context.next = 16;
              return Sessions.findOne({ user: user._id }).exec();

            case 16:
              session = _context.sent;

              if (session) {
                _context.next = 23;
                break;
              }

              // var {username, user_id} = user;

              username = user.username;
              user_id = user._id;
              _context.next = 22;
              return Sessions.create({ user: user_id, session_token: GUID() });

            case 22:
              session = _context.sent;

            case 23:
              console.log("before update session", session);
              new_expire = new Date(new Date().getTime() + 2 * 7 * 24 * 60 * 60 * 1000);
              _context.next = 27;
              return session.update({ expire_At: new_expire, session_token: GUID() }).exec();

            case 27:
              console.log("updated session1:", session);

              _context.next = 30;
              return Sessions.findOne({ user: user._id }).populate("user", "username avatar").exec();

            case 30:
              session = _context.sent;


              console.log("updated session2:", session);
              return _context.abrupt('return', res.send(session));

            case 35:
              _context.prev = 35;
              _context.t0 = _context['catch'](2);
              return _context.abrupt('return', next({ message: _context.t0.message }));

            case 38:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[2, 35]]);
    }));

    return function login(_x, _x2, _x3) {
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
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(_ref, res, next) {
      var params = _ref.params;
      var current_user = _ref.current_user;
      var body = _ref.body;
      var query = _ref.query;
      var user, friends;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(params.id == current_user._id)) {
                _context2.next = 14;
                break;
              }

              _context2.prev = 1;
              _context2.next = 4;
              return Users.findById({ _id: current_user._id }).populate("friends", 'username avatar');

            case 4:
              user = _context2.sent;
              friends = user.friends;

              res.send(friends);
              // return next({message: "shsi", status: 500});
              _context2.next = 12;
              break;

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2['catch'](1);

              console.log(_context2.t0);

            case 12:
              _context2.next = 16;
              break;

            case 14:
              res.send(current_user);
              console.log("illegal user");

            case 16:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[1, 9]]);
    }));

    return function getUserFriends(_x4, _x5, _x6) {
      return ref.apply(this, arguments);
    };
  }(),

  searchFriends: function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(req, res, next) {
      var name;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              console.log("login query name:", req.query.name);

              _context3.prev = 1;
              _context3.next = 4;
              return Users.findBySimilarUsername(req.query.name);

            case 4:
              name = _context3.sent;

              res.send(name);
              _context3.next = 11;
              break;

            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3['catch'](1);

              console.log(_context3.t0);

            case 11:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this, [[1, 8]]);
    }));

    return function searchFriends(_x7, _x8, _x9) {
      return ref.apply(this, arguments);
    };
  }(),

  updateRecent: function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(_ref2, res, next) {
      var params = _ref2.params;
      var current_user = _ref2.current_user;
      var body = _ref2.body;
      var query = _ref2.query;
      var user, user_updated;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!(params.id == current_user._id)) {
                _context4.next = 29;
                break;
              }

              _context4.prev = 1;
              _context4.next = 4;
              return Users.findById(params.id).populate({
                path: 'recent',
                match: { _id: body.friendID }
              }).exec();

            case 4:
              user = _context4.sent;

              if (!(user.recent.length !== 0)) {
                _context4.next = 9;
                break;
              }

              _context4.next = 8;
              return Users.findByIdAndUpdate(params.id, { $pull: { recent: body.friendID } }).exec();

            case 8:
              user = _context4.sent;

            case 9:
              _context4.next = 11;
              return Users.findByIdAndUpdate(params.id, { $push: { 'recent': { _id: body.friendID }, $position: 0 } }).exec();

            case 11:
              user = _context4.sent;

              if (user) {
                _context4.next = 14;
                break;
              }

              return _context4.abrupt('return', next({ message: "cannot find this user", status: 401 }));

            case 14:
              _context4.next = 16;
              return Users.findById(params.id).populate('recent', 'username _id avatar').exec();

            case 16:
              user_updated = _context4.sent;

              if (user_updated) {
                _context4.next = 19;
                break;
              }

              return _context4.abrupt('return', res.send({}));

            case 19:

              console.log(user_updated.recent);

              return _context4.abrupt('return', res.send(user_updated.recent));

            case 23:
              _context4.prev = 23;
              _context4.t0 = _context4['catch'](1);

              console.log(_context4.t0);
              return _context4.abrupt('return', next({ message: _context4.t0.message }));

            case 27:
              _context4.next = 31;
              break;

            case 29:
              res.send(current_user);
              console.log("illegal user");

            case 31:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this, [[1, 23]]);
    }));

    return function updateRecent(_x10, _x11, _x12) {
      return ref.apply(this, arguments);
    };
  }(),

  getRecent: function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(_ref3, res, next) {
      var params = _ref3.params;
      var current_user = _ref3.current_user;
      var body = _ref3.body;
      var query = _ref3.query;
      var user;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!(params.id == current_user._id)) {
                _context5.next = 17;
                break;
              }

              _context5.prev = 1;
              _context5.next = 4;
              return Users.findById(params.id).populate('recent', 'username _id avatar').exec();

            case 4:
              user = _context5.sent;


              console.log('user recent', user.recent);

              if (!(user.recent.length < 1)) {
                _context5.next = 8;
                break;
              }

              return _context5.abrupt('return', res.send({ message: 'no recent' }));

            case 8:
              return _context5.abrupt('return', res.send(user.recent));

            case 11:
              _context5.prev = 11;
              _context5.t0 = _context5['catch'](1);

              console.log(_context5.t0);
              return _context5.abrupt('return', next({ message: _context5.t0.message }));

            case 15:
              _context5.next = 19;
              break;

            case 17:

              console.log("illegal user");
              res.send(current_user);

            case 19:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this, [[1, 11]]);
    }));

    return function getRecent(_x13, _x14, _x15) {
      return ref.apply(this, arguments);
    };
  }()

});