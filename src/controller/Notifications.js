var Ctrl = require('../Controller');
var Users = require('../models/users');
var ifExists = require("../utilities/ifExists");
var Notifications = require('../models/notifications');

module.exports = Ctrl.createController({

	findSession:['getnotifications'],

	getnotifications: async function({params, current_user, body, query}, res, next){

		if(params.id == current_user._id){
			try{
				var notifications = await Notifications.find({user: params.id}).exec();
				return res.send(notifications);
			}catch(e){
				return next({message: e.message});
			}
		}else{
		    console.log("illegal user");
		     res.send(current_user);
	    }

	}
})