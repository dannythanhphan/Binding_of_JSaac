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
            monsterSprite: Math.ceil(Math.random() * 6)
        }
        
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
                x={this.props.xPos}
                y={this.props.yPos}
                image={monsterImg}
                animation={this.props.animation}
                animations={animations}
                frameRate={24}
                frameIndex={this.props.frames}
                scaleX={0.5}
                scaleY={0.5}
            />
        );
    };
};

export default DisplayMonsters;
