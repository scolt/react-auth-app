import {connect} from 'react-redux';
import Switcher from './components/switcher';
import translation from './actions/translation';

const mapStateToProps = state => {
    return {
        lang: state.translate.get('language')
    };
};

const mapDispatchToProps = dispatch => ({
    onChangeClick: (value) => {
        dispatch(translation.setLanguage(value));
    }
});

const VisibleTranslateSwitcher = connect(
    mapStateToProps,
    mapDispatchToProps
)(Switcher);

export default VisibleTranslateSwitcher;
