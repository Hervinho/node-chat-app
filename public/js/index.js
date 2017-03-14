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
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#messageTemplate').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    time: formattedTime
  });
  $('#messages').append(html);
});

//Listener for message form.
$('#messageForm').on('submit', function(e){
  //prevent default page refresh on submit.
  e.preventDefault();
  var messageTextBox = $('[name=message]');

  //emit custom event createMessage. Here user posts in the chat app.
  socket.emit('createMessage', {
    from: 'Browser',
    text: messageTextBox.val()
  }, function (data){
      messageTextBox.val('');
  });
});
