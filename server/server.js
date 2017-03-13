const path = require('path');
const http = require('http');// will create a server with this http library.
const express = require('express');
const publicPath = path.join(__dirname, '../public');
const socketIO = require('socket.io');

var {generateMessage} = require('./utils/message');

const PORT = process.env.PORT || 2000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server); //get websocket server.

app.use(express.static(publicPath));

//Register event listener. socket argument comes from index.html in public folder
io.on('connection', (socket) => {
  console.log('New user connected');

  //This is emitted to a newly connected user.
  socket.emit('newMessage', generateMessage('ADMIN', 'Welcome to chat app'));

  //emit this event to all connnections in chat room EXCEPT the new user.
  socket.broadcast.emit('newMessage', generateMessage('ADMIN', 'New User joined chat'));

  //Listen to custom event from client to server.
  //P.S. adding a callback for event acknowledgement
  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);

    //emit this event to ALL connnections
    io.emit('newMessage', generateMessage(message.from, message.text));

    //send event acknowledgement
    callback('From server: Message received!!!');

  });

  //Listen to location event.
  socket.on('createLocationMessage', (coords) => {
    //emit location to ALL connnections
    io.emit('newMessage', generateMessage('Admin', `${coords.latitude}, ${coords.longitude}`));
  });

  //Listen to disconnect event.
  socket.on('disconnect', () => {
    console.log('User was disconnected.');
  });
});

//Using http instead of express in order to create a server.
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
