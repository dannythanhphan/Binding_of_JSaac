const User = require("./models/User");
const socket_io = require('socket.io');
const io = socket_io();
const watchUsers = () => {

    const changeStream = User.watch();

    changeStream.on('change', (change) => {
        console.log('hellooo')
        console.log(change); // You could parse out the needed info and send only that data. 
        io.emit('changeData', change);
    }); 

    io.on('connection', function () {
        console.log('connected');
    });

}


module.exports = watchUsers;