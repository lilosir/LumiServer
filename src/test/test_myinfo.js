var fetch = require('node-fetch');

var headers = {
        
  }

var body;

var contents = {
  method: 'POST', 
  headers: headers,
  body:body,
};

fetch("http://localhost:3100/gcm/register", contents)
	.then(function (res){
		return res;
	})
	.then(function (json){
		console.log('json',json);
	})
	.catch(function(err){
    	console.log('err',err);
  })	

