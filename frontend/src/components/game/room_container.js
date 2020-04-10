import { connect } from 'react-redux';
import Room from './room';
import { retrieve } from '../../actions/lobby_actions';
import { moveRoom, updateLocation } from '../../actions/room_actions'

const mapStateToProps = state => ({
    movingRooms: state.ui.moving,
    room: Object.values(state.entities.rooms),
    characters: Object.values(state.entities.characters.gameCharacters),
    locations: (state.entities.locations),
    traps: Object.values(state.entities.traps),
    monsters: Object.values(state.entities.monsters),
    lobby: state.entities.lobby
});

const mapDispatchToProps = dispatch => ({
    fetchLobby: (lobbyKey) => dispatch(retrieve(lobbyKey)),
    moveRoom: (key, charId, floor, room) => dispatch(moveRoom(key, charId, floor, room)),
    updateLocation: (room, charId) => dispatch(updateLocation(room, charId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Room);