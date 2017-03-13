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

  //display incoming messages.
  var li = $('<li></li>').text(`${message.from}: ${message.text}`);
  $('#messages').append(li);
});

//Listener for message form.
$('#messageForm').on('submit', function(e){
  //prevent default page refresh on submit.
  e.preventDefault();

  //emit custom event createMessage. Here user posts in the chat app.
  socket.emit('createMessage', {
    from: 'Browser',
    text: $('[name=message]').val()
  }, function (data){
    console.log(data);
  });
});
