import React from 'react';
import golem1 from '../../assets/animations/golem1_animation.png'
import golem2 from '../../assets/animations/golem2_animation.png'
import golem3 from '../../assets/animations/golem3_animation.png'
import reaper1 from '../../assets/animations/reaper1_animation.png'
import reaper2 from '../../assets/animations/reaper2_animation.png'
import reaper3 from '../../assets/animations/reaper3_animation.png'
import { Sprite } from 'react-konva';
import monsterAnimations from './monster_animations';

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
            animation: "runningRight",
            monsterSprite: Math.ceil(Math.random() * 6)
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
            currentState.animation = "runningLeft"
        }
        else if (this.props.playerX > this.state.monsterXPos) {
            currentState.monsterXPos += 1;
            currentState.animation = "runningRight"
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
        let animations;
    
        let curMonsterInfo = monsterAnimations(this.state.monsterSprite)
        animations = curMonsterInfo.animations ;
        switch (curMonsterInfo.monsterImg) {
            case "golem1":
                monsterImg.src = golem1
                break;
            case "golem2":
                monsterImg.src = golem2
                break;
            case "golem3":
                monsterImg.src = golem3
                break;
            case "reaper1":
                monsterImg.src = reaper1
                break;
            case "reaper2":
                monsterImg.src = reaper2
                break;
            case "reaper3":
                monsterImg.src = reaper3
                break;
        }

        return (
            <Sprite
                x={this.state.monsterXPos}
                y={this.state.monsterYPos}
                image={monsterImg}
                animation={this.state.animation}
                animations={animations}
                frameRate={24}
                frameIndex={this.state.frames}
                scaleX={0.5}
                scaleY={0.5}
            />
        );
    };
};

export default DisplayMonsters;
