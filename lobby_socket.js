const Lobby = require("./models/Lobby");
const socket_io = require("socket.io");
const io = socket_io();
io.listen(5000);

const watchLobbies = () => {
    const changeStream = Lobby.watch({fullDocument: 'updateLookup'});

    const lobby = io.of(`/lobby`);


    lobby.on('connection', (socket) => {
        console.log("why does nothing work")
        socket.on('room', room => {
            console.log("pleaseeeee")
            socket.join(room);
        })
        
        socket.on('dungeonRefresh', data => {
            console.log("asdfdfasdf")
            lobby.to(data.room).emit("receiveDungeon", data.char);
        })

        socket.on('leave', room => {
            socket.leave(room);
        })


    })

    changeStream.on("change", change => {
        lobby.to(change.fullDocument.lobbykey).emit("changeLobbyData", change.fullDocument);
    });

};

module.exports = watchLobbies;
