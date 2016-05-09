'use strict';

var socketio = require('socket.io');
var users = {};

function initIO(server) {
  var io = socketio(server);

  // io.on('connection', function(socket) {
  //   console.log('a user connected',socket.id);
  //   // user disconnected
  //   socket.on('disconnect', function() {
  //     // console.log('user disconnected',socket.id);
  //   });

  //   //store the users
  //   socket.on('init', function(username){
  //     if(username in users){
  //       console.log('init already',username);
  //     }else{
  //       users[username] = socket.id;
  //       console.log('init',username);
  //     }     
  //   });

  //   socket.on('chat message', function ({from, to, text}){
  //     console.log("from:",from);
  //     console.log("to:",to);
  //     console.log("content:",text);
  //     // io.to(users[to]).emit('chat message',text);
  //   });

  //   socket.emit('one',{hello: 'world'});
  // });
};

module.exports = initIO;