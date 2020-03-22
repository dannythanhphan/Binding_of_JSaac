import { connect } from 'react-redux';
import Room from './room';
import { retrieve } from '../../actions/lobby_actions';

const mapStateToProps = state => ({
    room: Object.values(state.entities.rooms),
    characters: Object.values(state.entities.characters.gameCharacters),
    locations: Object.values(state.entities.locations)[0],
    traps: Object.values(state.entities.traps),
    monsters: Object.values(state.entities.monsters)
});

const mapDispatchToProps = dispatch => ({
    fetchLobby: (lobbyKey) => dispatch(retrieve(lobbyKey))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Room);