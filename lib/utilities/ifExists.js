'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var Users = require('../models/users');
var Sessions = require('../models/sessions');

var ifExists = {

  user: function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(username) {
      var user;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return Users.findByUsername(username);

            case 3:
              user = _context.sent;
              return _context.abrupt('return', user);

            case 7:
              _context.prev = 7;
              _context.t0 = _context['catch'](0);
              return _context.abrupt('return', false);

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 7]]);
    }));

    return function user(_x) {
      return ref.apply(this, arguments);
    };
  }()

};

// session: async function(username){
//   try {
//     var result = await Sessions.findOne({'user.username': username}).exec();
//     return result;
//   } catch(e) {
//     return false;
//   }
// },
module.exports = ifExists;