const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage',
        generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage',
        generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (newMessage) => {
        console.log('Create message', newMessage);
        io.emit('newMessage',
            generateMessage(newMessage.from, newMessage.text));
    })

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });
});

server.listen(port, () => {
	console.log(`Listening on port ${port}`);
});