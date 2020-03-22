import React from 'react';
import golem1 from '../../assets/monsters/golem1/0_Golem_Walking_000.png'
import golem2 from '../../assets/monsters/golem2/0_Golem_Running_000.png'
import golem3 from '../../assets/monsters/golem3/0_Golem_Running_000.png'
import reaper1 from '../../assets/monsters/reaper1/0_Reaper_Man_Running_000.png'
import reaper2 from '../../assets/monsters/reaper2/0_Reaper_Man_Running_000.png'
import reaper3 from '../../assets/monsters/Reaper_Man_3/PNG/PNG Sequences/Running/0_Reaper_Man_Running_000.png'
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
    const monsterImageArr = {
        1: golem1,
        2: golem2,
        3: golem3,
        4: reaper1,
        5: reaper2,
        6: reaper3
    }
    let monsterImg = new window.Image();
    monsterImg.src = monsterImageArr[Math.ceil(Math.random() * 6)]
    
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
