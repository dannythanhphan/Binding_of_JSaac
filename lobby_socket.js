const Lobby = require("./models/Lobby");
const socket_io = require("socket.io");
const io = socket_io();
const watchLobbies = () => {
    const changeStream = Lobby.watch();

    changeStream.on("change", change => {
        console.log(change.fullDocument); // You could parse out the needed info and send only that data.
        const lobby = io.of(`/lobby`);
        setInterval( () => {
            lobby.to(change.fullDocument.lobbykey).emit("changeLobbyData", "blah");
        }, 2000)
    });


};

module.exports = watchLobbies;
