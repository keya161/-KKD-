const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const PORT = process.env.PORT || 4000;
let rooms={};
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let players = {}; // Dictionary to store player IDs and their associated socket IDs

io.on('connection', socket => {
    console.log('A user connected');

    socket.on('createRoom', () => {
        const roomId = generateRoomId();
        rooms[roomId] = [socket.id];
        socket.emit('roomCreated', roomId); // Emit the room ID to the client
    });

    socket.on('joinRoom', ({ roomId, username }) => {
        if (rooms[roomId] && rooms[roomId].length < 4) {
            rooms[roomId].push({ id: socket.id, username: username }); // Associate username with socket ID
            socket.join(roomId);
            io.to(roomId).emit('playerJoined', { id: socket.id, username: username }); // Notify existing players in the room
    
            players[socket.id] = { id: socket.id, username: username }; // Add player to dictionary with socket ID as key
    
            emitPlayerList(); // Emit updated player list to all clients
        } else {
            socket.emit('roomFull');
        }
    });
    

    socket.on('disconnect', () => {
        for (const roomId in rooms) {
            if (rooms[roomId].includes(socket.id)) {
                rooms[roomId] = rooms[roomId].filter(id => id !== socket.id);
                io.to(roomId).emit('playerLeft', socket.id);
            }
        }
        delete players[socket.id]; // Remove player from dictionary upon disconnect
        emitPlayerList(); // Emit updated player list to all clients
    });
    socket.on('spinWheel', () => {
        console.log('Spinning the wheel...');
        io.emit('navigateToSpinWheel'); // Emit an event to navigate to the '/spinwheel' route
    });

    socket.on('playerJoined', playerId => {
        console.log('Player joined:', playerId);
        players[socket.id] = { id: playerId }; // Add player to dictionary with socket ID as key
        emitPlayerList(); // Emit updated player list to all clients
    });

    // Function to emit updated player list to all clients
    // Function to emit updated player list to all clients
function emitPlayerList() {
    const usernames = Object.values(players).map(player => player.username);
    io.emit('allPlayers', usernames);
}

});



function generateRoomId() {
    return Math.floor(Math.random() * 1000000); 
}


app.use(express.static(__dirname + '/public'));

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
