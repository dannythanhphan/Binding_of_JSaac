const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Character = require('./Character');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    characters: [Character],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('users', UserSchema);