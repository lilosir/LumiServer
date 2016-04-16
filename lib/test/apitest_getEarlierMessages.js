'use strict';

// babel --watch=./src --out-dir=./lib
var fetch = require('node-fetch');

var headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  "SESSION-TOKEN": "82de3053-99ab-d6c5-50ec-887e30671bcf"
};

var body = JSON.stringify({ username: 'rsheng@lakeheadu.ca', password: '123456' });

fetch('http://localhost:3100/messages?from=rsheng&to=rsheng1', { method: 'GET', headers: headers }).then(function (res) {
  return res.json();
}).then(function (json) {
  console.log(json);

  var earlierMessages = json.map(function (item) {
    var server_from = item.from.username.split("@lakeheadu.ca")[0];
    return {
      text: item.message,
      name: server_from,
      image: { uri: "http://localhost:3100/" + item.from.avatar },
      position: 'right',
      date: item.created_at
    };
  });

  console.log("earlierMessages", earlierMessages);
}).catch(function (err) {
  console.log(err);
});