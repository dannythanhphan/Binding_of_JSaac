import React from 'react';
import { Stage, Layer, Image } from 'react-konva';
import RoomSelector from './room_selector';
import * as TrapsHelper from './traps.js'
import DisplayMonsters from './monsters.js';
import DisplayCharacters from './user_movement.js';

class Room extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        let currentCharacter;
        let otherCharacter;
        const { locations } = this.props;
        for (let i = 0; i < locations.length; i++) {
            if (locations[i].character === localStorage.lobbycharacter) {
                currentCharacter = locations[i];
            }
            else {
                otherCharacter = locations[i];
            }
        }
        let tempState = {
            currentChar: {
                characterXPos: currentCharacter.xPos * 64,
                characterYPos: currentCharacter.yPos * 64,
                frames: 0,
                animation: "runningRight"
            },
            otherChar: {},
            currentLocation: currentCharacter
        }
        if (otherCharacter) {
            tempState.otherChar = {
                characterXPos: otherCharacter.xPos * 64,
                characterYPos: otherCharacter.yPos * 64,
                frames: 0,
                animation: "runningRight"
            }
        }

        this.state = tempState;
        this.childSetState = this.childSetState.bind(this);
    }

    childSetState(state, currentChar) {
        let currentState = Object.assign({}, this.state);
        if (currentChar) {
            currentState.currentChar = state;
        }
        else {
            currentState.otherChar = state;
        }
        this.setState(currentState);
    }

    componentDidMount() {
        if (localStorage.lobbykey && Object.keys(this.props.lobby).length === 0) {
            this.props.fetchLobby(localStorage.lobbykey)
        }
        setInterval(() => {
            window.socket.emit("dungeonRefresh", 
            {room: localStorage.lobbykey, state: this.state});
        }, 1000)
        window.socket.on("receiveDungeon", data => {
            // let currentState = Object.assign({}, this.state);
            // currentState.otherChar = data.currentChar;
            // this.setState(currentState);
            console.log(data);
        })
    }

    render() {
        if (Object.keys(this.props.lobby).length === 0) return null;
        let { room, lobby, characters, locations, traps, monsters } = this.props;
        let roomImg;
        let spriteInRoom;
        let currentChar;
        let otherChar;
        let trapsInRoom;
        let monstersInRoom;
        
        if (locations.length !== 0) {
            roomImg = RoomSelector(this.state.currentLocation.room);
            for (let i = 0; i < characters.length; i++) {
                if (characters[i]._id === localStorage.lobbycharacter) {
                    currentChar = <DisplayCharacters 
                    character={characters[i]} 
                    state={this.state.currentChar}
                    movement={true}
                    childSetState={this.childSetState}
                    />
                } else {
                    otherChar = <DisplayCharacters 
                    character={characters[i]} 
                    state={this.state.otherChar}
                    movement={false}
                    childSetState={this.childSetState}
                    />
                }
            }


            let roomNumber = room[(this.state.currentLocation.room % 16) * this.state.currentLocation.floor]

            // // uncomment the line below if you want to test each room
            // let roomNumber = room[12] 

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
                            {currentChar}
                            {otherChar}
                            {/* {monstersInRoom} */}
                            {trapsInRoom}
                        </Layer>
                    </Stage>
            </div>
        )
    }
};

export default Room;