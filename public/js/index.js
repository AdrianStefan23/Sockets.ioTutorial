let socket = io();

socket.on('connect', function () {
    console.log("Connected to server");
});

socket.on('disconnect', function () {
    console.log('User was disconnected');
});

socket.on('newMessage', function (message) {
    console.log(message);
    let li = $('<li></li>')
    li.text(`${message.from}: ${message.text}`);
    $('#messages').append(li);
});

jQuery('#message-form').submit(function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    })
});