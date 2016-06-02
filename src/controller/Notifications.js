var Ctrl = require('../Controller');
var Users = require('../models/users');
var ifExists = require("../utilities/ifExists");
var Notifications = require('../models/notifications');

module.exports = Ctrl.createController({

	findSession:['getnotifications', 'changeToRead'],

	getnotifications: async function({params, current_user, body, query}, res, next){

		if(params.id == current_user._id){
			try{
				var notifications = await Notifications.find({user: params.id}).populate("contents.from", 'avatar nickname').exec();
				return res.send(notifications);
			}catch(e){
				return next({message: e.message});
			}
		}else{
		    console.log("illegal user");
		     res.send(current_user);
	    }

	},

	changeToRead: async function({params, current_user, body, query}, res, next){

		var{
			classificaiton,
          	id,
		} = body;

		if(params.id == current_user._id){

			try{
				var notification = await Notifications.findOneAndUpdate({
				user: params.id, 
				'contents.from': id,
				'contents.classificaiton': classificaiton,
				'contents.ifread': false},
				{$set: {'contents.$.ifread': true}}).exec();

				notification = await Notifications.findOne({
					user: params.id, 
					'contents.from': id,
					'contents.classificaiton': classificaiton,
				}).exec();

				res.send(notification);
			}catch(e){
				return next({message: e.message});
			}
			
		}else{
			console.log("illegal user");
		    res.send(current_user);
		}
	}
})