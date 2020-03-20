import React from 'react';
import room0 from '../../assets/rooms/0.png';
import room1 from '../../assets/rooms/1.png';
import room2 from '../../assets/rooms/2.png';
import room3 from '../../assets/rooms/3.png';
import room4 from '../../assets/rooms/4.png';
import room5 from '../../assets/rooms/5.png';
import room6 from '../../assets/rooms/6.png';
import room7 from '../../assets/rooms/7.png';
import room8 from '../../assets/rooms/8.png';
import room9 from '../../assets/rooms/9.png';
import room10 from '../../assets/rooms/10.png';
import room11 from '../../assets/rooms/11.png';
import room12 from '../../assets/rooms/12.png';
import room13 from '../../assets/rooms/13.png';
import room14 from '../../assets/rooms/14.png';
import room15 from '../../assets/rooms/15.png';

class Room extends React.Component {

    render() {
        const images = {
            0: room0,
            1: room1,
            2: room2,
            3: room3,
            4: room4,
            5: room5,
            6: room6,
            7: room7,
            8: room8,
            9: room9,
            10: room10,
            11: room11,
            12: room12,
            13: room13,
            14: room14,
            15: room15,
        };

        let { room, characters } = this.props;
        let roomImg = images[room.position];
        let sprites = characters.map(character => (
            <div key={Math.random()}>A sprite component should live here!</div>
        ));

        return (
            <div className="room-main">
                <img className="room-tile" src={roomImg} />
                {sprites}
            </div>
        )
    }
};

export default Room;