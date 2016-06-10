// babel --watch=./src --out-dir=./lib
var fetch = require('node-fetch');

var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "SESSION-TOKEN": "77035c54-44e9-c0b5-ed31-43f157ab0a77",
  }

var body = JSON.stringify({
  category:"publicPost",
  subject: "first post",
  text:"I feel really good that I have made this app!",
  image:["http://www.bbb.com/app.png","http://www.bbb.com/app123.png"],
  });

var contents = {
  method: 'POST', 
  headers: headers, 
  body: body,
};

fetch('http://localhost:3100/posts/createPost/574761f43ce12658159781b3',contents)
  .then(function(res) {
    return res.json();
  })
  .then(function(json) {
    console.log(json);
  })
  .catch(function(err){
    console.log(err);
  })

