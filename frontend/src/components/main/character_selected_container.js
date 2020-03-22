import { connect } from "react-redux";
import CharacterSelected from './character_selected.jsx';
import { deleteCharacter } from "../../actions/character_actions.js";
import { join, create, leave } from '../../actions/lobby_actions';


const mapStateToProps = (state, ownProps) => ({
    character: state.entities.characters.myCharacters[ownProps.match.params.characterId],
    errors: state.errors.lobbies,
    ui: state.ui,
});

const mapDispatchToProps = (dispatch) => ({
    deleteCharacter: (characterId) => dispatch(deleteCharacter(characterId)),
    joinLobby: (id, charId) => dispatch(join(id, charId)),
    createLobby: charId => dispatch(create(charId)),
    leaveLobby: (id, charId) => dispatch(leave(id, charId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CharacterSelected)