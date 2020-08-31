import React from 'react';
import HudCharactersContainer from './hud_characters/hud_characters_container';
import RoomContainer from './room_container';
import ScoreBoxContainer from './score_box/score_box_container';
import './game.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return(
      <div className="game-main">
        <RoomContainer />
        <ScoreBoxContainer />
        <HudCharactersContainer />
      </div>
    )
  }
}

export default Game;