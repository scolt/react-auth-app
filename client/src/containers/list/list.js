import { connect } from 'react-redux';
import List from './components/list';
import api from '../../common/actions/api';

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
    onLogoutClick: () => {
        dispatch(api({
            model: 'users',
            action: 'logout'
        }))
    }
});

const VisibleList = connect(
    mapStateToProps,
    mapDispatchToProps
)(List);

export default VisibleList