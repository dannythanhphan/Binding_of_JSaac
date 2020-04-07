import { connect } from 'react-redux';
import LevelUp from './level_up';
import { updateCharacter } from '../../../actions/character_actions';

const findCharacter = state => {
    let gameCharacters = state.entities.characters.gameCharacters;
    let myCharacters = state.entities.characters.myCharacters;
    for (const characterId in gameCharacters) {
        if (myCharacters[characterId]) {
            return gameCharacters[characterId];
        }
    }
}

const mapStateToProps = state => ({
    character: findCharacter(state)
});

const mapDispatchToProps = dispatch => ({
    updateCharacter: character => dispatch(updateCharacter(character))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LevelUp)