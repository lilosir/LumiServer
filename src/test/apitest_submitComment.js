// babel --watch=./src --out-dir=./lib
var fetch = require('node-fetch');

var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "SESSION-TOKEN": "b56dce79-b03d-8c39-1e06-555bc5ac9fd3",
  }

var body = JSON.stringify({
  id:"575ef64f14235f804efe5835",
  comment:"I feel really good that I have made this app!",
  });

var contents = {
  method: 'POST', 
  headers: headers, 
  body: body,
};

fetch('http://localhost:3100/posts/submitComment/574761f43ce12658159781b3',contents)
  .then(function(res) {
    return res.json();
  })
  .then(function(json) {
    console.log(json);
  })
  .catch(function(err){
    console.log(err);
  })

