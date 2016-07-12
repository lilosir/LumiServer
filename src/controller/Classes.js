var Courses = require('../models/classes');
var Users = require('../models/users');
var Ctrl = require('../Controller');
var ifExists = require("../utilities/ifExists");
var Gcms = require('../models/googleCloudMessaging');

module.exports = Ctrl.createController({
	findSession: ['updateclasses', 'getclasses'],

	updateclasses: async function({params, current_user, body, query}, res, next){
		var {
			subject,
		    instructor,
		    room,
		    days,
		    starttime,
		    endtime,
		} = body;

		console.log("!!!!!!!!!!!!!",body)

		var updates = [{},{},{},{},{}];
		var d_len = days.split(",").length;
		for (var i = 0; i < d_len; i++) {
			var value = days.split(",")[i];
			
			if(value == 'M'){
				updates[i]['monday'] = {
		        	subject:subject,
				    instructor:instructor,
				    room:room,
				    starttime:starttime,
				    endtime:endtime,
		        }
			}else if(value == "T"){
				// console.log('value',i)
				updates[i]['tuesday'] = {
		        	subject:subject,
				    instructor:instructor,
				    room:room,
				    starttime:starttime,
				    endtime:endtime,
		        }
		        // console.log("tuesday",updates[i])
			}else if(value == "W"){
				updates[i]['wednesday'] = {
		        	subject:subject,
				    instructor:instructor,
				    room:room,
				    starttime:starttime,
				    endtime:endtime,
		        }
			}else if(value == "TH"){
				// console.log('value',i)
				updates[i]['thursday'] = {
		        	subject:subject,
				    instructor:instructor,
				    room:room,
				    starttime:starttime,
				    endtime:endtime,
		        }
		        // console.log("thursday",updates[i])
			}else if(value == "F"){
				updates[i]['friday'] = {
		        	subject:subject,
				    instructor:instructor,
				    room:room,
				    starttime:starttime,
				    endtime:endtime,
		        }
			}
		}
		if (params.id == current_user._id){
		  try{
			var courseTable = await Courses.findOne({user:current_user._id});
			
			if(courseTable == null){
				courseTable = await Courses.create({user: current_user._id});
			}
			else{
				for (var i = 0; i < d_len; i++) {
					courseTable = await Courses.update(
						{user:current_user._id},
						{$set: updates[i]}).exec();
				}

				return res.send({'message': "save successfully"})
			}
			for (var i = 0; i < d_len; i++) {
				courseTable = await Courses.update(
					{user:current_user._id},
					{'$push': updates[i]}).exec();
			}
			return res.send({'message': "save successfully"})
	      
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