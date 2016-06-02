'use strict';

// babel --watch=./src --out-dir=./lib
var fetch = require('node-fetch');

var headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  "SESSION-TOKEN": "c98574dd-b091-3d70-624e-cf79acb48944"
};

var body = JSON.stringify({
  id: "574761f43ce12658159781b5"
});

var contents = {
  method: 'POST',
  headers: headers,
  body: body
};

fetch('http://localhost:3100/users/addFriend/574761f43ce12658159781b3', contents).then(function (res) {
  return res.json();
}).then(function (json) {
  console.log(json);
}).catch(function (err) {
  console.log(err);
});