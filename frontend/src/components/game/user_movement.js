import React from 'react';
import mustacheMan from '../../assets/animations/mustache_man_animation.png';
import thief from '../../assets/animations/thief_animation.png';
import superWoman from '../../assets/animations/super_woman_animation.png';
import { Sprite } from 'react-konva';

class DisplayCharacters extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;

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
    }

    takeDamage(val) {
        let currentState = Object.assign({}, this.props.char);
        currentState.currentHP -= val;
        console.log("damage taken");
    }

    checkCollision() {
        for (let i = 0; i < this.props.traps.length; i++) {
            if ((this.props.traps[i].xPos === this.props.char.xPos) && 
            (this.props.traps[i].yPos) === this.props.char.yPos) {
                this.takeDamage(1);
            }
        }

    }

    move(dir) {
        let maxFramesPerCharacter = {
            1: 20,
            2: 42,
            3: 42
        }
        let maxFrames = maxFramesPerCharacter[this.props.char.characterSprite]
        let currentState = Object.assign({}, this.props.char)
        switch(dir) {
            case "up":
                if (currentState.yPixel - 8 > 64 || (currentState.xPixel > 500 && currentState.xPixel < 544)) {
                    currentState.yPixel = currentState.yPixel - 8;
                } 
                
                currentState.yPos = Math.round(currentState.yPixel / 64); 
                break;
            case "down":
                if (currentState.yPixel + 8 < 576 || (currentState.xPixel > 500 && currentState.xPixel < 544)) {
                    currentState.yPixel = currentState.yPixel + 8;
                } 

                currentState.yPos = Math.round(currentState.yPixel / 64); 
                break;
            case "left":
                if (currentState.xPixel - 8 > 64 || (currentState.yPixel > 308 && currentState.yPixel < 352)) {
                    currentState.xPixel = currentState.xPixel - 8;
                }

                currentState.xPos = Math.round(currentState.xPixel / 64) - 1; 
                currentState.animation = "runningLeft"
                break;
            case "right":
                if (currentState.xPixel + 8 < 992 || (currentState.yPixel > 308 && currentState.yPixel < 352)) {
                    currentState.xPixel = currentState.xPixel + 8;
                }

                currentState.xPos = Math.round(currentState.xPixel / 64) - 1; 
                currentState.animation = "runningRight"
                break;
            default:
                break;
        }
        currentState.frames = (currentState.frames === maxFrames) ? 0 : currentState.frames + 1;
        this.checkCollision();
        this.props.childSetState(currentState);

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
    }

    render() {
        let characterImg = new Image();
        let frames;
        let running;

        switch (this.props.char.characterSprite) {
            case 1:
                characterImg.src = mustacheMan
                frames = 20
                running = {
                    runningRight: [
                        0, 0, 107, 170,
                        107, 0, 107, 170,
                        214, 0, 107, 170,
                        321, 0, 107, 170,
                        428, 0, 107, 170,
                        535, 0, 107, 170,
                        642, 0, 107, 170,
                        749, 0, 107, 170,
                        856, 0, 107, 170,
                        963, 0, 107, 170,
                        1070, 0, 107, 170,
                        1177, 0, 107, 170,
                        1284, 0, 107, 170,
                        1391, 0, 107, 170,
                        1498, 0, 107, 170,
                        1605, 0, 107, 170,
                        1712, 0, 107, 170,
                        1819, 0, 107, 170,
                        1926, 0, 107, 170,
                        2033, 0, 107, 170,
                        2140, 0, 107, 170,
                    ],
                    runningLeft: [
                        2140, 170, 107, 170,
                        2033, 170, 107, 170,
                        1926, 170, 107, 170,
                        1819, 170, 107, 170,
                        1712, 170, 107, 170,
                        1605, 170, 107, 170,
                        1498, 170, 107, 170,
                        1391, 170, 107, 170,
                        1284, 170, 107, 170,
                        1177, 170, 107, 170,
                        1070, 170, 107, 170,
                        963, 170, 107, 170,
                        856, 170, 107, 170,
                        749, 170, 107, 170,
                        642, 170, 107, 170,
                        535, 170, 107, 170,
                        428, 170, 107, 170,
                        321, 170, 107, 170,
                        214, 170, 107, 170,
                        107, 170, 107, 170,
                        0, 170, 107, 170,
                    ]
                }
                break;
            case 2:
                characterImg.src = thief
                frames = 42
                running = {
                    runningRight: [
                        0, 0, 98, 139,
                        98, 0, 98, 139,
                        196, 0, 98, 139,
                        294, 0, 98, 139,
                        392, 0, 98, 139,
                        490, 0, 98, 139,
                        588, 0, 98, 139,
                        686, 0, 98, 139,
                        784, 0, 98, 139,
                        882, 0, 98, 139,
                        980, 0, 98, 139,
                        1078, 0, 98, 139,
                        1176, 0, 98, 139,
                        1274, 0, 98, 139,
                        1372, 0, 98, 139,
                        1470, 0, 98, 139,
                        1568, 0, 98, 139,
                        1666, 0, 98, 139,
                        1764, 0, 98, 139,
                        1862, 0, 98, 139,
                        1960, 0, 98, 139,
                        2058, 0, 98, 139,
                        2156, 0, 98, 139,
                        2254, 0, 98, 139,
                        2352, 0, 98, 139,
                        2450, 0, 98, 139,
                        2548, 0, 98, 139,
                        2646, 0, 98, 139,
                        2744, 0, 98, 139,
                        2842, 0, 98, 139,
                        2940, 0, 98, 139,
                        3038, 0, 98, 139,
                        3136, 0, 98, 139,
                        3234, 0, 98, 139,
                        3332, 0, 98, 139,
                        3430, 0, 98, 139,
                        3528, 0, 98, 139,
                        3626, 0, 98, 139,
                        3724, 0, 98, 139,
                        3822, 0, 98, 139,
                        3920, 0, 98, 139,
                        4018, 0, 98, 139,
                        4116, 0, 98, 139,
                    ],
                    runningLeft: [
                        4116, 139, 98, 139,
                        4018, 139, 98, 139,
                        3920, 139, 98, 139,
                        3822, 139, 98, 139,
                        3724, 139, 98, 139,
                        3626, 139, 98, 139,
                        3528, 139, 98, 139,
                        3430, 139, 98, 139,
                        3332, 139, 98, 139,
                        3234, 139, 98, 139,
                        3136, 139, 98, 139,
                        3038, 139, 98, 139,
                        2940, 139, 98, 139,
                        2842, 139, 98, 139,
                        2744, 139, 98, 139,
                        2646, 139, 98, 139,
                        2548, 139, 98, 139,
                        2450, 139, 98, 139,
                        2352, 139, 98, 139,
                        2254, 139, 98, 139,
                        2156, 139, 98, 139,
                        2058, 139, 98, 139,
                        1960, 139, 98, 139,
                        1862, 139, 98, 139,
                        1764, 139, 98, 139,
                        1666, 139, 98, 139,
                        1568, 139, 98, 139,
                        1470, 139, 98, 139,
                        1372, 139, 98, 139,
                        1274, 139, 98, 139,
                        1176, 139, 98, 139,
                        1078, 139, 98, 139,
                        980, 139, 98, 139,
                        882, 139, 98, 139,
                        784, 139, 98, 139,
                        686, 139, 98, 139,
                        588, 139, 98, 139,
                        490, 139, 98, 139,
                        392, 139, 98, 139,
                        294, 139, 98, 139,
                        196, 139, 98, 139,
                        98, 139, 98, 139,
                        0, 139, 98, 139,
                    ]
                }
                break;
            case 3:
                characterImg.src = superWoman
                frames = 42
                running = {
                    runningRight: [
                        0, 0, 107, 155,
                        107, 0, 107, 155,
                        214, 0, 107, 155,
                        321, 0, 107, 155,
                        428, 0, 107, 155,
                        535, 0, 107, 155,
                        642, 0, 107, 155,
                        749, 0, 107, 155,
                        856, 0, 107, 155,
                        963, 0, 107, 155,
                        1070, 0, 107, 155,
                        1177, 0, 107, 155,
                        1284, 0, 107, 155,
                        1391, 0, 107, 155,
                        1498, 0, 107, 155,
                        1605, 0, 107, 155,
                        1712, 0, 107, 155,
                        1819, 0, 107, 155,
                        1926, 0, 107, 155,
                        2033, 0, 107, 155,
                        2140, 0, 107, 155,
                        2247, 0, 107, 155,
                        2354, 0, 107, 155,
                        2461, 0, 107, 155,
                        2568, 0, 107, 155,
                        2675, 0, 107, 155,
                        2782, 0, 107, 155,
                        2889, 0, 107, 155,
                        2996, 0, 107, 155,
                        3103, 0, 107, 155,
                        3210, 0, 107, 155,
                        3317, 0, 107, 155,
                        3424, 0, 107, 155,
                        3531, 0, 107, 155,
                        3638, 0, 107, 155,
                        3745, 0, 107, 155,
                        3852, 0, 107, 155,
                        3959, 0, 107, 155,
                        4066, 0, 107, 155,
                        4173, 0, 107, 155,
                        4280, 0, 107, 155,
                        4387, 0, 107, 155,
                        4494, 0, 107, 155,
                    ],
                    runningLeft: [
                        4494, 155, 107, 155,
                        4387, 155, 107, 155,
                        4280, 155, 107, 155,
                        4173, 155, 107, 155,
                        4066, 155, 107, 155,
                        3959, 155, 107, 155,
                        3852, 155, 107, 155,
                        3745, 155, 107, 155,
                        3638, 155, 107, 155,
                        3531, 155, 107, 155,
                        3424, 155, 107, 155,
                        3317, 155, 107, 155,
                        3210, 155, 107, 155,
                        3103, 155, 107, 155,
                        2996, 155, 107, 155,
                        2889, 155, 107, 155,
                        2782, 155, 107, 155,
                        2675, 155, 107, 155,
                        2568, 155, 107, 155,
                        2461, 155, 107, 155,
                        2354, 155, 107, 155,
                        2247, 155, 107, 155,
                        2140, 155, 107, 155,
                        2033, 155, 107, 155,
                        1926, 155, 107, 155,
                        1819, 155, 107, 155,
                        1712, 155, 107, 155,
                        1605, 155, 107, 155,
                        1498, 155, 107, 155,
                        1391, 155, 107, 155,
                        1284, 155, 107, 155,
                        1177, 155, 107, 155,
                        1070, 155, 107, 155,
                        963, 155, 107, 155,
                        856, 155, 107, 155,
                        749, 155, 107, 155,
                        642, 155, 107, 155,
                        535, 155, 107, 155,
                        428, 155, 107, 155,
                        321, 155, 107, 155,
                        214, 155, 107, 155,
                        107, 155, 107, 155,
                        0, 155, 107, 155,
                    ],

                }
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
