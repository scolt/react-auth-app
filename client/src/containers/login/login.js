import { connect } from 'react-redux';
import Login from './components/login';

const mapStateToProps = state => {
    return {}
};

const VisibleLogin = connect(
    mapStateToProps
)(Login);

export default VisibleLogin