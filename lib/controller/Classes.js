'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var Courses = require('../models/classes');
var Users = require('../models/users');
var Ctrl = require('../Controller');
var ifExists = require("../utilities/ifExists");
var Gcms = require('../models/googleCloudMessaging');

module.exports = Ctrl.createController({
	findSession: ['updateclasses', 'getclasses'],

	updateclasses: function () {
		var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_ref, res, next) {
			var params = _ref.params;
			var current_user = _ref.current_user;
			var body = _ref.body;
			var query = _ref.query;
			var subject, instructor, room, days, starttime, endtime, updates, d_len, i, value, courseTable;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							subject = body.subject;
							instructor = body.instructor;
							room = body.room;
							days = body.days;
							starttime = body.starttime;
							endtime = body.endtime;


							console.log("!!!!!!!!!!!!!", body);

							updates = [{}, {}, {}, {}, {}];
							d_len = days.split(",").length;

							for (i = 0; i < d_len; i++) {
								value = days.split(",")[i];


								if (value == 'M') {
									updates[i]['monday'] = {
										subject: subject,
										instructor: instructor,
										room: room,
										starttime: starttime,
										endtime: endtime
									};
								} else if (value == "T") {
									// console.log('value',i)
									updates[i]['tuesday'] = {
										subject: subject,
										instructor: instructor,
										room: room,
										starttime: starttime,
										endtime: endtime
									};
									// console.log("tuesday",updates[i])
								} else if (value == "W") {
										updates[i]['wednesday'] = {
											subject: subject,
											instructor: instructor,
											room: room,
											starttime: starttime,
											endtime: endtime
										};
									} else if (value == "TH") {
										// console.log('value',i)
										updates[i]['thursday'] = {
											subject: subject,
											instructor: instructor,
											room: room,
											starttime: starttime,
											endtime: endtime
										};
										// console.log("thursday",updates[i])
									} else if (value == "F") {
											updates[i]['friday'] = {
												subject: subject,
												instructor: instructor,
												room: room,
												starttime: starttime,
												endtime: endtime
											};
										}
							}

							if (!(params.id == current_user._id)) {
								_context.next = 47;
								break;
							}

							_context.prev = 11;
							_context.next = 14;
							return Courses.findOne({ user: current_user._id });

						case 14:
							courseTable = _context.sent;

							if (!(courseTable == null)) {
								_context.next = 21;
								break;
							}

							_context.next = 18;
							return Courses.create({ user: current_user._id });

						case 18:
							courseTable = _context.sent;
							_context.next = 30;
							break;

						case 21:
							i = 0;

						case 22:
							if (!(i < d_len)) {
								_context.next = 29;
								break;
							}

							_context.next = 25;
							return Courses.update({ user: current_user._id }, { $set: updates[i] }).exec();

						case 25:
							courseTable = _context.sent;

						case 26:
							i++;
							_context.next = 22;
							break;

						case 29:
							return _context.abrupt('return', res.send({ 'message': "save successfully" }));

						case 30:
							i = 0;

						case 31:
							if (!(i < d_len)) {
								_context.next = 38;
								break;
							}

							_context.next = 34;
							return Courses.update({ user: current_user._id }, { '$push': updates[i] }).exec();

						case 34:
							courseTable = _context.sent;

						case 35:
							i++;
							_context.next = 31;
							break;

						case 38:
							return _context.abrupt('return', res.send({ 'message': "save successfully" }));

						case 41:
							_context.prev = 41;
							_context.t0 = _context['catch'](11);

							console.log("update classes faliure", _context.t0);
							return _context.abrupt('return', next({ message: "failed to update classes" }));

						case 45:
							_context.next = 49;
							break;

						case 47:
							console.log("illegal user");
							res.send(current_user);

						case 49:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, this, [[11, 41]]);
		}));

		return function updateclasses(_x, _x2, _x3) {
			return ref.apply(this, arguments);
		};
	}(),

	getclasses: function getclasses(_ref2, res, next) {
		var params = _ref2.params;
		var current_user = _ref2.current_user;
		var body = _ref2.body;
		var query = _ref2.query;

		if (params.id == current_user._id) {
			try {} catch (e) {
				console.log("getclasses faliure", e);
				return next({ message: "failed to get classes" });
			}
		} else {
			console.log("illegal user");
			res.send(current_user);
		}
	}
});