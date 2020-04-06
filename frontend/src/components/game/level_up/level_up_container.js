import { connect } from 'react-redux';
import LevelUp from './level_up';

const findCharacter = state => {
    gameCharacters = state.entities.gameCharacters;
    myCharacters = state.entities.myCharacters;
    for (const character in gameCharacters) {
        if (myCharacters[character.id]) {
            return character;
        }
    }
}

const mapStateToProps = state => ({
    character: findCharacter(state)

});

const mapDispatchToProps = dispatch => ({
    
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LevelUp)