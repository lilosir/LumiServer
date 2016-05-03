"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var Sessions = require("../models/sessions");
var Users = require('../models/users');
var ifExists = require("../utilities/ifExists");

module.exports = {

  getSession: function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res, next) {
      var data, user, id, session, expire_At, now;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log(req.body);
              data = req.body;
              _context.prev = 2;
              _context.next = 5;
              return Users.findByUsername(data.username);

            case 5:
              user = _context.sent;

              console.log("chech session user:", user);

              if (user) {
                _context.next = 9;
                break;
              }

              return _context.abrupt("return", next({ message: "cannot find this user", status: 401 }));

            case 9:
              id = user._id;
              _context.next = 12;
              return Sessions.findOne({ user: id });

            case 12:
              session = _context.sent;

              console.log("chech session session:", session);

              if (session) {
                _context.next = 16;
                break;
              }

              return _context.abrupt("return", next({ message: "cannot find this sdssion", status: 401 }));

            case 16:
              expire_At = session.expire_At;
              now = new Date().getTime();


              console.log("session.expire_At:", expire_At);
              console.log("now:", now);

              if (!(expire_At < now)) {
                _context.next = 24;
                break;
              }

              return _context.abrupt("return", next({
                status: 401,
                message: 'login please!'
              }));

            case 24:
              return _context.abrupt("return", res.send(session));

            case 25:
              _context.next = 30;
              break;

            case 27:
              _context.prev = 27;
              _context.t0 = _context["catch"](2);
              return _context.abrupt("return", next({ message: _context.t0.message }));

            case 30:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[2, 27]]);
    }));

    return function getSession(_x, _x2, _x3) {
      return ref.apply(this, arguments);
    };
  }()
};