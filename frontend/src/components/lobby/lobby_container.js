import { connect } from 'react-redux';
import { leave } from '../../actions/lobby_actions';
import { fetchGameCharacters } from '../../actions/character_actions';
import LobbyMain from './lobby';

const mapStateToProps = state => ({
    characters = Object.keys(state.entities.characters.gameCharacters),
    lobby: state.entities.lobby,
});

const mapDispatchToProps = dispatch => ({
    leaveLobby: id => dispatch(leave(id)),
    fetchGameCharacters: lobbyId => dispatch(fetchGameCharacters(lobbyId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LobbyMain);