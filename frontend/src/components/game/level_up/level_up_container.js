import { connect } from 'react-redux';
import LevelUp from './level_up';
import { updateCharacter } from '../../../actions/character_actions';

const findCharacter = state => {
    gameCharacters = state.entities.gameCharacters;
    myCharacters = state.entities.myCharacters;
    for (const characterId in gameCharacters) {
        if (myCharacters[characterId]) {
            return character;
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