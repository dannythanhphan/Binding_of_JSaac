import { connect } from 'react-redux';
import { leave, join, create, retrieve } from '../../actions/lobby_actions';
import LobbyMain from './lobby';

const mapStateToProps = state => ({
    characters: Object.keys(state.entities.characters.gameCharacters),
    lobby: state.entities.lobby,
});

const mapDispatchToProps = dispatch => ({
    leaveLobby: id => dispatch(leave(id)),
    joinLobby: id => dispatch(join(id)),
    createLobby: () => dispatch(create()),
    fetchLobby: key => dispatch(retrieve(key)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LobbyMain);