import React from 'react';
import mustacheMan from '../../assets/animations/character_animations1.jpg';
import thief from '../../assets/animations/character_animations2.png';
import superWoman from '../../assets/animations/character_animations3.png';
import { Sprite, Animation } from 'react-konva';

export const DisplayCharacters = (character, positionX, positionY) => {
    let characterImg = new Image();
    let frames;
    let running;

    switch (character.characterSprite) {
        case 1:
            characterImg.src = mustacheMan
            frames = 30
            running = {
                running: [
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
                ]
            }
            break;
        case 2:
            characterImg.src = thief
            frames = 60
            running = {
                running: [
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
                ]
            }
            break;
        case 3:
            characterImg.src = superWoman
            frames = 60
            running = {
                running: [
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
                ]
            }
            break;
    }

    let characterXPos = (positionX === 15) ? (positionX * 64) : ((positionX * 64) + 64)
    let characterYPos = (positionY === 9) ? (positionY * 64) : ((positionY * 64) + 64)
    // debugger

    return (
        <Sprite
            id="check"
            x={characterXPos}
            y={characterYPos}
            image={characterImg}
            animation='running'
            animations={running}
            frameRate={frames}
            frameIndex={0}
            // scale={ 1000, 1000 }
            scaleX={0.5}
            scaleY={0.5}
            // width={64}
            // height={64}
            ref={(node => {
                    if(node && !node.isRunning()) {
                        // setInterval(function() {node.move({x: (20 % 200), y: 0})}, 48)
                        node.start()
                    }
                })
            }
        />
    )
}

