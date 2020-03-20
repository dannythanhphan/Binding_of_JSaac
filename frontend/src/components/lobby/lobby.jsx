import React from 'react';

class LobbyMain extends React.Component {
    componentDidMount() {
        
    };

    render() {
        return (
            <div className="lobby-game-select">
                <button>New Game</button>
                <button>Existing Game</button>
            </div>
        )
    }
}

export default LobbyMain;