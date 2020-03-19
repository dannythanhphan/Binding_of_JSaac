import { connect } from "react-redux";
import CharacterSelected from './character_selected.jsx';

const mapStateToProps = (state, ownProps) => ({
    character: state.entities.characters.myCharacters[ownProps.match.params.characterId]
});

const mapDispatchToProps = (dispatch) => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(CharacterSelected)