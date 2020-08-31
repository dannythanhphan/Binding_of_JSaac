import { connect } from 'react-redux';
import ScoreBox from './score_box';

const mapStateToProps = state => ({
    characters: Object.values(state.entities.characters.gameCharacters),
    locations: state.entities.locations,
    score: state.entities.score
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
    mapStateToProps,
    null
)(ScoreBox);