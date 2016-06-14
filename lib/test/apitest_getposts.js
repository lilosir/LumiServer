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

fetch('http://localhost:3100/posts/getPosts?category=publicPost&direction=newer&date=2016-06-10T01:05:39.966Z', contents).then(function (res) {
  return res.json();
}).then(function (json) {

  // var data = json.map(function(item, i){
  //   return {
  //     subject: item.body.subject,
  //     reply: item.comments.length,
  //     like:item.like,
  //     avatar: item.user.avatar,
  //     nickname: item.user.nickname,
  //   }
  // })
  console.log(json[0].comments[0]);
}).catch(function (err) {
  console.log(err);
});