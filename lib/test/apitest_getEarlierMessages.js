'use strict';

// babel --watch=./src --out-dir=./lib
var fetch = require('node-fetch');

var headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  "SESSION-TOKEN": "e161346f-b7f4-5c4d-ff25-31143ac5bd33"
};

var contents = {
  method: 'GET',
  headers: headers
};

fetch('http://localhost:3100/messages/getEarlierMessages?from=574761f43ce12658159781b3&to=574761f43ce12658159781b4&deadline=2016-06-12T01:00:00.000Z', contents).then(function (res) {
  return res.json();
}).then(function (json) {
  for (var i = 0; i < json.length; i++) {
    console.log(json[i].contents);
  }
}).catch(function (err) {
  console.log(err);
});