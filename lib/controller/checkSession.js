"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var Sessions = require("../models/sessions");
var ifExists = require("../utilities/ifExists");

module.exports = {

  getSession: function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res, next) {
      var data, session, now;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log(req.body);
              data = req.body;
              _context.prev = 2;
              _context.next = 5;
              return ifExists.session(data.username);

            case 5:
              session = _context.sent;
              now = new Date().getTime();

              console.log("session.expire_At:", session.expire_At);
              console.log("now:", now);

              if (!(session.expire_At < now)) {
                _context.next = 13;
                break;
              }

              return _context.abrupt("return", next({
                status: 401,
                message: 'login please!'
              }));

            case 13:
              return _context.abrupt("return", res.send(session));

            case 14:
              _context.next = 20;
              break;

            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](2);

              console.log("Cannot find this user's session");
              return _context.abrupt("return", next({ status: 401, message: 'login please!' }));

            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[2, 16]]);
    }));

    return function getSession(_x, _x2, _x3) {
      return ref.apply(this, arguments);
    };
  }()
};