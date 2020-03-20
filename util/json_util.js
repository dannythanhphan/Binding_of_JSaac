const User = require('../models/User');

const buildLobbyJson = (lobby, res) => {
    const payload = { users: {}, characters: {}, lobby: {}, dungeon: {}, floors: {}, rooms: {}, monsters: {}, traps: {}};
    payload.lobby = {
        id: lobby.id,
        lobbykey: lobby.lobbykey,
        player1: lobby.player1,
        player2: lobby.player2
    }
    payload.dungeon = {
        id: lobby.dungeon.id,
    }
    lobby.dungeon.floors.forEach(floor => {
        payload.floors[floor.id] = {
            id: floor.id,
            dungeonId: lobby.dungeon.id,
            level: floor.level
        } 
        floor.rooms.forEach(room => {
            payload.rooms[room.id] = {
                id: room.id,
                floorId: floor.id,
                position: room.position, 
                leftExit: room.leftExit,
                rightExit: room.rightExit,
                topExit: room.topExit,
                bottomExit: room.bottomExit
            }
            room.monsters.forEach(monster => {
                payload.monsters[monster.id] = {
                    id: monster.id,
                    roomId: room.id,
                    name: monster.name,
                    level: monster.level,
                    totalHp: monster.totalHp,
                    currentHp: monster.currentHp,
                    meleeAttack: monster.meleeAttack,
                    meleeSpeed: monster.meleeSpeed,
                    rangedAttack: monster.rangedAttack,
                    rangedSpeed: monster.rangedSpeed,
                    movementSpeed: monster.movementSpeed,
                    defense: monster.defense,
                    intelligence: monster.intelligence,
                    xPos: monster.xPos,
                    yPos: monster.ypos
                }
            })
            room.traps.forEach(trap => {
                payload.traps[trap.id] = {
                    id: trap.id,
                    roomId: room.id,
                    type: trap.type,
                    meleeAttack: trap.meleeAttack,
                    xPos: trap.xPos,
                    yPos: trap.yPos
                }
            })
        })
    });

    User.find({ "characters.id": { $in: [lobby.player1, lobby.player2] } })
    .then(users => {
        users = users.filter(user => user.characters.length > 0);
        users.forEach(user => {
            payload.users[user.id] = {
                username: user.username,
                id: user.id
            };
            user.characters.forEach(character => {
                payload.characters[character.id] = character
            });
        })
        console.log('build', payload.users, payload.characters);
        return res.json(payload)
    })
    .catch(err => console.log(err))
};

module.exports = buildLobbyJson;