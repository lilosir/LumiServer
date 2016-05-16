var Gcms = require('../models/gcms');
var ifExists = require("../utilities/ifExists");

module.exports = {

	register: async function(req, res, next){
		// console.log("----------------",req.body);
		var {
	      token,
	      userid,
	    } = req.body;

	    try{
	    	var gcm = await ifExists.gcm(token, userid);

	    	//already resigtered
	    	if(!gcm){
	    		var gcmToken = await ifExists.gcmToken(token);
	    		
	    		if(!gcmToken){
	    			//no token and no users
	    			gcm = await Gcms.create({token: token, users:[userid]});
	    			console.log('registed gcm');
	    			res.send({message: 'registed gcm'})
	    		}else{
	    			//there is at least one user for this token
	    			gcm = await Gcms.findOneAndUpdate({token:token}, 
	    				{$push:{'users': {_id: userid}}});
	    			console.log('push you into this token user list');
	    			res.send({message: 'push you into this token user list'})
	    		}

	    		gcm = await Gcms.findOne({token: token}).populate('users');
	    		console.log('gcm',gcm);
	    	}else{
	    		console.log("gcm token user map already exists", gcm);
	    		res.send({message: 'you are already in this token user list'});
	    	}

	    }catch(e){
	    	return next({message: e.message});
	    }
		
	},
};