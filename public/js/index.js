var socket = io();

//listen to on connect event.
socket.on('connect', function (){
  console.log('Connected to server.');
});

//listen to on disconnect event.
socket.on('disconnect', function (){
  console.log('Diconnected from server.');
});

//listen to custom event newMessage.
socket.on('newMessage', function (message){
  console.log('newMessage.', message);
});
