const Dungeon = require('../models/Dungeon');
const Floor = require('../models/Floor');
const Exit = require('../models/Exit');
const Room = require('../models/Room');
const Monster = require('../models/Monster');
const Trap = require('../models/Trap');

///////////////////////////////////////////////////////////////////////////////////////////
//Dungeon Parameters
const NUM_FLOORS = 5;               //Number of floors in the dungeon
const FLOOR_SIZE = 4;               //The length and width for number of rooms per floor
const ROOM_WIDTH = 17;              //How many "tiles" there are per width in a room
const ROOM_HEIGHT = 11;             //How many "tiles" there are per height in a room

const MONSTER_BASE_HP = 100;        //Monster hp at level 1
const MONSTER_HP_SCALAR = 25;       //Monsters get 25 more hp per level
const MONSTER_BASE_MELEE = 15       //Monster base melee damage at level 1
const MONSTER_MELEE_SCALAR = 5;     //Monsters get 5 more melee damage per level
const MONSTER_BASE_RANGED = 5;      //Monster base range damage at level 1
const MONSTER_RANGED_SCALAR = 2;    //Monsters get 2 more ranged damage per level
const TRAP_DAMAGE = 20;             //How much damage traps do
///////////////////////////////////////////////////////////////////////////////////////////


const generateDungeon = () => {
    const dungeon = new Dungeon();
    const numRooms = FLOOR_SIZE * FLOOR_SIZE;
    let location, xPos, yPos;
    for (let level = 0; level < NUM_FLOORS; level++) {
        if (level !== NUM_FLOORS - 1) {
            location = Math.floor(Math.random() * numRooms);
            xPos = Math.floor(Math.random() * ROOM_WIDTH);
            yPos = Math.floor(Math.random() * ROOM_HEIGHT);
        }
        else {
            location = -1;
            xPos = -1;
            yPos = -1;
        }
        dungeon.floors.push(generateFloor(level, location, xPos, yPos));
    }
    return dungeon;
}

const generateFloor = (level, location, xPos, yPos) => {
    const floor = new Floor({
        level: level,
        exit: generateExit(location, xPos, yPos)
    });
    let leftExit, rightExit, topExit, bottomExit;
    for (let roomRow = 0; roomRow < FLOOR_SIZE; roomRow++) {
        for (let roomCol = 0; roomCol < FLOOR_SIZE; roomCol++) {
            position = roomRow * FLOOR_SIZE + roomCol;
            width = ROOM_WIDTH;
            height = ROOM_HEIGHT;
            leftExit = (roomCol === 0) ? -1 : position - 1;
            rightExit = (roomCol === FLOOR_SIZE + 1) ? -1 : position + 1;
            topExit = (roomRow === 0) ? -1: position - FLOOR_SIZE;
            bottomExit = (roomRow === FLOOR_SIZE - 1) ? -1: position + FLOOR_SIZE;
            numMonsters = Math.floor(Math.random() * (5 + level));
            numTraps = Math.floor(Math.random() * (5 + level));
            floor.rooms.push(generateRoom(position, width, height, leftExit, rightExit, topExit, bottomExit, numMonsters, numTraps, level))
        }
    }

    return floor;
}

const generateExit = (location, xPos, yPos) => {
    const exit = new Exit({
        location: location,
        xPos: xPos,
        yPos: yPos
    })
    return exit;
}

const generateRoom = (position, width, height, leftExit, rightExit, topExit, bottomExit, numMonsters, numTraps, level) => {
    const room = new Room({
        position: position,
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
        xPos = Math.ceil(Math.random() * (ROOM_WIDTH - 2));
        yPos = Math.ceil(Math.random() * (ROOM_HEIGHT - 2));
        room.monsters.push(generateMonster(name, level, totalHp, currentHp, meleeAttack, rangedAttack, xPos, yPos))
    }

    const type = "spike";
    const trapDamage = TRAP_DAMAGE;

    for (let i = 0; i < numTraps; i++) {
        xPos = Math.ceil(Math.random() * (ROOM_WIDTH - 2));
        yPos = Math.ceil(Math.random() * (ROOM_HEIGHT - 2));
        
        room.traps.push(generateTrap(type, trapDamage, xPos, yPos))
    }    

    return room;
}

const generateMonster = ( name, level, totalHp, currentHp, meleeAttack, rangedAttack, xPos, yPos ) => {
    const monster = new Monster({
        name: name,
        level: level,
        totalHP: totalHp,
        currentHP: currentHp,
        meleeAttack: meleeAttack,
        rangedAttack: rangedAttack,
        xPos: xPos,
        yPos: yPos
    })
    return monster;
}

const generateTrap = ( type, trapDamage, xPos, yPos ) => {
    const trap = new Trap({
        type: type,
        meleeAttack: trapDamage,
        xPos: xPos,
        yPos: yPos
    })
    return trap;
}

module.exports = generateDungeon;