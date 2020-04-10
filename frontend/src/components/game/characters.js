import React from 'react';
import knight from '../../assets/animations/knight/knight_animations.png';
import rogue from '../../assets/animations/rogue/rogue_animations.png';
import mage from '../../assets/animations/mage/mage_animations.png';
import { Sprite, Layer, Rect } from 'react-konva';
import characterAnimations from './character_animations';

class DisplayCharacters extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = { pauseMovement: false }
        this.move = this.move.bind(this);
        this.checkCollision = this.checkCollision.bind(this);
        this.checkTrapsCollision = this.checkTrapsCollision.bind(this);
    }

    KeyboardController(keys, repeat) {
        let timers = {};
        document.onkeydown = (event) => {
            let key = event.keyCode;
            if (!(key in keys)) {
                return true;
            }
            if (!(key in timers)) {
                timers[key] = null;
                keys[key]();
                if (repeat !== 0) {
                    timers[key] = setInterval(keys[key], repeat);
                }
            }
            return false;
        }

        document.onkeyup = (event) => {
            let key = event.keyCode;
            if (key in timers) {
                if (timers[key] !== null) {
                    clearInterval(timers[key]);
                }
                delete timers[key];
            }
        }
        window.onblur = function() {
            for (let key in timers) {
                if (timers[key] !== null) {
                    clearInterval(timers[key]);
                }
            }
            timers = {};
        }

    }

    componentWillUnmount() {
        document.onkeydown = null;
        document.onkeyup = null;
        clearInterval(window.collision);
    }

    takeDamage(val) {
        let currentState = Object.assign({}, this.props.char);
        if (!currentState.invincible) {
            console.log("damage taken")
            currentState.currentHP -= val;
            currentState.invincible = true;
            let that = this;
            setTimeout( () => {
                let current = Object.assign({}, that.props.char);
                current.invincible = false;
                that.props.childSetState(current)}, 1000);
            this.props.childSetState(currentState);
        }
    }

    checkCollision() {
        this.checkTrapsCollision();
    }

    checkTrapsCollision() {
        for (let i = 0; i < this.props.traps.length; i++) {
            let traptopleft = {
                x: this.props.traps[i].xPos * 64,
                y: this.props.traps[i].yPos * 64
            }
            let trapbottomright = {
                x: traptopleft.x + 64,
                y: traptopleft.y + 64
            }

            if (!(traptopleft.x >= this.props.char.right - 30 || 
                trapbottomright.x <= this.props.char.xPixel ||
                trapbottomright.y <= this.props.char.yPixel ||
                traptopleft.y >= this.props.char.bottom)) {
                    this.takeDamage(this.props.traps[i].meleeAttack);
                    console.log(traptopleft)
                    console.log(trapbottomright)
                    console.log(this.props.char.xPixel)   
                    console.log(this.props.char.yPixel)   
                    console.log(this.props.char.right)   
                    console.log(this.props.char.bottom)   
                }     
        }
    }
    checkWalls(left, right, top, bottom) {
        if (left < 56) {
            if (top < 312 || bottom > 378) {
                return false;
            }
        }

        if (right > 1040) {
            if (top < 312 || bottom > 378) {
                return false;
            }
        }

        if (top < 56) {
            if (left < 500 || right > 604) {
                return false;
            }
        }

        if (bottom > 636) {
            if (left < 500 || right > 604) {
                return false;
            }
        }
        return true;
    }

    move(dir) {
        let maxFrames = 7
        let currentState = Object.assign({}, this.props.char)
        let { roomNumber, char, floorNumber, moveRoom } = this.props

        switch(dir) {
            case "up":
                if (currentState.animation === "runningRight" || currentState.animation === "meleeRight") {
                    currentState.animation = "runningRight"
                } else if (currentState.animation === "runningLeft" || currentState.animation === "meleeLeft") {
                    currentState.animation = "runningLeft"
                }
                if (this.checkWalls(
                    currentState.left, currentState.right, 
                    currentState.top - 8, currentState.bottom - 8)) {
                    if (roomNumber.topExit !== -1 && (currentState.yPixel - 8 < -96 && (currentState.xPixel > 456 && currentState.xPixel < 552))) {
                        currentState.room = roomNumber.topExit;
                        currentState.yPixel = 660;
                        currentState.top = currentState.yPixel + 40;
                        currentState.bottom = currentState.yPixel + 80;
                        moveRoom(localStorage.lobbykey, char._id, floorNumber, roomNumber.topExit);
                    } else if (roomNumber.topExit === -1 && currentState.yPixel - 8 < 0) {
                        currentState.yPixel = currentState.yPixel;
                    } else {
                        currentState.yPixel -= 8;
                        currentState.top -= 8;
                        currentState.bottom -= 8;
                    }
                } 
                
                currentState.yPos = Math.round(currentState.yPixel / 64); 
                break;
            case "down":
                if (currentState.animation === "runningRight" || currentState.animation === "meleeRight") {
                    currentState.animation = "runningRight"
                } else if (currentState.animation === "runningLeft" || currentState.animation === "meleeLeft") {
                    currentState.animation = "runningLeft"
                }
                if (this.checkWalls(
                    currentState.left, currentState.right,
                    currentState.top + 8, currentState.bottom + 8)) {
                    if (roomNumber.bottomExit !== -1 && (currentState.yPixel + 8 > 650 && (currentState.xPixel > 456 && currentState.xPixel < 552))) {
                        currentState.room = roomNumber.bottomExit;
                        currentState.yPixel = 10;
                        currentState.top = currentState.yPixel + 40;
                        currentState.bottom = currentState.yPixel + 80;
                        moveRoom(localStorage.lobbykey, char._id, floorNumber, roomNumber.bottomExit);
                    } else if (roomNumber.bottomExit === -1 && currentState.yPixel + 8 > 576) {
                        currentState.yPixel = currentState.yPixel;
                    } else {
                        currentState.yPixel += 8;
                        currentState.top += 8;
                        currentState.bottom += 8;
                    }
                } 

                currentState.yPos = Math.round(currentState.yPixel / 64); 
                break;
            case "left":
                if (this.checkWalls(
                    currentState.left - 8, currentState.right - 8,
                    currentState.top, currentState.bottom)) {
                    if (roomNumber.leftExit !== -1 && (currentState.xPixel - 8 < -96 && (currentState.yPixel > 272 && currentState.yPixel < 378))) {
                        currentState.room = roomNumber.leftExit;
                        currentState.xPixel = 1056
                        currentState.left = currentState.xPixel + 48;
                        currentState.right = currentState.xPixel + 96;
                        moveRoom(localStorage.lobbykey, char._id, floorNumber, roomNumber.leftExit);
                    } else if (roomNumber.leftExit === -1 && currentState.xPixel - 8 < 64) {
                        currentState.xPixel = currentState.xPixel;
                    } else {
                        currentState.xPixel -= 8;
                        currentState.left -= 8;
                        currentState.right -= 8;
                    }
                }

                currentState.xPos = Math.round(currentState.xPixel / 64); 
                currentState.animation = "runningLeft"
                break;
            case "right":
                if (this.checkWalls(
                    currentState.left + 8, currentState.right + 8,
                    currentState.top, currentState.bottom)) {
                    if (roomNumber.rightExit !== -1 && (currentState.xPixel + 8 > 1056 && (currentState.yPixel > 272 && currentState.yPixel < 378))) {
                        currentState.room = roomNumber.rightExit;
                        currentState.xPixel = 10
                        currentState.left = currentState.xPixel + 48;
                        currentState.right = currentState.xPixel + 96;
                        moveRoom(localStorage.lobbykey, char._id, floorNumber, roomNumber.rightExit);
                    } else if (roomNumber.rightExit === -1 && currentState.xPixel + 8 < 992) {
                        currentState.xPixel = currentState.xPixel;
                    } else {
                        currentState.xPixel += 8;
                        currentState.left += 8;
                        currentState.right += 8;
                    }
                }

                currentState.xPos = Math.round(currentState.xPixel / 64); 
                currentState.animation = "runningRight"
                break;
            case "space":
                if (currentState.animation === "runningRight" || currentState.animation === "meleeRight") {
                    currentState.animation = "meleeRight" 
                } else if (currentState.animation === "runningLeft" || currentState.animation === "meleeLeft") {
                    currentState.animation = "meleeLeft"
                }
               
                currentState.frames = 0
            default:
                break;
        }


        if (dir !== "space") {
            currentState.frames = (currentState.frames === maxFrames) ? 0 : currentState.frames + 1;
        }

        this.props.childSetState(currentState);
        let that = this;
    }
    componentDidMount() {
        if (this.props.movement) {
            this.KeyboardController({
                87: () => {this.move("up")},
                83: () => {this.move("down")},
                65: () => {this.move("left")},
                68: () => {this.move("right")},
            }, 50)

        }
        let that = this
        window.addEventListener("keydown", function(e) {
            if (e.keyCode === 32) {
                that.move("space");
            }
        })
        window.collision = setInterval(this.checkCollision,100);
    }

    render() {
        let characterImg = new Image();
        let animations;
        let curPlayerInfo = characterAnimations(this.props.char.characterSprite)
        animations = curPlayerInfo.animations;
        switch (curPlayerInfo.characterImg) {
            case "knight":
                characterImg.src = knight
                break;
            case "rogue":
                characterImg.src = rogue
                break;
            case "mage":
                characterImg.src = mage
                break;
        }
        return (
            <Layer>
                <Rect
                    width={50}
                    height={10}
                    cornerRadius={3}
                    x={this.props.char.xPixel + 37}
                    y={this.props.char.yPixel + 10}
                    fill={'white'}
                />
                <Rect
                    width={this.props.char.currentHP / this.props.char.totalHP * 50}
                    height={10}
                    cornerRadius={3}
                    x={this.props.char.xPixel + 37}
                    y={this.props.char.yPixel + 10}
                    fill={'red'}
                />
                <Sprite
                    x={this.props.char.xPixel}
                    y={this.props.char.yPixel}
                    // fill={"blue"}
                    image={characterImg}
                    animation={this.props.char.animation}
                    animations={animations}
                    frameRate={7}
                    frameIndex={this.props.char.frames}
                    // scaleX={0.8}
                    // scaleY={0.8}
                    ref={(node => {
                        if (node && !node.isRunning() && (node.attrs.animation === "meleeRight" || node.attrs.animation === "meleeLeft")) {
                            // setInterval(function() {node.move({x: (20 % 200), y: 0})}, 48)
                            node.start()
                            setTimeout(function () {
                                node.stop()
                            }, 1000)
                        }
                    })}

                />
            </Layer>
            

        )
    }
}

export default DisplayCharacters;
