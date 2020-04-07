import React from 'react';
import knight_ava from '../../assets/avatars/knight_ava.png';
import rogue_ava from '../../assets/avatars/rogue_ava.png';
import mage_ava from '../../assets/avatars/mage_ava.png';
import './create_character.css';

class CreateCharacter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            characterSprite: 0
        };

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(e) {
        this.setState({ name: e.target.value });
    }

    handleCharacterSprite(value) {
        this.setState({ characterSprite: value })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createCharacter(this.state);
        this.props.history.push('/main');
    }

    render() {
        return (
            <div className="create-character-container">
                <form className="create-character-form">
                    <label className="create-character-name">
                        <p className="character-label">
                            Character Name:
                        </p>
                        <input type="text" onChange={this.handleInput}/>
                    </label>
                    <br/>
                    
                    <p className="fighter-title">Choose your Fighter</p>
                    <div className="character-image-container">
                        <label className="radio-container">
                            <input type="radio" name="character" />
                            <img 
                                src={knight_ava} 
                                alt="knight" 
                                onClick={() => this.handleCharacterSprite(1)}
                            />
                        </label>

                        <label className="radio-container">
                            <input type="radio" name="character" />
                            <img 
                                src={rogue_ava} 
                                alt="rogue" 
                                onClick={() => this.handleCharacterSprite(2)} 
                            />
                        </label>

                        <label className="radio-container">
                            <input type="radio" name="character" />
                            <img 
                                src={mage_ava} 
                                alt="mage" 
                                onClick={() => this.handleCharacterSprite(3)}
                            />
                        </label>
                    </div>
                    <br/>
                    <div className="create-button-container">
                        <button onClick={this.handleSubmit} className="create-button">Create Character</button>
                    </div>
                </form>
            </div>
        );
    }
};

export default CreateCharacter;