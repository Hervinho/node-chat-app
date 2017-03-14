const path = require('path');
const http = require('http');// will create a server with this http library.
const express = require('express');
const publicPath = path.join(__dirname, '../public');
const socketIO = require('socket.io');

var {generateMessage} = require('./utils/message');
const {isRealString} = require('./utils/validator');
const {Users} = require('./utils/users');

const PORT = process.env.PORT || 2000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server); //get websocket server.
var users = new Users();

app.use(express.static(publicPath));

//Register event listener. socket argument comes from index.html in public folder
io.on('connection', (socket) => {
  console.log('New user connected');
  /*
  //This is ONLY emitted to a newly connected user.
  socket.emit('newMessage', generateMessage('ADMIN', 'Welcome to chat app'));

  //emit this event to all connnections in chat room EXCEPT the new user.
  socket.broadcast.emit('newMessage', generateMessage('ADMIN', 'New User joined chat'));
  */

  /*Listen to events from client to server. P.S Adding callbacks for acknowledgement*/

  //when user joins a room.
  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('User and room names required!!!');
    }

    //join a chat room
    socket.join(params.room);

    //add user to the chat room
    users.removeUser(socket.id);//ensure there is already no user with such id
    users.addUser(socket.id, params.name, params.room);

    //emit to ALL users in ONE chat room
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    //This is ONLY emitted to a newly connected user.
    socket.emit('newMessage', generateMessage('ADMIN', `Welcome to chat room ${params.room}`));

    //emit this event to all connnections in chat room EXCEPT the new user.
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('ADMIN', `${params.name} has joined chat room`));


    //leave a chat room
    //socket.leave(params.room);

    callback();
  });

  socket.on('createMessage', (message, callback) => {
    var userInChatRoom = users.getUser(socket.id);

    //if such user exists and his/her message is valid
    if(userInChatRoom && isRealString(message.text)){
      //emit message to ALL users in the chat room
      io.to(userInChatRoom.room).emit('newMessage', generateMessage(userInChatRoom.name,
        message.text));

    }

    //emit this event to ALL connnections
    //io.emit('newMessage', generateMessage(message.from, message.text));

    //send event acknowledgement
    callback('From server: Message received!!!');

  });

  //Listen to disconnect event.
  socket.on('disconnect', () => {
    var userRemoved = users.removeUser(socket.id);

    //if user leaves the room after he had joined.
    if(userRemoved){
      //update users' list after a user has left the chat room.
      io.to(userRemoved.room).emit('updateUserList', users.getUserList(userRemoved.room));

      //Let chat room members know that a user has left the chat room.
      io.to(userRemoved.room).emit('newMessage', generateMessage('ADMIN', `${userRemoved.name} has left chat room`));
    }
  });
});

//Using http instead of express in order to create a server.
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
