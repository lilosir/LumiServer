var Posts = require('../models/posts');
var Sessions = require("../models/sessions");
var ifExists = require("../utilities/ifExists");
var GUID = require("../utilities/GUID");

var Ctrl = require('../Controller');

module.exports = Ctrl.createController({

  //the array below contains the registed functions which are need to add extra functions before executing
  findSession: ['createPost'],

  createPost: async function({params, current_user, body, query}, res, next){

  	console.log('body category', body.category);
  	if(params.id == current_user._id){

  		//if this is a publi post
  		if(body.category == "publicPost"){
  			console.log("!!!")
  			try{
  				var image = [];
  				var post;

  				if(body.image.length > 0){
  					for (var i = 0; i < body.image.length; i++) {
  						image.push({uri:body.image[i]});
  					}
  				}
  				post = await Posts.create({
	  				user: params.id,
	  				category: body.category,
	  				body:{
	  					subject: body.subject,
	  					text: body.text,
	  					image: image,
	  				}})

          // post = await Posts.findById(post._id).exec();

  				return res.send(post);

  			}catch(e){
  				return next({message: e.message})
  			}
  			
  		}

  	}else{
  	  console.log("illegal user");
      res.send(current_user);
  	}
  },

  getPosts: async function(req, res, next){

    var {
      category,
      direction,
      date,
    } = req.query;

    console.log(req.query);
    var posts = [];
    try{
      if(direction == 'older'){
        posts = await Posts.find({
          category:'publicPost',
          created_at: {$lt: date, }}).sort('-created_at').limit(5).populate("user","avatar nickname");;
      }

      if(direction == 'newer'){
        posts = await Posts.find({
          category:'publicPost',
          created_at: {$gte: date, }}).sort('-created_at').limit(5).populate("user","avatar nickname");;
      }

      res.send(posts);
    }catch(e){
      return next({message: e.message});
    }
  },

});