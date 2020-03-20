import { connect } from "react-redux";
import CharacterSelected from './character_selected.jsx';
import { deleteCharacter } from "../../actions/character_actions.js";

const mapStateToProps = (state, ownProps) => ({
    character: state.entities.characters.myCharacters[ownProps.match.params.characterId]
});

const mapDispatchToProps = (dispatch) => ({
    deleteCharacter: (characterId) => dispatch(deleteCharacter(characterId))
})

export default connect(mapStateToProps, mapDispatchToProps)(CharacterSelected)