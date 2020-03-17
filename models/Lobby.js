const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LobbySchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
        index: true
    },
    player: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    lobbyname: {
        type: String,
        required: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Lobby = mongoose.model('lobbies', LobbySchema);