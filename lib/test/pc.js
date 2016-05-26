'use strict';

var fetch = require('node-fetch');

fetch('https://github.com/').then(function (res) {
    return res.text();
}).then(function (body) {
    console.log(body);
});