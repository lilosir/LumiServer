'use strict';

var fetch = require('node-fetch');

var headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  "SESSION-TOKEN": "d4d02868-04c7-6617-97a5-2a7c1daef2d4"
};

var query = JSON.stringify({ name: 'rsheng' });

var contents = {
  method: 'GET',
  headers: headers
};

fetch("http://localhost:3100/users/searchFriends?name=rsheng", contents).then(function (res) {
  return res.json();
}).then(function (json) {
  console.log('json', json);
}).catch(function (err) {
  console.log('err', err);
});