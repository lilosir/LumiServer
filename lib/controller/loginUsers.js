'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var Users = require('../models/users');
var mailder = require('nodemailer');
var Sessions = require("../models/sessions");
var ifExists = require("../utilities/ifExists");
var GUID = require("../utilities/GUID");

module.exports = {

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
      var data, user, session, _user, username, _id, new_expire;

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
              return ifExists.session(data.username);

            case 16:
              session = _context.sent;

              if (session) {
                _context.next = 24;
                break;
              }

              _user = user;
              username = _user.username;
              _id = _user._id;
              _context.next = 23;
              return Sessions.create({ user: { username: username, _id: _id }, session_token: GUID() });

            case 23:
              session = _context.sent;

            case 24:
              new_expire = new Date(new Date().getTime() + 2 * 7 * 24 * 60 * 60 * 1000);
              // session = await Sessions.updateSession(data.username, GUID(), new_expire);

              _context.next = 27;
              return session.update({ expire_At: new_expire }).exec();

            case 27:
              return _context.abrupt('return', res.send(session));

            case 30:
              _context.prev = 30;
              _context.t0 = _context['catch'](2);
              return _context.abrupt('return', next({ message: _context.t0.message }));

            case 33:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[2, 30]]);
    }));

    return function login(_x, _x2, _x3) {
      return ref.apply(this, arguments);
    };
  }(),

  //
  // try{
  //   session = new Sessions({username: user.username, session_token: GUID()});
  //   session.save(function(err){
  //     if(err){
  //       return next({message: err.message});
  //     }
  //   })
  //   console.log("create a new session:",session);
  //   return res.send(session);
  // } catch(e) {
  //   return next({message: e.message});
  // }

  //if the session exists, so update/extend the expire time
  // try{
  //   var new_expire = new Date(new Date().getTime()+ 2 * 7 * 24 * 60 * 60 * 1000);
  //   session = await Sessions.updateSession(data.username, GUID(), new_expire);

  // } catch(e){
  //   return next({message: e.message});
  // }

  // try{
  //   session = await Sessions.findByUsername(data.username);
  //   console.log("updated session:",session);
  //   return res.send(session);
  // }catch(e){
  //   return next({message: e.message});
  // }

  renderUsers: function renderUsers(req, res, next) {
    Users.find(function (err, docs) {
      if (err) {
        next(new Error("error! render failed"));
      }
      res.render('users', { data: docs });
      res.send({});
    });
  },

  verifyUser: function verifyUser(req, res, next) {
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

  getOneUser: function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res, next) {
      var id, user;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              id = req.params.id;
              _context2.prev = 1;
              _context2.next = 4;
              return Users.findByUserId(id);

            case 4:
              user = _context2.sent;

              res.send(user);
              console.log(user);
              _context2.next = 12;
              break;

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2['catch'](1);
              return _context2.abrupt('return', next({ message: "please login", status: 401 }));

            case 12:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[1, 9]]);
    }));

    return function getOneUser(_x4, _x5, _x6) {
      return ref.apply(this, arguments);
    };
  }()
};