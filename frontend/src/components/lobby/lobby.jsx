import React from 'react';

class LobbyMain extends React.Component {
    componentDidMount() {
        this.props.fetchGameCharacters(this.props.lobby._id)
    };

    characterDisplay(character) {
        return (
            <div className="character-lobby-display">
                <h2>character.name</h2>
                {/* Character Sprite */}
                <p>{`Level ${character.level}`}</p>
            </div>
        )
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