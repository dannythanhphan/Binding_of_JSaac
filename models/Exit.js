const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExitSchema = new Schema({
    location: {
        type: Number,
        required: true,
        default: -1
    },
    xPos: {
        type: Number,
        required: true,
        default: -1
    },
    yPos: {
        type: Number,
        required: true,
        default: -1
    }
});

module.exports = Exit = mongoose.model('exits', ExitSchema);
