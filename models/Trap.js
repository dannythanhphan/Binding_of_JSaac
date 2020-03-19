const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrapSchema = new Schema({
    type: {
        type: String,
        required: true,
        default: "spike"
    },
    xPos: {
        type: Number,
        required: true
    },
    yPos: {
        type: Number,
        required: true
    },
});

module.exports = Trap = mongoose.model('traps', TrapSchema);