const Dungeon = require('../models/Dungeon');
const Floor = require('../models/Floor');
const Room = require('../models/Room');
const Monster = require('../models/Monster');
const Trap = require('../models/Trap');

///////////////////////////////////////////////////////////////////////////////////////////
//Dungeon Parameters
const NUM_FLOORS = 5;               //Number of floors in the dungeon
const FLOOR_SIZE = 4;               //The length and width for number of rooms per floor
const ROOM_WIDTH = 21;              //How many "tiles" there are per width in a room
const ROOM_HEIGHT = 15;             //How many "tiles" there are per height in a room

const MONSTER_BASE_HP = 100;        //Monster hp at level 1
const MONSTER_HP_SCALAR = 25;       //Monsters get 25 more hp per level
const MONSTER_BASE_MELEE = 15       //Monster base melee damage at level 1
const MONSTER_MELEE_SCALAR = 5;     //Monsters get 5 more melee damage per level
const MONSTER_BASE_RANGED = 5;      //Monster base range damage at level 1
const MONSTER_RANGED_SCALAR = 2;    //Monsters get 2 more ranged damage per level
const TRAP_DAMAGE = 20;             //How much damage traps do
///////////////////////////////////////////////////////////////////////////////////////////


const generateDungeon = () => {
    const dungeon = new Dungeon()
    for (let level = 0; level < NUM_FLOORS; level++) {
        dungeon.floors.push(generateFloor(level));
    }

    return dungeon;
}

const generateFloor = level => {
    const floor = new Floor({
        level: level
    });
    let leftExit, rightExit, topExit, bottomExit;
    for (let roomRow = 0; roomRow < FLOOR_SIZE; roomRow++) {
        for (let roomCol = 0; roomCol < FLOOR_SIZE; roomCol++) {
            roomId = roomRow * FLOOR_WIDTH;
            width = ROOM_WIDTH;
            height = ROOM_HEIGHT;
            leftExit = (roomCol === 0) ? -1 : roomId - 1;
            rightExit = (roomCol === FLOOR_SIZE + 1) ? -1 : roomId + 1;
            topExit = (roomRow === 0) ? -1: roomId - FLOOR_SIZE;
            bottomExit = (roomRow === FLOOR_SIZE - 1) ? -1: roomId + FLOOR_SIZE;
            numMonsters = Math.floor(Math.random() * (5 + level));
            numTraps = Math.floor(Math.random() * (5 + level));
            floor.rooms.push(generateRoom(roomId, width, height, leftExit, rightExit, topExit, bottomExit, numMonsters, numTraps, level))
        }
    }

    return floor;
}

const generateRoom = (roomId, width, height, leftExit, rightExit, topExit, bottomExit, numMonsters, numTraps, level) => {
    const room = new Room({
        roomId: roomId,
        width: width,
        height: height,
        leftExit: leftExit,
        rightExit: rightExit,
        topExit: topExit,
        bottomExit: bottomExit
    })

    const name = "slime";
    const totalHp = MONSTER_BASE_HP + level * MONSTER_HP_SCALAR;
    const currentHp = totalHp;
    const meleeAttack = MONSTER_BASE_MELEE + level * MONSTER_MELEE_SCALAR;
    const rangedAttack = MONSTER_BASE_RANGED + level * MONSTER_RANGED_SCALAR;

    let xPos, yPos;
    for (let i = 0; i < numMonsters; i++) {
        xPos = Math.floor(Math.random() * ROOM_WIDTH);
        yPos = Math.floor(Math.random() * ROOM_HEIGHT);
        room.monsters.push(generateMonster(name, level, totalHp, currentHp, meleeAttack, rangedAttack, xPos, yPos))
    }

    const type = "spike";

    for (let i = 0; i < numTraps; i++) {
        xPos = Math.floor(Math.random() * ROOM_WIDTH);
        yPos = Math.floor(Math.random() * ROOM_HEIGHT);
        meleeAttack = TRAP_DAMAGE;
        room.traps.push(generateTrap(type, meleeAttack, xPos, yPos))
    }    

    return room;
}

const generateMonster = ( name, level, totalHp, currentHp, meleeAttack, rangedAttack, xPos, yPos ) => {
    const monster = new Monster({
        name: name,
        level: level,
        totalHp: totalHp,
        currentHp: currentHp,
        meleeAttack: meleeAttack,
        rangedAttack: rangedAttack,
        xPos: xPos,
        yPos: yPos
    })
    return monster;
}

const generateTrap = ( type, meleeAttack, xPos, yPos ) => {
    const monster = new Monster({
        type: type,
        meleeAttack: meleeAttack,
        xPos: xPos,
        yPos: yPos
    })
    return trap;
}

module.exports = generateDungeon;