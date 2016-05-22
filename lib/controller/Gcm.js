// var Gcms = require('../models/googleCloudMessaging');
// var ifExists = require("../utilities/ifExists");

// module.exports = {

// 	register: async function(req, res, next){
// 		// console.log("----------------",req.body);
// 		var {
// 	      token,
// 	      userid,
// 	    } = req.body;

// 	    try{
// 	    	var gcmUser = await ifExists.gcmUser(userid);

// 	    	if(!gcmUser){
// 	    		// console.log("no gcm................")
// 	    		//no token and no users, create a new one
//     			var gcm = await Gcms.create({user: userid, tokens: [token]});
//     			// console.log('registed gcm');
//     			res.send({message: 'registed gcm'})
// 	    	}else{
// 	    		// console.log("there ..................")
// 	    		//this user exist, but not registed this token
// 	    		var gcmToken = await ifExists.gcmToken(userid, token);

// 	    		if(!gcmToken){
// 	    			gcmToken = await Gcms.findOneAndUpdate({user: userid},
// 	    				{$push:{'tokens': token}});
// 	    			// console.log('push you into this token user list');
// 	    			res.send({message: 'push this token into your list'})
// 	    		}else{
// 	    			// console.log("gcm token user map already exists");
// 	    			res.send({message: 'you are already in this token user list'});
// 	    		}
// 	    	}

// 	    }catch(e){
// 	    	return next({message: e.message});
// 	    }

// 	},

// };
"use strict";