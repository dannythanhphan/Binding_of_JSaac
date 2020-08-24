import React from 'react';
import { Stage, Layer, Image, Text } from 'react-konva';
import RoomSelector from './room_selector';
import * as TrapsHelper from './traps.js'
import DisplayMonsters from './monsters.js';
import DisplayCharacters from './characters.js';
import * as ExitHelper from './exit.js';

class Room extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        let currentCharacter;
        let otherCharacter;
        let activeAttackPixels = {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            damage: 0
        };
        this.mounted = false;
        this.scaleFactorX = 0.1;
        this.scaleFactorY = 0.1;
        const { locations } = this.props;
        let characters = Object.values(this.props.characters);
        for (let i = 0; i < characters.length; i++) {
            if (characters[i]._id === localStorage.lobbycharacter) {
                currentCharacter = characters[i];
            }
            else {
                otherCharacter = characters[i];
            }
        }
        currentCharacter = Object.assign(currentCharacter, locations[currentCharacter._id])
        currentCharacter.frames = 0;
        currentCharacter.animation = "runningRight";
        // xPixel and yPixel are location of the sprite image with the white space
        // left right top bottom are ACTUAL location of the sprite we see
        currentCharacter.xPixel = currentCharacter.xPos * 64;
        currentCharacter.yPixel = currentCharacter.yPos * 64;
        currentCharacter.left = currentCharacter.xPixel + 48;
        currentCharacter.right = currentCharacter.xPixel + 96;
        currentCharacter.top = currentCharacter.yPixel + 40;
        currentCharacter.bottom = currentCharacter.yPixel + 80;
        delete currentCharacter.character;
        currentCharacter.invincible = false;

        if (otherCharacter) {
            otherCharacter = Object.assign(otherCharacter, locations[otherCharacter._id])
            otherCharacter.frames = 0;
            otherCharacter.animation = "runningRight";
            otherCharacter.xPixel = otherCharacter.xPos * 64;
            otherCharacter.yPixel = otherCharacter.yPos * 64;
            otherCharacter.left = otherCharacter.xPixel + 48;
            otherCharacter.right = otherCharacter.xPixel + 96;
            otherCharacter.top = otherCharacter.yPixel + 40;
            otherCharacter.bottom = otherCharacter.yPixel + 80;
            delete otherCharacter.character;
        }

        let room = this.props.room[(currentCharacter.room % 16) * currentCharacter.floor];
        let monsters = {};
        this.monstersAttacked = {}
        this.props.monsters.forEach( monster => {
            if (monster.roomId === room.id) {
                monsters[monster.id] = monster;
                monsters[monster.id].xPos *= 64;
                monsters[monster.id].yPos *= 64;
                monsters[monster.id].animation = "runningRight";
                monsters[monster.id].frames = 0;
                this.monstersAttacked[monster.id] = false;
            }
        });

        this.state = { currentCharacter, otherCharacter, activeAttackPixels, room, monsters };
        this.childSetState = this.childSetState.bind(this);
        this.getActiveAttackPixels = this.getActiveAttackPixels.bind(this);
        this.resetAttackPixels = this.resetAttackPixels.bind(this);
        this.waitingForData = false;
        this.updateMonsterPos = this.updateMonsterPos.bind(this);
        this.checkIfAttacked = this.checkIfAttacked.bind(this);

        let that = this;
        this.monsterMoveTimer = setInterval(() => this.updateMonsterPos(), 50);
        this.checkAttackedTimer = setInterval(() => this.checkIfAttacked(), 50);
        this.takeDamage = this.takeDamage.bind(this);
        this.checkPlayerCollision = this.checkPlayerCollision.bind(this);
    }

    takeDamage(val) {
        let currentState = Object.assign({}, this.state);
        if (!currentState.currentCharacter.invincible) {
            currentState.currentCharacter.currentHP -= val;
            if (currentState.currentCharacter.currentHP > 0) {
                this.props.updateHP(currentState.currentCharacter._id, currentState.currentCharacter.currentHP);
                currentState.currentCharacter.invincible = true;
                let that = this;
                setTimeout( () => {
                    let current = Object.assign({}, that.state);
                    current.currentCharacter.invincible = false;
                    that.setState(current)
                }, 1000);
                this.setState(currentState);
                
            }
            else if (currentState.currentCharacter.currentHP <= 0) {
                currentState.currentCharacter.dead = true;
                currentState.currentCharacter.currentHP = 0;
                this.props.updateHP(currentState.currentCharacter._id, currentState.currentCharacter.currentHP);
                this.setState(currentState);
            }
        }
    }

    childSetState(state, movingRooms, nextExit) {
        let currentState = Object.assign({}, this.state);
        if (state._id === localStorage.lobbycharacter) {
            currentState.currentCharacter = state;
        }
        if (movingRooms) {
            let room = this.props.room[(currentState.currentCharacter.room % 16) * currentState.currentCharacter.floor];
            currentState.room = room;
            this.waitingForData = (this.state.otherCharacter && 
              this.state.currentCharacter.floor == this.state.otherCharacter.floor &&
              nextExit == this.state.otherCharacter.room
            ) ? true : false;

            let monsters = {};
            this.monstersAttacked = {};
            this.props.monsters.forEach(monster => {
                if (monster.roomId === room.id) {
                    monsters[monster.id] = monster;
                    monsters[monster.id].xPos *= 64;
                    monsters[monster.id].yPos *= 64;
                    monsters[monster.id].animation = "runningRight";
                    monsters[monster.id].frames = 0;
                    this.monstersAttacked[monster.id] = false;
                }
            });
            currentState.monsters = monsters;
        }
        this.setState(currentState);
    }

    getActiveAttackPixels(pixels) {
        let currentState = Object.assign({}, this.state);
        currentState.activeAttackPixels = pixels;
        this.setState(currentState);
    }

    resetAttackPixels() {
        let resetState = Object.assign({}, this.state);
        resetState.activeAttackPixels.top = -1000;
        resetState.activeAttackPixels.bottom = -1000;
        resetState.activeAttackPixels.left = -1000;
        resetState.activeAttackPixels.right = -1000;

        this.setState(resetState)
    }

    updateMonsterPos() {
        if (!this.state.monsters)
            return;
        const monsters = Object.values(this.state.monsters);
        const updatedMonsters = {};
        const playerX = (this.state.currentCharacter.left + this.state.currentCharacter.right) / 2
        const playerY = (this.state.currentCharacter.top + this.state.currentCharacter.bottom) / 2
        let updatedMonster, player2X, player2Y, playerDist, player2Dist, closestPlayer;
        if (this.state.otherCharacter &&
            this.props.locations[this.state.currentCharacter._id].floor == this.props.locations[this.state.otherCharacter._id].floor &
            this.props.locations[this.state.currentCharacter._id].room == this.props.locations[this.state.otherCharacter._id].room
        ) {
            player2X = (this.state.otherCharacter.left + this.state.otherCharacter.right) / 2;
            player2Y = (this.state.otherCharacter.top + this.state.otherCharacter.bottom) / 2;
        }

        monsters.forEach(monster => {
            updatedMonster = Object.assign({}, monster);
            if (!this.monstersAttacked[monster.id]) {
                if (player2X) {
                    playerDist = Math.pow((playerX - monster.xPos), 2) + Math.pow((playerY - monster.yPos), 2);
                    player2Dist = Math.pow((player2X - monster.xPos), 2) + Math.pow((player2Y - monster.yPos), 2);
                    closestPlayer = (playerDist > player2Dist) ? { x: player2X, y: player2Y } : { x: playerX, y: playerY }
                } else {
                    closestPlayer = {x: playerX, y: playerY}
                }

                let monsterX = monster.xPos + 48;
                let monsterY = monster.yPos + 30;

                if (closestPlayer.x < monsterX) {
                    updatedMonster.xPos -= 1;
                    updatedMonster.animation = "runningLeft"
                }
                else if (closestPlayer.x > monsterX) {
                    updatedMonster.xPos += 1;
                    updatedMonster.animation = "runningRight"
                }
                if (closestPlayer.y < monsterY) {
                    updatedMonster.yPos -= 1;
                }
                else if (closestPlayer.y > monsterY) {
                    updatedMonster.yPos += 1;
                }
                updatedMonster.frames = (updatedMonster.frames === 11) ? 0 : updatedMonster.frames + 1;
                updatedMonsters[updatedMonster.id] = updatedMonster;
                this.checkPlayerCollision(updatedMonster);
            }
        })

        this.setState({monsters: updatedMonsters})
    }

    checkIfAttacked() {
        if (!this.state.monsters)
            return;
        const monsters = Object.values(this.state.monsters);
        const currChar = this.state.currentCharacter;
        const updatedMonsters = {};
        let updatedMonster, activeAttackPixels, rightAttackCheck, leftAttackCheck, attackAnimation;
        monsters.forEach(monster => {            
            updatedMonster = Object.assign({}, monster);
            activeAttackPixels = this.state.activeAttackPixels; 
            updatedMonster.top = updatedMonster.yPos + 22;
            updatedMonster.bottom = updatedMonster.yPos + 65;
            updatedMonster.left = updatedMonster.xPos + 25;
            updatedMonster.right = updatedMonster.xPos + 53;
            
            rightAttackCheck = (activeAttackPixels.top >= updatedMonster.top &&
                                activeAttackPixels.top <= updatedMonster.bottom &&
                                activeAttackPixels.right <= updatedMonster.right &&
                                activeAttackPixels.right >= updatedMonster.left &&
                                !this.monstersAttacked[monster.id])
            
            leftAttackCheck = (activeAttackPixels.top >= updatedMonster.top &&
                                activeAttackPixels.top <= updatedMonster.bottom &&
                                activeAttackPixels.left >= updatedMonster.left &&
                                activeAttackPixels.left <= updatedMonster.right &&
                                !this.monstersAttacked[monster.id])
            if (rightAttackCheck || leftAttackCheck) {
                    attackAnimation = (updatedMonster.animation === "runningRight") ? "attackedRight" : "attackedLeft"
                    updatedMonster.currentHP -= activeAttackPixels.damage;
                    // updatedMonster.animation = attackAnimation;
                    // this.monstersAttacked[monster.id] = true;
                    // updatedMonster.frames = (updatedMonster.frames === 11) ? 0 : updatedMonster.frames + 1;
                    // this.resetAttackPixels();
                }
                
            if (this.monstersAttacked[monster.id]) {
                let that = this;
                setTimeout(() => {
                    that.monstersAttacked[monster.id] = false;
                }, 1000)
            }
            if (updatedMonster.currentHP > 0) {
                updatedMonsters[updatedMonster.id] = updatedMonster;
            }
            else {
                currChar.currentEXP += 10;
                if (currChar.currentEXP > currChar.totalEXP)
                    currChar.currentEXP = currChar.totalEXP;
                this.props.updateXP(currChar._id, currChar.currentEXP);
            }
        })
        this.setState({monsters: updatedMonsters, currentCharacter: currChar});
    }

    checkPlayerCollision(monster) {
        const top = monster.yPos + 22;
        const bottom = monster.yPos + 65;
        const left = monster.xPos + 25;
        const right = monster.xPos + 53;
        const playerX = (this.state.currentCharacter.left + this.state.currentCharacter.right) / 2
        const playerY = (this.state.currentCharacter.top + this.state.currentCharacter.bottom) / 2
        
        let playerCollisionCheck = ((top >= playerY - 20 &&
                                    top <= playerY + 20) &&
                                    (left >= playerX - 24 &&
                                    left <= playerX + 24))

        if (playerCollisionCheck && this.state.currentCharacter.currentHP > 0) {
            this.takeDamage(monster.meleeAttack)
        }
    }

    componentDidMount() {
        if (localStorage.lobbykey && Object.keys(this.props.lobby).length === 0) {
            this.props.fetchLobby(localStorage.lobbykey);
        }

        const div = document.getElementsByClassName("room-main")[0];
        this.mounted = true;
        this.scaleFactorX = div.offsetWidth / 1088;
        this.scaleFactorY = div.offsetHeight / 704;
        
        // Change update speed 30fps for now
        this.interval = setInterval(() => {
            window.socket.emit("dungeonRefresh", 
            {
                room: localStorage.lobbykey, 
                char: this.state.currentCharacter,
                monsters: this.state.monsters
            });
        }, 1000 / 30)

        window.socket.on("receiveDungeon", data => {
            if (data.char._id !== localStorage.lobbycharacter) {
                let currentState = Object.assign({}, this.state);
                currentState.otherCharacter = data.char;
                if (this.props.locations[currentState.otherCharacter._id].room !== data.char.room) {
                    this.props.updateLocation(data.char.room, currentState.otherCharacter._id);
                }
                if (this.props.characters[currentState.otherCharacter._id].currentHP != data.char.currentHP) {
                    this.props.updateHP(currentState.otherCharacter._id, data.char.currentHP);
                }
                if (this.waitingForData) {
                    this.waitingForData = false;
                    currentState.monsters = data.monsters;
                }
                this.setState(currentState);
            }
        })
    }

    componentWillUnmount() {
        window.clearInterval(this.interval);
        window.clearInterval(this.monsterMoveTimer);
        window.clearInterval(this.checkAttackedTimer);
    }

    render() {
        if (!this.mounted) {
            return (
                <div className="room-main"></div>
            )
        }
        if (Object.keys(this.props.lobby).length === 0) return null;
        let { room, traps, locations, monsters, exit, floor } = this.props;
        let roomImg;
        let spriteInRoom;
        let currentChar;
        let otherChar;
        let nextLevel;
        let trapsInRoom;
        let trapsDisplay;
        let monstersInRoom;        
        if (this.state.currentCharacter) {
            let currentExit = exit[this.state.currentCharacter.floor-1];
            let roomNumber = room[(this.state.currentCharacter.room % 16) * this.state.currentCharacter.floor];
            roomImg = RoomSelector(this.state.currentCharacter.room);
            if (roomNumber.position === exit[this.state.currentCharacter.floor-1].location) {
                nextLevel = ExitHelper.displayExit(exit[0])
            } 

            trapsInRoom = TrapsHelper.GetTraps(roomNumber.id, traps);
            trapsDisplay = trapsInRoom.map(trap => (
                TrapsHelper.displayTraps(trap)
            ))

            currentChar = (!this.state.currentCharacter.dead) ? <DisplayCharacters 
                char={this.state.currentCharacter}
                movement={true}
                childSetState={this.childSetState}
                activePixels={this.getActiveAttackPixels}
                takeDamage={this.takeDamage}
                traps={trapsInRoom}
                exit={currentExit}
                moveRoom={this.props.moveRoom}
                roomNumber={roomNumber}
                floorNumber={Object.values(locations)[0].floor}
                updateHP={this.props.updateHP}
                /> : <Text 
                fontSize={32}
                x={100}
                y={100}
                fill="white"
                text="Game Over!"/>

            // tiles are 64 x 64
            // rooms 15x9, 960 x 576
            // rooms 17x11 with walls, 1088 x 704
            // min width-height = 64 x 64
            // max width-height = 1024 x 640
            // character sprite 48 x 82
            let player2X, player2Y;
            if (this.state.otherCharacter &&
                this.props.locations[this.state.currentCharacter._id].floor == this.props.locations[this.state.otherCharacter._id].floor &
                this.props.locations[this.state.currentCharacter._id].room == this.props.locations[this.state.otherCharacter._id].room
            ) {
                otherChar = <DisplayCharacters
                    char={this.state.otherCharacter}
                    movement={false}
                    childSetState={this.childSetState}
                    traps={trapsInRoom}
                />
                player2X = (this.state.otherCharacter.left + this.state.otherCharacter.right) / 2;
                player2Y = (this.state.otherCharacter.top + this.state.otherCharacter.bottom) / 2;
            } else {
                player2X = undefined;
                player2Y = undefined;
                otherChar = null;
            }
            
            monstersInRoom = this.waitingForData ? null : 
            Object.values(this.state.monsters).map(monster => (
                <DisplayMonsters
                    key={monster.id}
                    monster={monster}
                    xPos={monster.xPos}
                    yPos={monster.yPos}
                    animation={monster.animation}
                    frames={monster.frames}
                />
            ))
        }

        return (
            <div className="room-main">
                <Stage width={1088 * this.scaleFactorX} height={704*this.scaleFactorY} 
                scaleX={this.scaleFactorX}
                scaleY={this.scaleFactorY}
                >
                    <Layer>
                        <Image image={roomImg} />
                        {nextLevel}
                        {monstersInRoom}
                        {trapsDisplay}
                        {currentChar}
                        {otherChar}
                    </Layer>
                </Stage>
            </div>
        )
    }
};

export default Room;