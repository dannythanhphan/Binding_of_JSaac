const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ROOM_WIDTH = 21;
const ROOM_HEIGHT = 15;
const TILE_SIZE = 100;

const RoomSchema = new Schema({
    roomId: {
        type: Number,
        required: true
    },
    width: {
        type: Number,
        required: true,
        default: ROOM_WIDTH
    },
    height: {
        type: Number,
        required: true,
        default: ROOM_HEIGHT
    },    
    leftExit: {
        type: Boolean,
        required: true
    },
    rightExit: {
        type: Boolean,
        required: true
    },    
    topExit: {
        type: Boolean,
        required: true
    },
    bottomExit: {
        type: Boolean,
        required: true
    },
});

module.exports = Room = mongoose.model('rooms', RoomSchema);
