'use strict';

// babel --watch=./src --out-dir=./lib
var fetch = require('node-fetch');

var headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  "SESSION-TOKEN": "ebe682f9-be26-7935-54da-f7e8be7cae0f"
};

var body = JSON.stringify({
  classificaiton: 'addFriendRequest',
  id: '574761f43ce12658159781b5'
});

var contents = {
  method: 'POST',
  headers: headers,
  body: body
};

fetch('http://localhost:3100/notifications/changeToRead/574761f43ce12658159781b3', contents).then(function (res) {
  return res.json();
}).then(function (json) {
  console.log(json);
}).catch(function (err) {
  console.log(err);
});