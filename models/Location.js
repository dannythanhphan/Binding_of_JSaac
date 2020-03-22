const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    character: {
        type: Schema.Types.ObjectId,
        ref: 'characters'
    },
    floor: {
        type: Number,
        required: true,
        default: 1
    },
    room: {
        type: Number,
        required: true,
        default: 5
    },
    xPos: {
        type: Number,
        required: true,
        default: 8
    },
    yPos: {
        type: Number,
        required: true,
        default: 5
    },
});

module.exports = Location = mongoose.model('locations', LocationSchema);