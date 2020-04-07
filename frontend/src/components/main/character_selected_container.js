import { connect } from "react-redux";
import CharacterSelected from './character_selected.jsx';

const mapStateToProps = (state, ownProps) => ({
    character: state.entities.characters.myCharacters[ownProps.match.params.characterId],
    ui: state.ui,
});

export default connect(mapStateToProps, null)(CharacterSelected)