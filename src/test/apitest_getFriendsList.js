var fetch = require('node-fetch');

var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "SESSION-TOKEN": "d4d02868-04c7-6617-97a5-2a7c1daef2d4",
  }

var contents = {
  method: 'GET', headers: headers,
};

fetch("http://localhost:3100/users/userfriends/570fc8290fdec5502fe3e4c0", contents)
  .then(function(res){
    return res.json();
  })
  .then(function(friends){
    console.log('friends',friends);
    var fri = friends.map(function(item) {
      return {"username":item.username, "id":item._id, "avatar":"http://localhost:3100/"+item.avatar}});

  
    var bal = fri.sort(function(a,b){
      if(a.username > b.username) return 1;
      if(a.username < b.username) return -1;
      return 0;
    });

    console.log('fri: ',bal.map(i=>i.username));
  })