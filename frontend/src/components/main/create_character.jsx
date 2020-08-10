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

    handleCharacter(value) {
        const characterNames = {1: "Uther", 2: "Everglade", 3:"Linara"};
        const characterBios = {    
            1: "Uther was born in the remote reaches of the Tuscian Steppes. Ever since he was a child, he had dreamt of one day being the first of his clan to reach the bottom of the Shifting Labyrinth. Now that he has finally come of age, he has finally decided to challenge the Labyrinth in pursuit of fame, fortune and glory.",
            2: "\"Kill or be killed; Live by the sword and die by the sword.\" That is the motto that he lives by, having spent his childhood as an orphan in the slums of Ikrosa. As a child, every day was a fight for life or death, and he had to resort to any means possible in order to survive. One day, he started hearing voices in his head, beckoning him to go to the bottom level of the Shifting Labyrinth. Unable to ignore the voices any longer, Everglade has finally decided to explore dungeon and discover why the dungeon is calling for him.",
            3: "Linara is what you would call a once in a generation talent. Born to a noble family, her parents discovered her natural affinity towards destruction magic when she created her first pyrosphere at the age of 3. At the age of 10, she was the youngest ever graduate from the Royal Mage Academy, leaving nothing but a trail of fire and destruction in her wake. Linara has decided to explore the Labyrinth as she seeks to understand the secrets found deep within the Labyrinth, with its ever-changing floors and its undying monsters."
        }
        const charName = document.getElementById("create-character-name");
        const charBio = document.getElementById("create-character-bio");
        charName.innerHTML = characterNames[value];
        charBio.innerHTML = characterBios[value];
        this.handleCharacterSprite(value)
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
                                onClick={() => this.handleCharacter(1)}
                            />
                        </label>

                        <label className="radio-container">
                            <input type="radio" name="character" />
                            <img 
                                src={rogue_ava} 
                                alt="rogue" 
                                onClick={() => this.handleCharacter(2)} 
                            />
                        </label>

                        <label className="radio-container">
                            <input type="radio" name="character" />
                            <img 
                                src={mage_ava} 
                                alt="mage" 
                                onClick={() => this.handleCharacter(3)}
                            />
                        </label>
                    </div>
                    <br/>
                    <div id="create-character-info">
                        <div id="create-character-name"></div>
                        <div id="create-character-bio"></div>
                    </div>
                    <div className="create-button-container">
                        <button onClick={this.handleSubmit} className="create-button">Create Character</button>
                    </div>
                </form>
            </div>
        );
    }
};

export default CreateCharacter;