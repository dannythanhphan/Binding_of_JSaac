import React from 'react';
import HudCharactersItem from './hud_characters_item'

class HudCharacters extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const charactersItems = this.props.characters.map(character => <HudCharactersItem character={character}/>);
    return (
      <div id="hud-characters">
        <p id="hud-characters-label">Characters</p>
        {charactersItems}
      </div>
    )
  }
}

export default HudCharacters;