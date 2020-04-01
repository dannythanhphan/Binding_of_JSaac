import { connect } from 'react-redux';
import { retrieve } from '../../actions/lobby_actions';
import LobbyMain from './lobby';

const mapStateToProps = state => ({
    gameCharacters: state.entities.characters.gameCharacters,
    lobby: state.entities.lobby,
});

const mapDispatchToProps = dispatch => ({
    retrieve: key => dispatch(retrieve(key)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LobbyMain);