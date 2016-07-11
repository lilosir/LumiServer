var Classes = require('../models/classes');
var Users = require('../models/users');
var Ctrl = require('../Controller');
var ifExists = require("../utilities/ifExists");
var Gcms = require('../models/googleCloudMessaging');

module.exports = Ctrl.createController({
	findSession: ['updateclasses', 'getclasses'],

	updateclasses:  function({params, current_user, body, query}, res, next){
		console.log("dsdfsdf:::",body)
		if (params.id == current_user._id){

			console.log("body:",body);
			res.send({body: body})
	      try{
	      }catch(e){
	        console.log("update classes faliure", e)
	        return next({message: "failed to update classes"});
	      }
	    }else{
	      console.log("illegal user");
	      res.send(current_user);
	    }
	},

	getclasses:  function({params, current_user, body, query}, res, next){
		if (params.id == current_user._id){
	      try{
	      }catch(e){
	        console.log("getclasses faliure", e)
	        return next({message: "failed to get classes"});
	      }
	    }else{
	      console.log("illegal user");
	      res.send(current_user);
	    }
	},
});