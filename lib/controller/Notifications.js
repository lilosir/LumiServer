'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var Ctrl = require('../Controller');
var Users = require('../models/users');
var ifExists = require("../utilities/ifExists");
var Notifications = require('../models/notifications');

module.exports = Ctrl.createController({

	findSession: ['getnotifications', 'changeToRead'],

	getnotifications: function () {
		var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_ref, res, next) {
			var params = _ref.params;
			var current_user = _ref.current_user;
			var body = _ref.body;
			var query = _ref.query;
			var notifications;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							if (!(params.id == current_user._id)) {
								_context.next = 13;
								break;
							}

							_context.prev = 1;
							_context.next = 4;
							return Notifications.find({ user: params.id }).populate("contents.from", 'avatar nickname').exec();

						case 4:
							notifications = _context.sent;
							return _context.abrupt('return', res.send(notifications));

						case 8:
							_context.prev = 8;
							_context.t0 = _context['catch'](1);
							return _context.abrupt('return', next({ message: _context.t0.message }));

						case 11:
							_context.next = 15;
							break;

						case 13:
							console.log("illegal user");
							res.send(current_user);

						case 15:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, this, [[1, 8]]);
		}));

		return function getnotifications(_x, _x2, _x3) {
			return ref.apply(this, arguments);
		};
	}(),

	changeToRead: function () {
		var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(_ref2, res, next) {
			var params = _ref2.params;
			var current_user = _ref2.current_user;
			var body = _ref2.body;
			var query = _ref2.query;
			var classificaiton, id, notification;
			return regeneratorRuntime.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							classificaiton = body.classificaiton;
							id = body.id;

							if (!(params.id == current_user._id)) {
								_context2.next = 18;
								break;
							}

							_context2.prev = 3;
							_context2.next = 6;
							return Notifications.findOneAndUpdate({
								user: params.id,
								'contents.from': id,
								'contents.classificaiton': classificaiton,
								'contents.ifread': false }, { $set: { 'contents.$.ifread': true } }).exec();

						case 6:
							notification = _context2.sent;
							_context2.next = 9;
							return Notifications.findOne({
								user: params.id,
								'contents.from': id,
								'contents.classificaiton': classificaiton
							}).exec();

						case 9:
							notification = _context2.sent;


							res.send(notification);
							_context2.next = 16;
							break;

						case 13:
							_context2.prev = 13;
							_context2.t0 = _context2['catch'](3);
							return _context2.abrupt('return', next({ message: _context2.t0.message }));

						case 16:
							_context2.next = 20;
							break;

						case 18:
							console.log("illegal user");
							res.send(current_user);

						case 20:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, this, [[3, 13]]);
		}));

		return function changeToRead(_x4, _x5, _x6) {
			return ref.apply(this, arguments);
		};
	}()
});