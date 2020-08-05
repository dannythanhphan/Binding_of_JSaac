import React from 'react';
import stairs from '../../assets/rooms/stairs.png'
import { Image } from 'react-konva';

export const displayExit = (exit) => {
    let exitImg = new window.Image();
    exitImg.src = stairs
    let exitXPos = exit.xPos * 64
    let exitYPos = exit.yPos * 64

    return (
        <Image
            key={Math.random()}
            x={exitXPos}
            y={exitYPos}
            image={exitImg}
            width={64}
            height={64}
        />
    )
}
