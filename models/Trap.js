const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrapSchema = new Schema({
    type: {
        type: String,
        required: true,
        default: "spike"
    },
    meleeAttack: {
        type: Number,
        required: true,
        default: 20
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