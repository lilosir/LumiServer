'use strict';

// babel --watch=./src --out-dir=./lib
var fetch = require('node-fetch');

var headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  "SESSION-TOKEN": ""
};

var contents = {
  method: 'GET',
  headers: headers
};

fetch('http://localhost:3100/posts/getPosts?category=publicPost&direction=older&date=2016-06-10T19:51:39.049Z', contents).then(function (res) {
  return res.json();
}).then(function (json) {

  // var data = json.map(function(item, i){
  //   return {
  //     subject: item.body.subject,
  //     reply: item.comments.length,
  //     like:item.like,
  //     avatar: item.user.avatar,
  //     nickname: item.user.nickname,
  //     image: item.body.image[0],
  //   }
  // })
  console.log(json[0].body.image[0].uri);
}).catch(function (err) {
  console.log(err);
});