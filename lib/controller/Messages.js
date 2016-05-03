'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var Messages = require('../models/messages');
var Users = require('../models/users');

module.exports = {

  // getEarlierMessages: async function({query:{from = "none", to = "none"}}, res, next){
  getEarlierMessages: function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res, next) {
      var users, user_from, user_to, messages;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              users = {};

              users['from'] = req.query.from;
              users['to'] = req.query.to;
              console.log("from and to:", users['from'], users['to']);
              _context.prev = 4;
              _context.next = 7;
              return Users.findByUsername(users['from'] + "@lakeheadu.ca");

            case 7:
              user_from = _context.sent;

              if (!user_from) {
                user_from = "none";
              }
              user_from = user_from._id;

              _context.next = 12;
              return Users.findByUsername(users['to'] + "@lakeheadu.ca");

            case 12:
              user_to = _context.sent;

              if (!user_to) {
                user_to = "none";
              }
              user_to = user_to._id;

              console.log(user_from + " " + user_to);

              _context.next = 18;
              return Messages.find({ $or: [{ from: user_from, to: user_to }, { from: user_to, to: user_from }] }).sort('created_at').populate("from", "username avatar").populate("to", "username avatar").exec();

            case 18:
              messages = _context.sent;

              if (messages) {
                _context.next = 21;
                break;
              }

              return _context.abrupt('return', next({ message: "there is no earlier messages" }));

            case 21:
              console.log(messages);
              return _context.abrupt('return', res.send(messages));

            case 25:
              _context.prev = 25;
              _context.t0 = _context['catch'](4);
              return _context.abrupt('return', next({ message: _context.t0.message }));

            case 28:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[4, 25]]);
    }));

    return function getEarlierMessages(_x, _x2, _x3) {
      return ref.apply(this, arguments);
    };
  }()
};