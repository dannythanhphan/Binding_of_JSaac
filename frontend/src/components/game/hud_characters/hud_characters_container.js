import { connect } from 'react-redux';
import HudCharacters from './hud_characters';

const mapStateToProps = state => ({
    characters: Object.values(state.entities.characters.gameCharacters),
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
    mapStateToProps,
    null
)(HudCharacters);