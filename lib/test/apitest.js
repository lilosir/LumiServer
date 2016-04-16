'use strict';

// babel --watch=./src --out-dir=./lib
var fetch = require('node-fetch');

var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    "SESSION-TOKEN": "82de3053-99ab-d6c5-50ec-887e30671bcf"
};

var body = JSON.stringify({ username: 'rsheng@lakeheadu.ca', password: '123456' });

// fetch('http://localhost:3100/users/login', { method: 'POST', headers: headers, body: body })
//     .then(function(res) {
//         return res.json();
//     }).then(function(json) {
//         console.log(json);
//     });

// fetch('http://localhost:3100/users/570fc8290fdec5502fe3e4c0', { method: 'GET', headers: headers,})
//     .then(function(res) {
//         return res.json();
//     }).then(function(json) {
//         console.log(json);
//     });

fetch('http://localhost:3100/messages?from=rsheng&to=rsheng1', { method: 'GET', headers: headers }).then(function (res) {
    return res.json();
}).then(function (json) {
    console.log(json);
});