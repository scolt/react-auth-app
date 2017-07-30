import {connect} from 'react-redux';
import Translate from './components/translate';

const mapStateToProps = state => {
    return {
        lang: state.translate.get('language')
    };
};

const VisibleTranslate = connect(
    mapStateToProps
)(Translate);

export default VisibleTranslate;
