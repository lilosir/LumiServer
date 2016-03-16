'use strict';

// babel --watch=./src --out-dir=./lib
var fetch = require('node-fetch');

var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

var body = JSON.stringify({ username: 'rsheng@lakeheadu.ca', password: '123456' });

// fetch('http://localhost:3100/users/login', { method: 'POST', headers: headers, body: body })
//     .then(function(res) {
//         return res.json();
//     }).then(function(json) {
//         console.log(json);
//     });

fetch('http://localhost:3100/users/56da60b11e118404986fff40', { method: 'GET', headers: headers }).then(function (res) {
    return res.json();
}).then(function (json) {
    console.log(json);
});