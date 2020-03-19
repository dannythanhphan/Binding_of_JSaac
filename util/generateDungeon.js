const Dungeon = require('../models/Dungeon');
const Floor = require('../models/Floor');
const Room = require('../models/Room');
const Monster = require('../models/Monster');
const Trap = require('../models/Trap');

// Dungeon parameters
const NUM_FLOORS = 5;
const FLOOR_WIDTH = 4;



const generateDungeon = () => {
    let dungeon = new Dungeon()
    for (let level = 0; level < NUM_FLOORS; level++) {
        dungeon.floors.push(generateFloor(level));
    }

    return dungeon;
}

const generateFloor = level => {
    let floor = new Floor({
        level: level
    });

    return floor;
}


module.exports = generateDungeon;