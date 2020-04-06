import React from 'react';

import mustacheMan from '../../../assets/avatars/character_ava1.png';
import thief from '../../../assets/avatars/character_ava2.png';
import superWoman from '../../../assets/avatars/character_ava3.png';

class HudCharacterItem extends React.Component {
  constructor(props) {
    super(props);

    this.avatar = 1;
    switch (this.props.character.characterSprite) {
      case 1:
        this.avatar = mustacheMan;
        break;
      case 2:
        this.avatar = thief;
        break;
      case 3:
        this.avatar = superWoman;
        break;
      default:
        break;
    }
  }

  render() {
    const hpBarWidth = 150 * this.props.character.currentHP/this.props.character.totalHP;
    const hpBarStyle = { width: `${hpBarWidth}px`};
    const expBarWidth = 150 * this.props.character.currentEXP/this.props.character.totalEXP;
    const expBarStyle = { width: `${expBarWidth}px`}
    
    return(
      <div className="hud-characters-item-box">
        <div className="hud-characters-item-label">
          <p className="hud-characters-item-name">{this.props.character.name}</p>
          <p className="hud-characters-item-level">Level {this.props.character.level}</p>
        </div>
        <div className="hud-characters-item-content-box">
          <img className="hud-characters-item-avatar" src={this.avatar} />
          <div className="hud-characters-item-bars-box">          
            <div className="hud-characters-item-hp-box">
              <p className="hud-characters-item-hp-label">HP {this.props.character.currentHP}/{this.props.character.totalHP}</p>
              <div className="hud-characters-item-hp-bar-outer">
                <div className="hud-characters-item-hp-bar-inner" style={hpBarStyle}></div>
              </div>
            </div>
            <div className="hud-characters-item-exp-box">
              <p className="hud-characters-item-exp-label">EXP</p>
              <div className="hud-characters-item-exp-bar-outer">
                <div className="hud-characters-item-exp-bar-inner" style={expBarStyle}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HudCharacterItem