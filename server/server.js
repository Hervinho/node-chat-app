const path = require('path');
const http = require('http');// will create a server with this http library.
const express = require('express');
const publicPath = path.join(__dirname, '../public');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 2000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server); //get websocket server.

app.use(express.static(publicPath));

//Register event listener. socket argument comes from index.html in public folder
io.on('connection', (socket) => {
  console.log('New user connected');

  //This is emitted to a newly connected user.
  socket.emit('newMessage', {
    from: 'ADMIN',
    text: 'Welcome to chat app',
    joinedAt: new Date().getTime()
  });

  //emit this event to all connnections in chat room EXCEPT the new user.
  socket.broadcast.emit('newMessage', {
    from: 'ADMIN',
    text: 'New User joined chat room',
    joinedAt: new Date().getTime()
  });

  //Listen to custom event from client to server.
  socket.on('createMessage', (message) => {
    console.log('createMessage', message);

    //emit this event to ALL connnections
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });

    //emit this event to all connnections EXCEPT the selected socket.
    /*socket.broadcast.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });*/
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected.');
  });
});

//Using http instead of express in order to create a server.
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
