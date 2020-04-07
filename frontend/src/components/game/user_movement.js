import React from 'react';
import mustacheMan from '../../assets/animations/mustache_man_animation.png';
import thief from '../../assets/animations/thief_animation.png';
import superWoman from '../../assets/animations/super_woman_animation.png';
import { Sprite } from 'react-konva';
import characterAnimations from './character_animations';

class DisplayCharacters extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = { pauseMovement: false }
        this.move = this.move.bind(this);
        this.checkCollision = this.checkCollision.bind(this);
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
        // for (let i = 0; i < this.props.traps.length; i++) {
        //     if ((this.props.traps[i].xPos === this.props.char.xPos) && 
        //     (this.props.traps[i].yPos) === this.props.char.yPos) {
        //         this.takeDamage(1);
        //     }
        // }
    }
    checkWalls(left, right, top, bottom) {
        if (left < 48) {
            if (top < 300 || bottom > 400) {
                return false;
            }
        }

        if (right > 1032) {
            if (top < 300 || bottom > 400) {
                return false;
            }
        }

        if (top < 48) {
            if (left < 500 || right > 592) {
                return false;
            }
        }

        if (bottom > 650) {
            if (left < 500 || right > 592) {
                return false;
            }
        }
        return true;
    }

    move(dir) {
        let maxFramesPerCharacter = {
            1: 20,
            2: 42,
            3: 42
        }
        let maxFrames = maxFramesPerCharacter[this.props.char.characterSprite]
        let currentState = Object.assign({}, this.props.char)
        let { roomNumber, char, floorNumber, moveRoom } = this.props
        if (!this.state.pauseMovement) {
            switch(dir) {
                case "up":
                    // if (currentState.yPixel - 8 > 64 || (currentState.xPixel > 500 && currentState.xPixel < 544)) {
                    if (this.checkWalls(
                        currentState.xPixel, currentState.right, 
                        currentState.yPixel - 8, currentState.bottom - 8)) {
                        if (roomNumber.topExit !== -1 && (currentState.yPixel - 8 < 0 && (currentState.xPixel > 500 && currentState.xPixel < 544))) {
                            currentState.room = roomNumber.topExit;
                            currentState.yPixel = 660;
                            currentState.bottom = currentState.yPixel + 82;
                            // this.setState({ pauseMovement: true })
                            moveRoom(localStorage.lobbykey, char._id, floorNumber, roomNumber.topExit);
                        } else if (roomNumber.topExit === -1 && currentState.yPixel - 8 < 64) {
                            currentState.yPixel = currentState.yPixel;
                        } else {
                            currentState.yPixel -= 8;
                            currentState.bottom -= 8;
                        }
                    } 
                    
                    currentState.yPos = Math.round(currentState.yPixel / 64); 
                    break;
                case "down":
                    // if (currentState.yPixel + 8 < 576 || (currentState.xPixel > 500 && currentState.xPixel < 544)) {
                    if (this.checkWalls(
                        currentState.xPixel, currentState.right,
                        currentState.yPixel + 8, currentState.bottom + 8)) {
                        if (roomNumber.bottomExit !== -1 && (currentState.yPixel + 8 > 650 && (currentState.xPixel > 500 && currentState.xPixel < 592))) {
                            currentState.room = roomNumber.bottomExit;
                            currentState.yPixel = 10;
                            currentState.bottom = currentState.yPixel + 82;
                            // this.setState({ pauseMovement: true })
                            moveRoom(localStorage.lobbykey, char._id, floorNumber, roomNumber.bottomExit);
                        } else if (roomNumber.bottomExit === -1 && currentState.yPixel + 8 > 576) {
                            currentState.yPixel = currentState.yPixel;
                        } else {
                            currentState.yPixel += 8;
                            currentState.bottom += 8;
                        }
                    } 
    
                    currentState.yPos = Math.round(currentState.yPixel / 64); 
                    break;
                case "left":
                    // if (currentState.xPixel - 8 > 64 || (currentState.yPixel > 308 && currentState.yPixel < 352)) {
                    if (this.checkWalls(
                        currentState.xPixel - 8, currentState.right - 8,
                        currentState.yPixel, currentState.bottom)) {
                        if (roomNumber.leftExit !== -1 && (currentState.xPixel - 8 < 0 && (currentState.yPixel > 300 && currentState.yPixel < 390))) {
                            currentState.room = roomNumber.leftExit;
                            currentState.xPixel = 1056
                            currentState.right = currentState.xPixel + 48;
                            // this.setState({ pauseMovement: true })
                            moveRoom(localStorage.lobbykey, char._id, floorNumber, roomNumber.leftExit);
                        } else if (roomNumber.leftExit === -1 && currentState.xPixel - 8 < 64) {
                            currentState.xPixel = currentState.xPixel;
                        } else {
                            currentState.xPixel -= 8;
                            currentState.right -= 8;
                        }
                    }
    
                    currentState.xPos = Math.round(currentState.xPixel / 64); 
                    currentState.animation = "runningLeft"
                    break;
                case "right":
                    // if (currentState.xPixel + 8 < 992 || (currentState.yPixel > 308 && currentState.yPixel < 352)) {
                    if (this.checkWalls(
                        currentState.xPixel + 8, currentState.right + 8,
                        currentState.yPixel, currentState.bottom)) {
                        if (roomNumber.rightExit !== -1 && (currentState.xPixel + 8 > 1056 && (currentState.yPixel > 300 && currentState.yPixel < 390))) {
                            currentState.room = roomNumber.rightExit;
                            currentState.xPixel = 10
                            currentState.right = currentState.xPixel + 48;
                            // this.setState({ pauseMovement: true })
                            moveRoom(localStorage.lobbykey, char._id, floorNumber, roomNumber.rightExit);
                        } else if (roomNumber.rightExit === -1 && currentState.xPixel + 8 < 992) {
                            currentState.xPixel = currentState.xPixel;
                        } else {
                            currentState.xPixel += 8;
                            currentState.right += 8;
                        }
                    }
    
                    currentState.xPos = Math.round(currentState.xPixel / 64); 
                    currentState.animation = "runningRight"
                    break;
                default:
                    break;
            }
        }
        currentState.frames = (currentState.frames === maxFrames) ? 0 : currentState.frames + 1;
        this.props.childSetState(currentState);
        let that = this;
        if (this.state.pauseMovement) {
            setTimeout(function() { that.setState({ pauseMovement: false }); }, 1000)
        }
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
        // window.collision = setInterval(this.checkCollision,100);
    }

    render() {
        let characterImg = new Image();
        let running;
        let curPlayerInfo = characterAnimations(this.props.char.characterSprite)
        running = curPlayerInfo.running;
        switch (curPlayerInfo.characterImg) {
            case "mustacheMan":
                characterImg.src = mustacheMan
                break;
            case "thief":
                characterImg.src = thief
                break;
            case "superWoman":
                characterImg.src = superWoman
                break;
        }
        return (
            <Sprite
                x={this.props.char.xPixel}
                y={this.props.char.yPixel}
                image={characterImg}
                animation={this.props.char.animation}
                animations={running}
                frameRate={60}
                frameIndex={this.props.char.frames}
                scaleX={0.5}
                scaleY={0.5}
            />

        )
    }
}

export default DisplayCharacters;
