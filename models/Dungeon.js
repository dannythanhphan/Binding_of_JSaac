const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Floor = require('./Floor');

const DungeonSchema = new Schema({
    floors: [Floor]
});

module.exports = Room = mongoose.model('rooms', RoomSchema);
