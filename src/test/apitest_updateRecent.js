var fetch = require('node-fetch');

var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "SESSION-TOKEN": "adb10868-e86b-0b22-e7cf-0ae406714cc7",
  }

var body = JSON.stringify({'friendID': '572794305b7c515807c3452d',});

var contents = {
  method: 'POST', 
  headers: headers,
  body:body,
};

fetch("http://localhost:3100/users/updateRecent/572281817d75053030dff678", contents)
	.then(function (res){
		return res.json();
	})
	.then(function (json){
    // json = json.reverse()
		console.log('json',json);
	})
	.catch(function(err){
    	console.log('err',err);
  	})	

