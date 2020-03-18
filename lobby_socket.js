const Lobby = require("./models/Lobby");
const socket_io = require("socket.io");
const io = socket_io();
io.listen(8000);
const watchLobbies = () => {
    const changeStream = Lobby.watch();

    const lobby = io.of(`/lobby`);


    lobby.on('connection', (socket) => {
        socket.on('room', (room) => {
            socket.join(room);
        })

    })

    changeStream.on("change", change => {
        setInterval( () => {
            lobby.to(change.fullDocument.lobbykey).emit("changeLobbyData", "blah");
        }, 1000)
    });

};

module.exports = watchLobbies;
