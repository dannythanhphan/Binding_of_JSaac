import React from 'react';
import monster from '../../assets/monsters/golem/0_Golem_Walking_000.png'
import { Stage, Layer, Image } from 'react-konva';
import RoomSelector from './room_selector';
import * as TrapsHelper from './traps.js'
import * as MonsterHelper from './monsters.js';

class Room extends React.Component {
    componentDidMount() {
        this.props.fetchLobby("ukNbhl")
    }

    render() {
        let { room, characters, locations, traps, monsters } = this.props;
        let roomImg;
        let sprites;
        let trapsInRoom;
        let monstersInRoom;

        let monsterImg = new window.Image();
        monsterImg.src = monster;

        if (locations) {
            roomImg = RoomSelector(locations.room);
            sprites = characters.map(character => (
                <div key={Math.random()}>
                     {/* <Sprite
                         x={500}
                         y={400}
                         image={<img src={monster} alt={"golem"} />}
                     /> */}
                </div>
            ));
            let roomNumber = room[(locations.room % 16) * locations.floor]
            // let roomNumber = room[15]
            trapsInRoom = TrapsHelper.GetTraps(roomNumber.id, traps).map(trap => (
                TrapsHelper.displayTraps(trap)
            ))
            
            monstersInRoom = MonsterHelper.GetMonsters(roomNumber.id, monsters).map(monster => (
                MonsterHelper.displayMonsters(monster)
            ))
        }
        // tiles are 64 x 64
        // rooms 15x9, 960 x 576
        // rooms 17x11 with walls, 1088 x 704
        // -128 
        return (
            <div className="room-main">
                    <Stage width={1088} height={704}>
                        <Layer>
                            <Image image={roomImg} />
                            {monstersInRoom}
                            {trapsInRoom}
                        </Layer>
                    </Stage>
            </div>
        )
    }
};

export default Room;