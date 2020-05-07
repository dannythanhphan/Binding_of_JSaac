import React from 'react';
import HudCharactersItem from './hud_characters_item'
import LevelUpContainer from './level_up/level_up_container'

class HudCharacters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      instructionsModal: false
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ instructionsModal: true })
  }

  closeModal() {
    this.setState({ instructionsModal: false })
  }

  renderModal() {
    if (this.state.instructionsModal) {
      return (
        <div className="instruction-modal-screen">
          <div className="instruction-modal">
            <div className="instruction-container">
              <div className="instruction-controls">
                <div className="control-title">
                  Controls
                </div>
                <div className="controls">
                  <p>W - Move up</p>
                  <p>A - Move left</p>
                  <p>S - Move down</p>
                  <p>D - Move right</p>
                  <p>Space - Attack</p>
                </div>
              </div>
              <div className="bar-separator">

              </div>
              <div className="instruction-conditions">
                <div className="condition-title">
                  Game Instructions
                </div>
                <div className="conditions">
                  <ul>
                    <li>
                      Defeating monsters will grant you experience points
                    </li>
                    <li>
                      Upon reaching the experience points needed to level up, you will be given stat points to distribute to the stat of your choosing
                    </li>
                    <li>
                      The win condition is to get to the fifth floor and finding the exit
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <button onClick={this.closeModal}>Close Instructions</button>
          </div>
        </div>
      )
    }
  }

  render() {
    const charactersItems = this.props.characters.map(character => <HudCharactersItem key={character._id} character={character}/>);
    return (
      <div id="hud-characters">
        <p id="hud-characters-label">Characters</p>
        {charactersItems}
        <LevelUpContainer />
        {this.renderModal()}
        <button className="instructions-button" onClick={this.openModal}>
          Click for Instructions
        </button>
      </div>
    )
  }
}

export default HudCharacters;