var Posts = require('../models/posts');
var Sessions = require("../models/sessions");
var ifExists = require("../utilities/ifExists");
var GUID = require("../utilities/GUID");

var Ctrl = require('../Controller');

module.exports = Ctrl.createController({

  //the array below contains the registed functions which are need to add extra functions before executing
  findSession: ['createPost','likeOrDislike','submitComment'],

  createPost: async function({params, current_user, body, query}, res, next){

  	console.log('body category', body.category);
  	if(params.id == current_user._id){

  		//if this is a publi post
  		// if(body.category == "publicPost"){
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
              current: body.current,
              original: body.original,
	  				}})

          // post = await Posts.findById(post._id).exec();

  				return res.send(post);

  			}catch(e){
  				return next({message: e.message})
  			}
  			
  		// }

  	}else{
  	  console.log("illegal user");
      res.send(current_user);
  	}
  },

  getPosts: async function(req, res, next){

    var {
      id,
      category,
      direction,
      date,
    } = req.query;

    // console.log(req.query);
    var posts = [];
    try{
      
      if(id){
        // fetch the specific one
        posts = await Posts.findById(id)
        .populate("user","avatar nickname")
        .populate("comments.by","avatar nickname")
        .exec();
      }else{
        // fetch all the older or newer

        if(direction == 'older'){
          posts = await Posts.find({
            category: category,
            created_at: {$lt: date, }})
          .sort('-created_at')
          .limit(5)
          .populate("user","avatar nickname")
          .populate("comments.by","avatar nickname").exec();
        }

        if(direction == 'newer'){
          posts = await Posts.find({
            category: category,
            created_at: {$gt: date, }})
          .sort('-created_at')
          .limit(5)
          .populate("user","avatar nickname")
          .populate("comments.by","avatar nickname").exec();
        }
      }

      return res.send(posts);
    }catch(e){
      return next({message: e.message});
    }
  },

  likeOrDislike: async function({params, current_user, body, query}, res, next){
    if(params.id == current_user._id){
      var {
        id,
        ifLike,
      } = body;

      var post;
      try{
        var post1 = await Posts.findByIdAndUpdate(id,{$pull: {like: params.id}}).exec();
        var post2 = await Posts.findByIdAndUpdate(id,{$pull: {dislike: params.id}}).exec();

        if(ifLike){
          post1 = await Posts.findByIdAndUpdate(id,{$push: {like: params.id}}).exec();              
          return res.status(200).send({message: 'liked it successfully'});
        }else{
          post2 = await Posts.findByIdAndUpdate(id,{$push: {dislike: params.id}}).exec();              
          return res.status(200).send({message: 'disliked it successfully'});
        }
      }catch(e){
        return next({messgae: e.messgae});
      }
    }else{
      console.log("illegal user");
      res.send(current_user);
    }
  },

  submitComment: async function({params, current_user, body, query}, res, next){
    
    if(params.id == current_user._id){
      var {
        postId,
        comment,
      } = body;

      try{
        var result = await Posts.findByIdAndUpdate(postId, {$push: {comments: {by: params.id, content: comment}}}).exec();
        
        return res.status(200).send({message: 'comment successfully'});
      }catch(e){
        return next({message: e.message})
      }
    }else{
      console.log("illegal user");
      res.send(current_user);
    }
  },

});