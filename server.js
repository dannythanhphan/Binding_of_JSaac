// const io = require("socket.io")();
// let SOCKET_LIST = {};

// io.sockets.on('connection', (socket) => {
//     socket.id = Math.random();
//     socket.age = 0;
//     SOCKET_LIST[socket.id] = socket;

//     socket.on('disconnect', () => {
//         delete SOCKET_LIST[socket.id];
//     })
// });

// setInterval( () => {
//     for (let i in SOCKET_LIST) {
//         const socket = SOCKET_LIST[i];
//         socket.emit('age', )
//     }
// })

// const port = 8000;
// io.listen(port);
// console.log('listening on port ', port);