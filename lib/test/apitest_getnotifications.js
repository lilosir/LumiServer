'use strict';

// babel --watch=./src --out-dir=./lib
var fetch = require('node-fetch');

var headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  "SESSION-TOKEN": "1a3f3e53-8216-dd43-2422-2cad3d64351d"
};

var contents = {
  method: 'GET',
  headers: headers
};

fetch('http://localhost:3100/notifications/getnotifications/574761f43ce12658159781b3', contents).then(function (res) {
  return res.json();
}).then(function (json) {
  console.log(json);
}).catch(function (err) {
  console.log(err);
});