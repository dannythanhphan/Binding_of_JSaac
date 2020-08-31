import React from 'react';

class ScoreBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let characters = Object.values(this.props.characters);
    let currentChar;
    for (let i = 0; i < characters.length; i++) {
        if (characters[i]._id === localStorage.lobbycharacter) {
          currentChar = characters[i]
        }
    }
    const floorText = `Floor ${this.props.locations[currentChar._id].floor}`;
    const scoreText = `Score: ${this.props.score.value}`
    return(
      <div id="score-box">
        <div id="floor-text">{floorText}</div>
        <div id="score-text">{scoreText}</div>
      </div>
      )
  }
}


export default ScoreBox;