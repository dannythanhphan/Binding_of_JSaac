import React from 'react';
import monster from '../../assets/monsters/golem/0_Golem_Walking_000.png'
import { Stage, Layer, Image, Sprite } from 'react-konva';
import RoomSelector from './room_selector';

class Room extends React.Component {
    componentDidMount() {
        this.props.fetchLobby("wHpYtU")
    }

    render() {
        let { room, characters } = this.props;
        let roomImg;
        let sprites;

        let monsterImg = new window.Image();
        monsterImg.src = monster
        if (room) {
            roomImg = RoomSelector(room.position);
            sprites = characters.map(character => (
                <div key={Math.random()}>
                     {/* <Sprite
                         x={500}
                         y={400}
                         image={<img src={monster} alt={"golem"} />}
                     /> */}
                </div>
            ));
            
        }
        
        return (
            <div className="room-main">
                    <Stage width={1088} height={704}>
                        <Layer>
                            <Image image={roomImg}> 
                            
                            </Image>
                                <Image
                                    x={1088 / 14}
                                    y={0}
                                    image={monsterImg}
                                    width={100}
                                    height={100}
                                />
                        </Layer>
                        {/* <Layer>
                            <Image image={<img src={monster} alt="golem" />} />
                        </Layer> */}
                    </Stage>
            </div>
        )
    }
};

export default Room;