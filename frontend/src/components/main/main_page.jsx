import React from 'react';
import { Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';
import { ProtectedRoute } from '../../util/route_util';
import MainCharacterItems from './main_character_items';
import './main_page.css';
import CharacterSelectedContainer from './character_selected_container';
import CreateCharacterContainer from './create_character_container';
import LobbyContainer from '../lobby/lobby_container';
import NavBarContainer from './nav_bar_container';
import logo from '../../assets/logo.png';


class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    componentDidMount() {
        this.props.fetchCurrentUser();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.characters.length !== this.props.characters.length) {
            this.props.fetchCurrentUser();
        }
    }

    render() {
        
        const { characters, logout, receiveGameCharacter } = this.props
        const displayCharacters = (characters.length > 0) ? (
            characters.map((character) => {
                return <MainCharacterItems 
                    key={Math.random()} 
                    character={character} 
                    receiveGameCharacter={receiveGameCharacter}
                />
            })
        ) : (
            null
        )
        const nullEle = null;

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
                        If you do not have a character, create a new character by clicking the <br/>"New Character" button above
                    </li>
                    <li className="instructions">
                        Create a lobby by clicking the <br/>"Create Lobby" button above.
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
                    <NavBarContainer />
                    {displayInstructions}
                    <ProtectedRoute path="/main/:characterId" component={CharacterSelectedContainer} />
                    <ProtectedRoute path="/main/create" component={CreateCharacterContainer}/>
                    <ProtectedRoute path="/main/lobby/" component={LobbyContainer} />
                </div>
                <Link to='/main'>
                    <img className="main-logo-image" src={logo} alt="logo" />
                </Link>
                
                <Switch>
                    <Route path="/main/lobby">
                        {nullEle}
                    </Route>
                    <Route path="/main/">
                        <div className="main-character-select-container">
                        <div className="main-character-select-side-bar">
                            {displayCharacters}
                        </div>

                        </div>
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default MainPage;
