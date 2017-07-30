import {connect} from 'react-redux';
import Guard from './components/guard';
import api from '../../common/actions/api';

const mapStateToProps = state => {
    return {
        pingInProgress: state.login.get('pingInProgress'),
        isLoggedIn: state.login.get('isLoggedIn')
    };
};

const mapDispatchToProps = dispatch => {
    return {
        ping: () => {
            dispatch(api({
                model: 'users',
                action: 'ping'
            }));
        }
    };
};

const VisibleGuard = connect(
    mapStateToProps,
    mapDispatchToProps
)(Guard);

export default VisibleGuard;
