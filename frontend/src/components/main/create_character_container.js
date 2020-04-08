import { connect } from "react-redux";
import CreateCharacter from "./create_character";
import { createCharacter } from "../../actions/character_actions";

const mapDispatchToProps = (dispatch) => ({
    createCharacter: (character) => dispatch(createCharacter(character))
});

export default connect(null, mapDispatchToProps)(CreateCharacter)