import { connect } from "react-redux";
import CharacterSelected from './character_selected.jsx';
import { deleteCharacter } from "../../actions/character_actions.js";
import { join, create } from '../../actions/lobby_actions';


const mapStateToProps = (state, ownProps) => ({
    character: state.entities.characters.myCharacters[ownProps.match.params.characterId],
    errors: state.errors.lobbies
});

const mapDispatchToProps = (dispatch) => ({
    deleteCharacter: (characterId) => dispatch(deleteCharacter(characterId)),
    join: (id, charId) => dispatch(join(id, charId)),
    create: charId => dispatch(create(charId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CharacterSelected)