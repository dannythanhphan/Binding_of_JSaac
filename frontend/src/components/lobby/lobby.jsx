import React from 'react';

class LobbyMain extends React.Component {
    componentDidMount() {
        
    };

    render() {
        return (
            <div>
                <h1>{this.props.lobby.lobbykey}</h1>
                {this.props.characters.forEach(character => (
                    this.characterDisplay(character)
                ))}
            </div>
        )
    }
}

export default LobbyMain;