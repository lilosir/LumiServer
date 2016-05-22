var fetch = require('node-fetch');

var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "SESSION-TOKEN": "",
  }

var body = JSON.stringify({token: '572794305b7c515807c3452d', userid: '123'});

var contents = {
  method: 'POST', 
  headers: headers,
  body:body,
};

fetch("http://localhost:3100/gcm/register", contents)
	.then(function (res){
		return res.json();
	})
	.then(function (json){
		console.log('json',json);
	})
	.catch(function(err){
    	console.log('err',err);
  })	

