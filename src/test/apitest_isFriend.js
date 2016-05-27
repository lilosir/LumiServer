var fetch = require('node-fetch');

var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "SESSION-TOKEN": "370dbb1a-3b84-3555-84d3-8d5f4b0b3b87",
  }


var contents = {
  method: 'GET', 
  headers: headers,
};

fetch("http://localhost:3100/users/isFriend?friend_id=574761f43ce12658159781b4&current_id=574761f43ce12658159781b3", contents)
	.then(function (res){
		return res.json();
	})
	.then(function (json){
		console.log('json',json);
	})
	.catch(function(err){
    	console.log('err',err);
  	})	

