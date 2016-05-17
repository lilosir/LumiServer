'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var Gcms = require('../models/gcms');
var ifExists = require("../utilities/ifExists");

module.exports = {

	register: function () {
		var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res, next) {
			var _req$body,
			// console.log("----------------",req.body);
			token, userid, gcm, gcmToken;

			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_req$body = req.body;
							token = _req$body.token;
							userid = _req$body.userid;
							_context.prev = 3;
							_context.next = 6;
							return ifExists.gcm(token, userid);

						case 6:
							gcm = _context.sent;

							if (gcm) {
								_context.next = 27;
								break;
							}

							_context.next = 10;
							return ifExists.gcmToken(token);

						case 10:
							gcmToken = _context.sent;

							if (gcmToken) {
								_context.next = 18;
								break;
							}

							_context.next = 14;
							return Gcms.create({ token: token, users: [userid] });

						case 14:
							gcm = _context.sent;

							// console.log('registed gcm');
							res.send({ message: 'registed gcm' });
							_context.next = 22;
							break;

						case 18:
							_context.next = 20;
							return Gcms.findOneAndUpdate({ token: token }, { $push: { 'users': { _id: userid } } });

						case 20:
							gcm = _context.sent;

							// console.log('push you into this token user list');
							res.send({ message: 'push you into this token user list' });

						case 22:
							_context.next = 24;
							return Gcms.findOne({ token: token }).populate('users');

						case 24:
							gcm = _context.sent;
							_context.next = 28;
							break;

						case 27:
							// console.log("gcm token user map already exists", gcm);
							res.send({ message: 'you are already in this token user list' });

						case 28:
							_context.next = 33;
							break;

						case 30:
							_context.prev = 30;
							_context.t0 = _context['catch'](3);
							return _context.abrupt('return', next({ message: _context.t0.message }));

						case 33:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, this, [[3, 30]]);
		}));

		return function register(_x, _x2, _x3) {
			return ref.apply(this, arguments);
		};
	}()
};