var socket = io();

//listen to on connect event.
socket.on('connect', function (){
  console.log('Connected to server.');

  //emit custom event createMessage from client to server.
  socket.emit('createMessage', {
    from: 'Client',
    text: 'Hey Server!'
  });
});

//listen to on disconnect event.
socket.on('disconnect', function (){
  console.log('Diconnected from server.');
});

//listen to custom event newMessage.
socket.on('newMessage', function (message){
  console.log('newMessage.', message);
});
