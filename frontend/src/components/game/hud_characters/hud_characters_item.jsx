import React from 'react';

class HudCharacterItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      this.props.character.name
    )
  }
}

export default HudCharacterItem