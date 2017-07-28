import { combineReducers } from 'redux';
import login from '../../containers/login/reducers/loginReducer';
import translate from '../components/translate/reducers/translate';

const reducers = combineReducers({
    login,
    translate
});

export default reducers