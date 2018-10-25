let socket = io();

socket.on('connect', function () {
    console.log("Connected to server");
    
    socket.emit('createMessage', {
        from: 'jen@example.com',
        text: 'Te salut frate'
    })
});

socket.on('disconnect', function () {
    console.log('User was disconnected');
});

socket.on('newMessage', function (email) {
    console.log("Got message: " + email.text);

})