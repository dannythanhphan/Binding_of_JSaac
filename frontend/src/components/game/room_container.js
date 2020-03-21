import { connect } from 'react-redux';
import Room from './room';
import { retrieve } from '../../actions/lobby_actions';

const mapStateToProps = state => ({
    room: Object.values(state.entities.rooms)[0],
    characters: Object.values(state.entities.characters.myCharacters),
});

const mapDispatchToProps = dispatch => ({
    fetchLobby: (lobbyKey) => dispatch(retrieve(lobbyKey))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Room);