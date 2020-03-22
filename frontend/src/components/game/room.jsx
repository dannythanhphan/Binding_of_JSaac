import React from 'react';
import { Stage, Layer, Image } from 'react-konva';
import RoomSelector from './room_selector';
import * as TrapsHelper from './traps.js'
import * as MonsterHelper from './monsters.js';
import { DisplayCharacters } from './user_movement.js';

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
                    spriteInRoom = DisplayCharacters(characters[i], locations.xPos, locations.yPos)
                    break;
                } else {
                    spriteInRoom = DisplayCharacters(characters[i], locations.xPos, locations.yPos)
                    break;
                }
                
            }
            // spriteInRoom = characters.map(character => {
            //     if (character._id === lobby.player1) {
            //         DisplayCharacters(character, locations.xPos, locations.yPos)
            //     } else {
            //         DisplayCharacters(character, locations.xPos, locations.yPos)
            //     }
            // });
            let roomNumber = room[(locations.room % 16) * locations.floor]
            // let roomNumber = room[12]
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
        
        // document.getElementById("check").addEventListener('keydown', function(e) {
        //     if (e.keyCode === 37) {
        //       spriteInRoom.props.x(spriteInRoom.props.x() - 4);
        //     } else if (e.keyCode === 38) {
        //       spriteInRoom.props.y(spriteInRoom.props.y() - 4);
        //     } else if (e.keyCode === 39) {
        //       spriteInRoom.props.x(spriteInRoom.props.x() + 4);
        //     } else if (e.keyCode === 40) {
        //       spriteInRoom.props.y(spriteInRoom.props.y() + 4);
        //     } else {
        //       return;
        //     }
        // });
        // debugger
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