// babel --watch=./src --out-dir=./lib
var fetch = require('node-fetch');

var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "SESSION-TOKEN": "84562664-058d-ec15-3146-ee631f298e99",
  }

var bd = {
	to: '572281817d75053030dff679',
	text: {
		text: 'hi',
	    name: 'rsheng1',
	    image: {uri: 'https://facebook.github.io/react/img/logo_og.png'},
	    position: 'right',
	    date: new Date(2016, 0, 13, 20, 0),
	    uniqueId: Math.round(Math.random() * 1000000),
	}
};

var body = JSON.stringify(bd);

var contents = {
  method: 'POST', 
  headers: headers,
  body:body,
};

fetch('http://localhost:3100/messages/storeMessages/572281817d75053030dff678', contents)
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