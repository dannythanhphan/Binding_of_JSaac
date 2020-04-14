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
            monsterXPos: props.positionX * 64,
            monsterYPos: props.positionY * 64,
            currentHP: props.monster.currentHP,
            frames: 0,
            animation: "runningRight",
            attacked: false,
            monsterSprite: Math.ceil(Math.random() * 6)
        }
        
        this.chaseClosestPlayer = this.chaseClosestPlayer.bind(this);
        this.checkIfAttacked = this.checkIfAttacked.bind(this);
    }

    componentDidMount() {
        let that = this;
        setInterval(function() {
            if (!that.state.attacked) {
                that.chaseClosestPlayer();
            }
        }, 50);

        setInterval(this.checkIfAttacked, 50);
    }

    checkIfAttacked() {
        let currentState = Object.assign({}, this.state);
        let { activeAttackPixels, resetAttackPixels } = this.props;
        currentState.top = currentState.monsterYPos + 22;
        currentState.bottom = currentState.monsterYPos + 65;
        currentState.left = currentState.monsterXPos + 25;
        currentState.right = currentState.monsterXPos + 53;

        let rightAttackCheck = (activeAttackPixels.top >= currentState.top &&
                            activeAttackPixels.top <= currentState.bottom &&
                            activeAttackPixels.left >= currentState.left &&
                            activeAttackPixels.left <= currentState.right &&
                            !currentState.attacked)
        
        let leftAttackCheck = (activeAttackPixels.top >= currentState.top &&
                            activeAttackPixels.top <= currentState.bottom &&
                            activeAttackPixels.left <= currentState.left &&
                            activeAttackPixels.left <= currentState.right &&
                            !currentState.attacked)

        if (rightAttackCheck || leftAttackCheck) {
                let attackAnimation = (this.state.animation === "runningRight") ? "attackedRight" : "attackedLeft"
                
                currentState.currentHP = this.state.currentHP - activeAttackPixels.damage;
                currentState.animation = attackAnimation;
                currentState.attacked = true;
                currentState.frames = (currentState.frames === 11) ? 0 : currentState.frames + 1;
                this.setState(currentState)
                resetAttackPixels();
                console.log("attacked")
            }
            
        if (currentState.attacked) {
            let that = this;
            let attackAnimation = (this.state.animation === "attackedRight") ? "runningRight" : "runningLeft"
            setTimeout(function() {
                that.setState({ animation: attackAnimation, attacked: false });
            }, 1000)
        }
    }

    chaseClosestPlayer() {
        let currentState = Object.assign({}, this.state);
        let closestPlayer;
        let {playerX, playerY, player2X, player2Y} = this.props;
        let {monsterXPos, monsterYPos} = this.state;

        if (player2X) {
            let playerDist = Math.sqrt(Math.pow((playerX - monsterXPos), 2) + Math.pow((playerY - monsterYPos), 2));
            let player2Dist = Math.sqrt(Math.pow((player2X - monsterXPos), 2) + Math.pow((player2Y - monsterYPos), 2));
            closestPlayer = (playerDist > player2Dist) ? { x: player2X, y: player2Y } : { x: playerX, y: playerY }
        } else {
            closestPlayer = {x: playerX, y: playerY}
        }
        
        if (closestPlayer.x < monsterXPos) {
            currentState.monsterXPos -= 1;
            currentState.animation = "runningLeft"
        }
        else if (closestPlayer.x - 80 > monsterXPos) {
            currentState.monsterXPos += 1;
            currentState.animation = "runningRight"
        }
        if (closestPlayer.y - 30 < monsterYPos) {
            currentState.monsterYPos -= 1;
        }
        else if (closestPlayer.y > monsterYPos) {
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
