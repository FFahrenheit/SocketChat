const express = require('express');
const socket = require('socket.io');
const port = process.env.PORT || 4000;

let app = express();

let server = app.listen(port, () => {
    console.log('Running server on port ' + port);
});

app.use(express.static('public'));

let io = socket(server);

io.on('connection', (socket) => {
    console.log('New connection: ' + socket.id);

    //Chat event
    socket.on('chat', data => {
        io.sockets.emit('chat', data);
    });

    socket.on('typing', data => {
        socket.broadcast.emit('typing', data);
    });

});