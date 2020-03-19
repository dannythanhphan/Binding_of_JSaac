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
    // lobbyname: {
    //     type: String,
    //     required: true,
    //     index: true
    // },
    // active: {
    //     type: Boolean,
    //     required: true
    // },
    lobbykey: {
        type: String,
        required: true,
        index: true
    },
    password: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    dungeon: {
        type: [Dungeon.schema]
    }
});

module.exports = Lobby = mongoose.model('lobbies', LobbySchema);