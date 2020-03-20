import { connect } from 'react-redux';
import { leave, join, create, retrieve } from '../../actions/lobby_actions';
import LobbyMain from './lobby';

const mapStateToProps = state => {
    console.log(state.entities)
    return {
    gameCharacters: state.entities.characters.gameCharacters,
    lobby: state.entities.lobby,
}};

const mapDispatchToProps = dispatch => ({
    leaveLobby: (id, charId) => dispatch(leave(id, charId)),
    createLobby: () => dispatch(create()),
    fetchLobby: key => dispatch(retrieve(key)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LobbyMain);