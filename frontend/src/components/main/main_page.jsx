import React from 'react';
import MainCharacterItems from './main_character_items';
import './main_page.css';
// import { Route } from 'react-router';
import CharacterSelectedContainer from './character_selected_container';
import CreateCharacterContainer from './create_character_container';
import { Link } from 'react-router-dom';
import logo from '../home/logo.png';
import { ProtectedRoute } from '../../util/route_util';

class MainPage extends React.Component {
    componentDidMount() {
        this.props.fetchCharacters(this.props.currentUser.id)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.characters.myCharacters !== this.props.characters.myCharacters) {
            this.props.fetchCharacters(this.props.currentUser.id)
        }
    }

    render() {
        const { characters, logout } = this.props
        const displayCharacters = (Object.values(characters).length > 0) ? (
            characters.map((character) => {
                return <MainCharacterItems key={Math.random()} character={character} />
            })
        ) : (
            null
        )

        const displayInstructions = (this.props.match.isExact) ? (
            <div className="welcome-instructions">
                <p className="welcome-title">
                    It's too dangerous to go alone, take this!
                </p>
                <ol>
                    <li className="instructions">
                        Select a character on the right to choose the character you want to play.
                    </li>
                    <li className="instructions">
                        If you do not have a character, create a new character by clicking the "New Character" button above
                    </li>
                    <li className="instructions">
                        Create a lobby by clicking the "Find a Lobby" button above.
                    </li>
                    <li className="instructions">
                        Share the lobby key with a friend or choose to go on your adventure alone.
                    </li>
                </ol>
            </div>
        ) : (
            null
        )
        return (
            <div className="main-page">
                <div className="main-character-info">
                    <div className="ui-buttons">
                        <div className="redirect-buttons-container">
                            <Link to="/main/create" className="redirect-buttons">
                                New Character
                            </Link>
                            <Link to="/lobby" className="redirect-buttons">
                                Start Game
                            </Link>
                        </div>
                        <button onClick={logout} className="logout-button">Sign Out</button>
                    </div>
                    {displayInstructions}
                    <ProtectedRoute path="/main/:characterId" component={CharacterSelectedContainer} />
                    <ProtectedRoute path="/main/create" component={CreateCharacterContainer}/>

                </div>
                <Link to='/main'>
                    <img className="main-logo-image" src={logo} alt="logo" />
                </Link>
                <div className="main-character-select-side-bar">
                    {displayCharacters}
                </div>
            </div>
        );
    }
}

export default MainPage;