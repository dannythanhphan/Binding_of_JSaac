import { connect } from 'react-redux';
import Room from './room';

const mapStateToProps = state => ({
    room: Object.values(state.entities.rooms)[0],
    characters: state.entities.characters.gameCharacters,
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Room);