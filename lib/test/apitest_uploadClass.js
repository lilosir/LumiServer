'use strict';

// babel --watch=./src --out-dir=./lib
var fetch = require('node-fetch');

var headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  "SESSION-TOKEN": "b24d795c-4b0b-6ee6-1593-8fdfa415bf47"
};
var body = {
  subject: "AI",
  instructor: 'Dr. Sabah',
  room: 'AT1020',
  days: "M",
  starttime: '10:00',
  endtime: '11:30'
},
    body = JSON.stringify(body);

var contents = {
  method: 'POST',
  headers: headers,
  body: body
};

fetch('http://localhost:3100/classes/updateclasses/574761f43ce12658159781b3', contents).then(function (res) {
  return res.json();
}).then(function (json) {
  console.log(json);
}).catch(function (err) {
  console.log(err);
});