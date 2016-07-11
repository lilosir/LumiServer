'use strict';

var Classes = require('../models/classes');
var Users = require('../models/users');
var Ctrl = require('../Controller');
var ifExists = require("../utilities/ifExists");
var Gcms = require('../models/googleCloudMessaging');

module.exports = Ctrl.createController({
	findSession: ['updateclasses', 'getclasses'],

	updateclasses: function updateclasses(_ref, res, next) {
		var params = _ref.params;
		var current_user = _ref.current_user;
		var body = _ref.body;
		var query = _ref.query;

		console.log("dsdfsdf:::", body);
		if (params.id == current_user._id) {

			console.log("body:", body);
			res.send({ body: body });
			try {} catch (e) {
				console.log("update classes faliure", e);
				return next({ message: "failed to update classes" });
			}
		} else {
			console.log("illegal user");
			res.send(current_user);
		}
	},

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