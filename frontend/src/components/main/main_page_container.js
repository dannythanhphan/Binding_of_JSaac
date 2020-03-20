import { connect } from "react-redux";
import MainPage from "./main_page";
import { logout } from "../../actions/session_actions";
import { fetchCurrentUser } from "../../actions/user_actions";
import { receiveGameCharacter } from "../../actions/character_actions";

const mapStateToProps = (state) => ({
    characters: Object.values(state.entities.characters.myCharacters),
    currentUser: state.session.user
});

const mapDispatchToProps = (dispatch) => ({
    fetchCurrentUser: () => dispatch(fetchCurrentUser()),
    logout: () => dispatch(logout()),
    receiveGameCharacter: character => dispatch(receiveGameCharacter(character)),

});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)