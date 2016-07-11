"use strict";

var fetch = require('node-fetch');

// fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=48.431780,-89.2316&radius=5000&name=sushi+station&key=AIzaSyADgz1b7BX9P7pR2bYRnU7z5HvJ_0o8DSo',{method: 'get'})
// 	.then(function(result){
// 		return result.json();
// 	})
// 	.then(function(places){
// 		console.log(places.results[0].geometry.location)
// 	})
// 	.catch(function(err){
// 	    console.log(err);
// 	})
var from = "From: " + "rsheng@lakeheadu.ca";
var to = "To: " + "Oliver Sheng <sryoliver@gmail.com>";
var date = new Date() + "";
var subject = "Subject: " + "hi";
var content = "hhhh";

var result = from + "\n" + to + "\n" + date + "\n" + subject + "\n" + content;

console.log(result);

var s = [1, 2, 3, 4];