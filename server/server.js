const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'adi@example.com',
        text: 'Salut baietii mei',
        createAt: 123
    });

    socket.on('createMessage', (newMessage) => {
        console.log('Create message', newMessage);
    })

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });
});


console.log(publicPath);

server.listen(port, () => {
	console.log(`Listening on port ${port}`);
});