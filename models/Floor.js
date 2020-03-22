const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Room = require('./Room');
const Exit = require('./Exit');

const FloorSchema = new Schema({
    level: {
        type: Number,
        required: true,
        default: 1
    },
    rooms: {
        type: [Room.schema]
    },
    exit: {
        type: Exit.schema
    }
});

module.exports = Floor = mongoose.model('floors', FloorSchema);
