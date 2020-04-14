import React from 'react';
import spike from '../../assets/traps/spikes.png'
import { Image } from 'react-konva';

export const GetTraps = (roomId, traps) => {
    let trapsInRoom = [];
    for (let i = 0; i < traps.length; i++) {
        if (traps[i].roomId === roomId) {
            trapsInRoom.push(traps[i])
        }
    }
    return trapsInRoom;
};

export const displayTraps = (trap) => {
    let trapImg = new window.Image();
    trapImg.src = spike
    let trapXPos = trap.xPos * 64
    let trapYPos = trap.yPos * 64

    return (
        <Image
            key={Math.random()}
            x={trapXPos}
            y={trapYPos}
            image={trapImg}
            width={64}
            height={64}
        />
    )
}
