import React from 'react';
import golem from '../../assets/monsters/golem/0_Golem_Walking_000.png'
import { Image } from 'react-konva';

export const GetMonsters = (roomId, monsters) => {
    let monstersInRoom = [];
    for (let i = 0; i < monsters.length; i++) {
        if (monsters[i].roomId === roomId) {
            monstersInRoom.push(monsters[i])
        }
    }
    return monstersInRoom;
};

export const displayMonsters = (monster) => {
    let monsterImg = new window.Image();
    monsterImg.src = golem
    let monsterXPos = (monster.xPos === 15) ? (monster.xPos * 64) : ((monster.xPos * 64) + 64)
    let monsterYPos = (monster.yPos === 9) ? (monster.yPos * 64) : ((monster.yPos * 64) + 64)

    return (
        <Image
            x={monsterXPos}
            y={monsterYPos}
            image={monsterImg}
            width={64}
            height={64}
        />
    )
}
