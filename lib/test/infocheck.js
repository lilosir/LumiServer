'use strict';

var fetch = require('node-fetch');
fetch('https://erptc.lakeheadu.ca/WebAdvisorPO/WebAdvisorPO?TOKENIDX=4142163569&SS=1&APP=ST&CONSTITUENCY=WBDF').then(function (res) {
  return res.text();
}).then(function (json) {
  console.log('json', json);
}).catch(function (err) {
  console.log('err', err);
});