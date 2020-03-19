import { connect } from "react-redux";
import { fetchCharacters } from "../../actions/character_actions";
import MainPage from "./main_page";
import { logout } from "../../actions/session_actions";

const mapStateToProps = (state) => ({
    characters: Object.values(state.entities.characters),
    currentUser: state.session.user
});

const mapDispatchToProps = (dispatch) => ({
    fetchCharacters: (userId) => dispatch(fetchCharacters(userId)),
    logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)