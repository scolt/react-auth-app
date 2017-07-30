import {connect} from 'react-redux';
import Login from './components/login';

const mapStateToProps = () => ({});

const VisibleLogin = connect(
    mapStateToProps
)(Login);

export default VisibleLogin;
