import { connect } from 'react-redux';
import HomePage from './home_page';
import { login } from '../../actions/session_actions';

const mapDispatchToProps = (dispatch) => ({
    processForm: user => dispatch(login(user))
})

export default connect(null, mapDispatchToProps)(HomePage);