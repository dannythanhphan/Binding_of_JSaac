const Lobby = require("./models/Lobby");
const socket_io = require("socket.io");
const io = socket_io();
io.listen(8000);

const watchLobbies = () => {
    const changeStream = Lobby.watch({fullDocument: 'updateLookup'});

    const lobby = io.of(`/lobby`);


    lobby.on('connection', (socket) => {
        socket.on('room', room => {
            socket.join(room);
        })

        socket.on('leave', room => {
            socket.leave(room);
        })

    })

    changeStream.on("change", change => {
        lobby.to(change.fullDocument.lobbykey).emit("changeLobbyData", change);
    });

};

module.exports = watchLobbies;
