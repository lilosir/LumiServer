'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var Ctrl = require('../Controller');
var Sessions = require("../models/sessions");
var Users = require('../models/users');

/**
check if the current user is himself, which means validate the user's identity
**/
Ctrl.addCustomAction('findSession', function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res, next) {
        var session_token, session;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        session_token = req.headers["session-token"];
                        // console.log("session_token",session_token);

                        if (!session_token) {
                            _context.next = 6;
                            break;
                        }

                        _context.next = 5;
                        return Sessions.findOne({ session_token: session_token }).populate('user').exec();

                    case 5:
                        session = _context.sent;

                    case 6:
                        if (session) {
                            _context.next = 8;
                            break;
                        }

                        throw { message: "cannot find session", status: 401 };

                    case 8:

                        req.session = session;
                        req.current_user = session.user;

                        if (req.current_user) {
                            _context.next = 12;
                            break;
                        }

                        throw { message: "cannot find session user", status: 401 };

                    case 12:
                        _context.next = 17;
                        break;

                    case 14:
                        _context.prev = 14;
                        _context.t0 = _context['catch'](0);
                        return _context.abrupt('return', next(_context.t0));

                    case 17:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 14]]);
    }));

    return function (_x, _x2, _x3) {
        return ref.apply(this, arguments);
    };
}());