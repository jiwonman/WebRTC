const express = require('express');
const app = express();
const fs = require('fs');

const options = {
    key : fs.readFileSync('./private.pem'),
    cert : fs.readFileSync('./public.pem')
};

const server = require('https').createServer(options, app);
const io = require('socket.io')(server);

app.use('/', express.static('public'));

io.on('connection', (socket) => {
    socket.on('join', (roomId) => {
        const roomClients = io.sockets.adapter.rooms.get(roomId) || { size : 0 };
        const numberOfClients = roomClients.size;

        if(numberOfClients == 0) {
            console.log(`Creating room ${roomId} and emitting room_created socket event`);
            socket.join(roomId);
            socket.emit('room_created', roomId)
        } else if ( numberOfClients == 1 ) {
            console.log(`Joining room ${roomId} and emitting room_joined socket event`);
            socket.join(roomId);
            socket.emit('room_joined', roomId);

        } else {
            console.log(`Can't join room ${roomId}, emitting full_room socket event`);
            socket.emit('full_room', roomId);
        }
    })

    socket.on('start_call', (roomId) => {
        console.log(`Broadcasting start_call event to peers in room ${roomId}`);
        socket.broadcast.to(roomId).emit('start_call');
    })

    socket.on('webrtc_offer', (event) => {
        console.log(`Broadcasting webrtc_offer event to peers in room ${event.roomId}`);
        socket.broadcast.to(event.roomId).emit('webrtc_offer', event.sdp);
    })
    socket.on('webrtc_answer', (event) => {
        console.log(`Broadcasting webrtc_answer event to peers in room ${event.roomId}`);
        socket.broadcast.to(event.roomId).emit('webrtc_answer', event.sdp);
    })
    socket.on('webrtc_ice_candidate', (event) => {
        console.log(`Broadcasting webrtc_ice_candidate event to peers in room ${event.roomId}`);
        socket.broadcast.to(event.roomId).emit('webrtc_ice_candidate', event);
    })
})

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
})