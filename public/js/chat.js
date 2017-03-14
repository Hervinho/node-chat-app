var socket = io();

//Function that will do thee auto scrolling
function scrollDown(){
  //selectors
  var messages = $('#messages');
  var newMsg = messages.children('li:last-child');//get new message sent.

  //heights
  var clientHeight = messages.prop('clientHeight');//what is displayed on client screen.
  var scrollHeight = messages.prop('scrollHeight');// actual height of div of messages.
  var scrollTop = messages.prop('scrollTop');// scrollHeight - clientHeight
  var newMsgHeight = newMsg.innerHeight();//get height of new message that arrived.
  var lastMsgHeight = newMsg.prev().innerHeight();//get height of second to last message.

  //if close to the bottom, then scroll down.
  if(clientHeight + scrollTop + newMsgHeight + lastMsgHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}

//listen to on connect event.
socket.on('connect', function (){
  console.log('Connected to server.');

  //get user and room names from user
  var params = $.deparam(window.location.search);
  socket.emit('join', params, function (error){
    if(error){
      alert(error);
      window.location.href = '/';
    }
    else{
      console.log('No error!!');
    }
  });
});

// event to update users' list in the UI.
socket.on('updateUserList', function (userNamesArray){
  var ul = $('<ul></ul>');

  //Load users'list
  userNamesArray.forEach(function (user){
    ul.append($('<li></li>').text(user));
  });

  //Update UI with users'list
  $('#users').html(ul);
});

//listen to disconnect event.
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
  scrollDown();
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
