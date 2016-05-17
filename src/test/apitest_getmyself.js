var fetch = require('node-fetch');

var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "SESSION-TOKEN": "d79ac02f-0c60-b238-5f80-da0329e85c44",
  }

var contents = {
  method: 'GET', headers: headers,
};

fetch("http://localhost:3100/users/myself/572281817d75053030dff678", contents)
  .then(function(res){
    return res.json();
  })
  .then(function(me){
    console.log('me',me);
  })
  .catch(function(err){
      console.log('err',err);
    })