const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Room = require('./Room');

const FloorSchema = new Schema({
    level: {
        type: Number,
        required: true,
        default: 1
    },
    rooms: [Room]
});

module.exports = Room = mongoose.model('rooms', RoomSchema);
