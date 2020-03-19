const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MonsterSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    level: {
        type: Number,
        default: 1,
    },
    totalHP: {
        type: Number,
        default: 100,
    },
    currentHP: {
        type: Number,
        default: 100,
    },
    meleeAttack: {
        type: Number,
        default: 15,
    },
    meleeSpeed: {
        type: Number,
        default: 1,
    },
    rangedAttack: {
        type: Number,
        default: 5,
    },
    rangedSpeed: {
        type: Number,
        default: 2,
    },
    movementSpeed: {
        type: Number,
        default: 1,
    },
    defense: {
        type: Number,
        default: 0,
    },
    intelligent: {
        type: Boolean,
        default: true,
    },
    xPos: {
        type: Number,
        required: true
    },
    yPos: {
        type: Number,
        required: true
    },
    // add lobby and items later, possibly add crits
});

module.exports = Monster = mongoose.model('monsters', MonsterSchema);