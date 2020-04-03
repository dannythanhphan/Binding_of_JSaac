import React from 'react';
import RoomContainer from './room_container';
import './game.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <RoomContainer />
    )
  }
}

export default Game;