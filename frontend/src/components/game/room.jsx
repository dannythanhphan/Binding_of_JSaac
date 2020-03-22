import React from 'react';
import { Stage, Layer, Image } from 'react-konva';
import RoomSelector from './room_selector';
import * as TrapsHelper from './traps.js'
import DisplayMonsters from './monsters.js';
import DisplayCharacters from './user_movement.js';

class Room extends React.Component {
    componentDidMount() {
        this.props.fetchLobby("ukNbhl")
    }

    render() {
        let { room, lobby, characters, locations, traps, monsters } = this.props;
        let roomImg;
        let spriteInRoom;
        let trapsInRoom;
        let monstersInRoom;

        if (locations) {
            roomImg = RoomSelector(locations.room);
            for (let i = 0; i < 2; i++) {
                if (characters[i]._id === lobby.player1) {
                    spriteInRoom = <DisplayCharacters character={characters[i]} positionX={locations.xPos}  positionY={locations.yPos} />
                    break;
                } else {
                    spriteInRoom = <DisplayCharacters character={characters[i]} positionX={locations.xPos}  positionY={locations.yPos} />
                    break;
                }
                
            }

            // let roomNumber = room[(locations.room % 16) * locations.floor]

            // // uncomment the line below if you want to test each room
            let roomNumber = room[12] 

            trapsInRoom = TrapsHelper.GetTraps(roomNumber.id, traps).map(trap => (
                TrapsHelper.displayTraps(trap)
            ))
            
            let monsterCountPerRoom = [];
            for (let i = 0; i < monsters.length; i++) {
                if (monsters[i].roomId === roomNumber.id) {
                    monsterCountPerRoom.push(monsters[i])
                }
            }

            monstersInRoom = monsterCountPerRoom.map(monster => (
                monstersInRoom = <DisplayMonsters monster={monster} positionX={monster.xPos} positionY={monster.yPos} />
            ))
        }
        // tiles are 64 x 64
        // rooms 15x9, 960 x 576
        // rooms 17x11 with walls, 1088 x 704
        // min width-height = 64 x 64
        // max width-height = 1024 x 640
        
        return (
            <div className="room-main">
                    <Stage width={1088} height={704}>
                        <Layer>
                            <Image image={roomImg} />
                            {spriteInRoom}
                            {monstersInRoom}
                            {trapsInRoom}
                        </Layer>
                    </Stage>
            </div>
        )
    }
};

export default Room;