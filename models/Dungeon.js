const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Floor = require('./Floor');

const DungeonSchema = new Schema({
    floors: {
        type: [Floor.schema]
    }
});

module.exports = Dungeon = mongoose.model('dungeons', DungeonSchema);
