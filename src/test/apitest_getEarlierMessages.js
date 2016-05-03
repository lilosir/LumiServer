// babel --watch=./src --out-dir=./lib
var fetch = require('node-fetch');

var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "SESSION-TOKEN": "d4d02868-04c7-6617-97a5-2a7c1daef2d4",
  }

var body = JSON.stringify({username: 'rsheng@lakeheadu.ca', password:'123456'});

fetch('http://localhost:3100/messages?from=rsheng&to=rsheng1',{method: 'GET', headers: headers,})
  .then(function(res) {
    return res.json();
  })
  .then(function(json) {
    console.log(json);

    var earlierMessages = json.map(function(item){
    var server_from = item.from.username.split("@lakeheadu.ca")[0];
      return {
        text: item.message,
        name: server_from,
        image: {uri: "http://localhost:3100/"+item.from.avatar},
        position: 'right' ,
        date: item.created_at,
      }      
    })

    console.log("earlierMessages",earlierMessages)
  })
  .catch(function(err){
    console.log(err);
  })

