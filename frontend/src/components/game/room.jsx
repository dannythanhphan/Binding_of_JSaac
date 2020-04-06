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
        const { locations, characters } = this.props;
        for (let i = 0; i < characters.length; i++) {
            if (characters[i]._id === localStorage.lobbycharacter) {
                currentCharacter = characters[i];
            }
            else {
                otherCharacter = characters[i];
            }
        }
        currentCharacter = Object.assign(currentCharacter, locations[currentCharacter._id])
        currentCharacter.frames = 0;
        currentCharacter.animation = "runningRight";
        currentCharacter.xPixel = currentCharacter.xPos * 64;
        currentCharacter.yPixel = currentCharacter.yPos * 64;
        delete currentCharacter.character;

        if (otherCharacter) {
            otherCharacter = Object.assign(otherCharacter, locations[otherCharacter._id])
            otherCharacter.frames = 0;
            otherCharacter.animation = "runningRight";
            otherCharacter.xPixel = otherCharacter.xPos * 64;
            otherCharacter.yPixel = otherCharacter.yPos * 64;
            delete otherCharacter.character;
        }
        this.state = {currentCharacter, otherCharacter};
        this.childSetState = this.childSetState.bind(this);
    }

    childSetState(state) {
        let currentState = Object.assign({}, this.state);
        if (state._id === localStorage.lobbycharacter) {
            currentState.currentCharacter = state;
        }
        this.setState(currentState);
    }

    componentDidMount() {
        if (localStorage.lobbykey && Object.keys(this.props.lobby).length === 0) {
            this.props.fetchLobby(localStorage.lobbykey)
        }
        // Change update speed 30fps for now
        window.interval = setInterval(() => {
            window.socket.emit("dungeonRefresh", 
            {
                room: localStorage.lobbykey, 
                char: this.state.currentCharacter
            });
        }, 1000 / 30)

        window.socket.on("receiveDungeon", data => {
            if (data._id !== localStorage.lobbycharacter) {
                let currentState = Object.assign({}, this.state);
                currentState.otherCharacter = data;
                this.setState(currentState);
            }
        })
    }

    componentWillUnmount() {
        // still need to figure this out
        window.clearInterval(window.interval);
    }

    render() {
        if (Object.keys(this.props.lobby).length === 0) return null;
        let { room, lobby, characters, locations, traps, monsters } = this.props;
        let roomImg;
        let spriteInRoom;
        let currentChar;
        let otherChar;
        let trapsInRoom;
        let trapsDisplay;
        let monstersInRoom;

        if (this.state.currentCharacter) {
            let roomNumber = room[(this.state.currentCharacter.room % 16) * this.state.currentCharacter.floor];
            roomImg = RoomSelector(this.state.currentCharacter.room);
            trapsInRoom = TrapsHelper.GetTraps(roomNumber.id, traps);
            trapsDisplay = trapsInRoom.map(trap => (
                TrapsHelper.displayTraps(trap)
            ))

            currentChar = <DisplayCharacters 
                char={this.state.currentCharacter}
                movement={true}
                childSetState={this.childSetState}
                traps={trapsInRoom}
                />


            // // uncomment the line below if you want to test each room
            // let roomNumber = room[12] 


            
            let monsterCountPerRoom = [];
            for (let i = 0; i < monsters.length; i++) {
                if (monsters[i].roomId === roomNumber.id) {
                    monsterCountPerRoom.push(monsters[i])
                }
            }

            monstersInRoom = monsterCountPerRoom.map(monster => (
                monstersInRoom = <DisplayMonsters 
                monster={monster} 
                positionX={monster.xPos} 
                positionY={monster.yPos}
                playerX={this.state.currentCharacter.xPixel}
                playerY={this.state.currentCharacter.yPixel}
                />
            ))
        }
        // tiles are 64 x 64
        // rooms 15x9, 960 x 576
        // rooms 17x11 with walls, 1088 x 704
        // min width-height = 64 x 64
        // max width-height = 1024 x 640
        if (this.state.otherCharacter) {
            otherChar = <DisplayCharacters
                char={this.state.otherCharacter}
                movement={false}
                childSetState={this.childSetState}
                traps={trapsInRoom}
            />
        }
        return (
            <div className="room-main">
                <Stage width={1088} height={704}>
                    <Layer>
                        <Image image={roomImg} />
                        {monstersInRoom}
                        {trapsDisplay}
                        {currentChar}
                        {otherChar}
                    </Layer>
                </Stage>
            </div>
        )
    }
};

export default Room;