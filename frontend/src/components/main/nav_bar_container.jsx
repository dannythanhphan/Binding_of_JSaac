import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logout } from "../../actions/session_actions";
import { deleteCharacter } from "../../actions/character_actions";
import { join, create, leave } from "../../actions/lobby_actions";


import NavBar from "./nav_bar";

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
    deleteCharacter: (characterId) => dispatch(deleteCharacter(characterId)),
    join: (id, charId) => dispatch(join(id, charId)),
    create: charId => dispatch(create(charId)),
    leave: (id, charId) => dispatch(leave(id, charId)),
    logout: () => dispatch(logout()),
});

export default connect(null, mapDispatchToProps)(NavBar)