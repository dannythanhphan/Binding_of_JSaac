const User = require('../models/User');

const buildLobbyJson = (lobby, res) => {
    const payload = { users: {}, characters: {}, locations: {}, lobby: {}, dungeon: {}, floors: {}, exits: {}, rooms: {}, monsters: {}, traps: {}};
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
        payload.exits[floor.exit.id] = {
            floorId: floor.id,
            location: floor.exit.location,
            xPos: floor.exit.xPos,
            yPos: floor.exit.yPos
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

    for (let i = 0; i < lobby.locations.length; i++) {
        if ((lobby.player1 && lobby.player1.id.equals(lobby.locations[i].character.id)) ||
            (lobby.player2 && lobby.player2.id.equals(lobby.locations[i].character.id)))
        {
            payload.locations[lobby.locations[i].character.toString()] = {
                character: lobby.locations[i].character.toString(),
                floor: lobby.locations[i].floor,
                room: lobby.locations[i].room,
                xPos: lobby.locations[i].xPos,
                yPos: lobby.locations[i].yPos
            }
        } 
    }

    User.find({ "characters._id": { $in: [lobby.player1, lobby.player2] } })
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
        return res.json(payload)
    })
    .catch(err => console.log(err))
};

module.exports = buildLobbyJson;