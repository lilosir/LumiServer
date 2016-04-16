'use strict';

var socketio = require('socket.io');
var users = {};

function initIO(server) {
  var io = socketio(server);

  io.on('connection', function (socket) {
    console.log('a user connected', socket.id);
    // user disconnected
    socket.on('disconnect', function () {
      console.log('user disconnected', socket.id);
    });

    //store the users
    socket.on('init', function (username) {
      if (username in users) {} else {
        users[username] = socket.id;
        console.log('init', username);
      }
    });

    socket.on('chat message', function (_ref) {
      var from = _ref.from;
      var to = _ref.to;
      var text = _ref.text;

      console.log("from:", from);
      console.log("to:", to);
      console.log("content:", text);
      io.to(users[to]).emit('chat message', text);
    });
  });
};

module.exports = initIO;