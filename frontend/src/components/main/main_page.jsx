import React from 'react';
import MainCharacterItems from './main_character_items';
import './main_page.css'

class MainPage extends React.Component {
    componentDidMount() {
        this.props.fetchCharacters(this.props.currentUser.id)
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

        return (
            <div className="main-page">
                <div className="main-character-info">
                    <button onClick={logout}>logout</button>
                </div>
                <div className="main-character-select-side-bar">
                    {displayCharacters}
                </div>
            </div>
        );
    }
}

export default MainPage;