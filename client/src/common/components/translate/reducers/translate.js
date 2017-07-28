import { Map } from 'immutable';
import translation from '../actions/translation';

export default (state = Map({
    language: translation.getCurrentLanguage(),
    isLoading: true
}), action) => {
    if (action.type === 'changeLanguage') {
        return state.set('language', action.value);
    }

    return state;
}