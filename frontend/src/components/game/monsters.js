import React from 'react';
import golem1 from '../../assets/animations/golem1_animation.png'
import golem2 from '../../assets/animations/golem2_animation.png'
import golem3 from '../../assets/animations/golem3_animation.png'
import reaper1 from '../../assets/animations/reaper1_animation.png'
import reaper2 from '../../assets/animations/reaper2_animation.png'
import reaper3 from '../../assets/animations/reaper3_animation.png'
import { Sprite } from 'react-konva';

const MAXXPOS = 1024;
const MINXPOS = 64;
const MAXYPOS = 640;
const MINYPOS = 64;
const RANDOMMOVEPOSITION = [-5, 0, 5]

class DisplayMonsters extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            monsterXPos: (this.props.positionX === 15) ? (this.props.positionX * 64) : ((this.props.positionX * 64) + 64),
            monsterYPos: (this.props.positionY === 9) ? (this.props.positionY * 64) : ((this.props.positionY * 64) + 64),
            frames: 0,
            monsterSprite: 1
        }
        this.chaseClosestPlayer = this.chaseClosestPlayer.bind(this);
    }

    componentDidMount() {
        // this.setState({ monsterSprite: Math.ceil(Math.random() * 6) })
        setInterval(this.chaseClosestPlayer, 50);
    }

    chaseClosestPlayer() {
        let currentState = Object.assign({}, this.state);
        if (this.props.playerX < this.state.monsterXPos) {
            currentState.monsterXPos -= 1;
        }
        else if (this.props.playerX > this.state.monsterXPos) {
            currentState.monsterXPos += 1;
        }
        if (this.props.playerY < this.state.monsterYPos) {
            currentState.monsterYPos -= 1;
        }
        else if (this.props.playerY > this.state.monsterYPos) {
            currentState.monsterYPos += 1;
        }
        currentState.frames = (currentState.frames === 11) ? 0 : currentState.frames + 1;
        this.setState(currentState);
    }

    render() {
        let monsterImg = new Image();
        let running;
    
        switch (this.state.monsterSprite) {
            case 1:
                monsterImg.src = golem1
                running = {
                    running: [
                        0, 0, 750, 750,
                        750, 0, 750, 750,
                        1500, 0, 750, 750,
                        2250, 0, 750, 750,
                        3000, 0, 750, 750,
                        3750, 0, 750, 750,
                        4500, 0, 750, 750,
                        5250, 0, 750, 750,
                        6000, 0, 750, 750,
                        6750, 0, 750, 750,
                        7500, 0, 750, 750,
                        8250, 0, 750, 750,
                    ]
                }
                break;
            case 2:
                monsterImg.src = golem2
                running = {
                    running: [
                        0, 0, 750, 750,
                        750, 0, 750, 750,
                        1500, 0, 750, 750,
                        2250, 0, 750, 750,
                        3000, 0, 750, 750,
                        3750, 0, 750, 750,
                        4500, 0, 750, 750,
                        5250, 0, 750, 750,
                        6000, 0, 750, 750,
                        6750, 0, 750, 750,
                        7500, 0, 750, 750,
                        8250, 0, 750, 750,
                    ]
                }
                break;
            case 3:
                monsterImg.src = golem3
                running = {
                    running: [
                        0, 0, 750, 750,
                        750, 0, 750, 750,
                        1500, 0, 750, 750,
                        2250, 0, 750, 750,
                        3000, 0, 750, 750,
                        3750, 0, 750, 750,
                        4500, 0, 750, 750,
                        5250, 0, 750, 750,
                        6000, 0, 750, 750,
                        6750, 0, 750, 750,
                        7500, 0, 750, 750,
                        8250, 0, 750, 750,
                    ]
                }
                break;
            case 4:
                monsterImg.src = reaper1
                running = {
                    running: [
                        0, 0, 750, 750,
                        750, 0, 750, 750,
                        1500, 0, 750, 750,
                        2250, 0, 750, 750,
                        3000, 0, 750, 750,
                        3750, 0, 750, 750,
                        4500, 0, 750, 750,
                        5250, 0, 750, 750,
                        6000, 0, 750, 750,
                        6750, 0, 750, 750,
                        7500, 0, 750, 750,
                        8250, 0, 750, 750,
                    ]
                }
                break;
            case 5:
                monsterImg.src = reaper2
                running = {
                    running: [
                        0, 0, 750, 750,
                        750, 0, 750, 750,
                        1500, 0, 750, 750,
                        2250, 0, 750, 750,
                        3000, 0, 750, 750,
                        3750, 0, 750, 750,
                        4500, 0, 750, 750,
                        5250, 0, 750, 750,
                        6000, 0, 750, 750,
                        6750, 0, 750, 750,
                        7500, 0, 750, 750,
                        8250, 0, 750, 750,
                    ]
                }
                break;
            case 6:
                monsterImg.src = reaper3
                running = {
                    running: [
                        0, 0, 750, 750,
                        750, 0, 750, 750,
                        1500, 0, 750, 750,
                        2250, 0, 750, 750,
                        3000, 0, 750, 750,
                        3750, 0, 750, 750,
                        4500, 0, 750, 750,
                        5250, 0, 750, 750,
                        6000, 0, 750, 750,
                        6750, 0, 750, 750,
                        7500, 0, 750, 750,
                        8250, 0, 750, 750,
                    ]
                }
                break;
        }

        return (
            <Sprite
                x={this.state.monsterXPos}
                y={this.state.monsterYPos}
                image={monsterImg}
                animation='running'
                animations={running}
                frameRate={24}
                frameIndex={this.state.frames}
                scaleX={0.1}
                scaleY={0.1}
            />
        );
    };
};

export default DisplayMonsters;
