const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Dungeon = require('./Dungeon');
const LobbySchema = new Schema({
    player1: {
        type: Schema.Types.ObjectId,
        ref: 'characters'
    },
    player2: {
        type: Schema.Types.ObjectId,
        ref: 'characters'
    },
    lobbykey: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    dungeon: {
        type: Dungeon.schema
    },
    level: {
        type: Number,
        default: 0,
    },
});

module.exports = Lobby = mongoose.model('lobbies', LobbySchema);