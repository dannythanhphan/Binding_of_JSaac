import React from 'react';
import HudCharactersItem from './hud_characters_item'
import LevelUpContainer from './level_up/level_up_container'

class HudCharacters extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const charactersItems = this.props.characters.map(character => <HudCharactersItem key={character._id} character={character}/>);
    return (
      <div id="hud-characters">
        <p id="hud-characters-label">Characters</p>
        {charactersItems}
        <LevelUpContainer />
      </div>
    )
  }
}

export default HudCharacters;