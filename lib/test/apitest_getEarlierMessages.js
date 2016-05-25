'use strict';

// babel --watch=./src --out-dir=./lib
var fetch = require('node-fetch');

var headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  "SESSION-TOKEN": "0773565e-e18a-d12b-c01b-3f4b79f6f710"
};

var contents = {
  method: 'GET',
  headers: headers
};

fetch('http://localhost:3100/messages/getEarlierMessages?from=572281817d75053030dff678&to=572281817d75053030dff679&deadline=2016-01-12T01:00:00.000Z', contents).then(function (res) {
  return res.json();
}).then(function (json) {
  for (var i = 0; i < json.length; i++) {
    console.log(json[i].contents);
  }
}).catch(function (err) {
  console.log(err);
});