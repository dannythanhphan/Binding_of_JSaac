import React from 'react';
import './lobby.css';
import mustacheMan from '../../assets/animations/character_animations1.jpg';
import thief from '../../assets/animations/character_animations2.png';
import superWoman from '../../assets/animations/character_animations3.png';
import { Stage, Layer, Sprite } from 'react-konva';
import animationDetails from './animation_details';

class LobbyMain extends React.Component {
    componentDidMount() {
        console.log(localStorage);
        console.log(this.props)
        if (localStorage.lobbykey && Object.keys(this.props.lobby).length === 0) {
            this.props.fetchLobby(localStorage.lobbykey);
        }
    }

    leaveLobby(e) {
        e.preventDefault();
        if (localStorage.lobbykey) {
            this.props.leaveLobby(localStorage.lobbykey, localStorage.lobbycharacter)
            .then( (res) => {
                if (res.type === 'REMOVE_LOBBY') {
                    this.props.history.push('/main')
                }
            });
        }
    }

    // componentDidUpdate(prevProps) {
    //     if (Object.keys(prevProps.lobby).length !== Object.keys(this.props.lobby).length) {
    //         this.props.fetchLobby(this.props.lobby.lobbykey)
    //     }
    // }
    renderPlayer1() {
        const { lobby, gameCharacters } = this.props;
        let player1Running;
        let player1ImageObj = new Image();
        let player1Frames = 0;
        if (lobby && lobby.player1 && gameCharacters[lobby.player1]) {
            let player1Info = animationDetails(gameCharacters[lobby.player1].characterSprite)
            player1Running = player1Info.running
            switch (player1Info.imageObj) {
                case "mustacheMan":
                    player1ImageObj.src = mustacheMan
                    break;
                case "thief":
                    player1ImageObj.src = thief
                    break;
                case "superWoman":
                    player1ImageObj.src = superWoman
                    break;
            }
            player1Frames = player1Info.frames
        return (
        <div className="lobby-player1-info">
            <div className="lobby-player1-username">
                {gameCharacters[lobby.player1].name}
            </div>
            <div className="lobby-player1-char-model">
                <Stage width={200} height={300}>
                    <Layer>
                        <Sprite
                            x={50}
                            y={50}
                            image={player1ImageObj}
                            animation='running'
                            animations={player1Running}
                            frameRate={player1Frames}
                            frameIndex={0}
                            ref={(node => {
                                if (node && !node.isRunning()) {
                                    // setInterval(function() {node.move({x: (20 % 200), y: 0})}, 48)
                                    node.start()
                                }
                            })
                            }
                        />
                    </Layer>
                </Stage>
            </div>
        </div> )
        } else {
            return null;
        }
    }
    renderPlayer2() {
        const { lobby, gameCharacters } = this.props;
        let player2Running;
        let player2ImageObj = new Image();
        let player2Frames = 0;

        if (lobby && lobby.player2 && gameCharacters[lobby.player2]) {
            let player2Info = animationDetails(gameCharacters[lobby.player2].characterSprite)
            player2Running = player2Info.running
            switch (player2Info.imageObj) {
                case "mustacheMan":
                    player2ImageObj.src = mustacheMan
                    break;
                case "thief":
                    player2ImageObj.src = thief
                    break;
                case "superWoman":
                    player2ImageObj.src = superWoman
                    break;
            }
            player2Frames = player2Info.frames
        return (
            <div className="lobby-player2-info">
                <div className="lobby-player2-username">
                    {gameCharacters[lobby.player2].name}
                </div>
                <div className="lobby-player2-char-model">
                    <Stage width={200} height={300}>
                        <Layer>
                            <Sprite
                                x={50}
                                y={50}
                                image={player2ImageObj}
                                animation='running'
                                animations={player2Running}
                                frameRate={player2Frames}
                                frameIndex={0}
                                ref={(node => {
                                    if (node && !node.isRunning()) {
                                        // setInterval(function() {node.move({x: (20 % 200), y: 0})}, 48)
                                        node.start()
                                    }
                                })
                                }
                            />
                        </Layer>
                    </Stage>
                </div>
            </div>)
        }
        else {
            return null;
        } 
    }

    render() {
        const { lobby, gameCharacters } = this.props;

        const displayCharacterModels = (Object.values(gameCharacters).length > 0) ? (
            <div className="lobby-players-container">
                <div className="lobby-key-info">
                    <p className="lobby-key-title">Lobby Key</p>
                    <br/>
                    <p className="lobby-key">{lobby.lobbykey}</p>
                </div>
                <div className="player1-player2-container">
                    {this.renderPlayer1()}
                    {this.renderPlayer2()}
                </div>
                <button onClick={this.leaveLobby.bind(this)}>Leave Lobby</button>
            </div>
        ) : (
            null
        )
        return (
            <div className="lobby-game-select">
                {displayCharacterModels}
            </div>
        )
    }
}

export default LobbyMain;