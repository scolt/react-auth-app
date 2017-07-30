import {Map} from 'immutable';

export default (state = Map({
    isLoggedIn: false,
    pingInProgress: true
}), action) => {
    if (action.type === 'endProcessing' && action.origin === 'users#logout') {
        return state.set('isLoggedIn', false).set('pingInProgress', false);
    }

    if (action.type === 'errProcessing' && action.origin === 'users#logout') {
        return state.set('pingInProgress', false);
    }

    if (action.type === 'startProcessing' && ['users#ping', 'users#logout'].indexOf(action.origin) > -1) {
        return state.set('pingInProgress', true);
    }

    if (action.type === 'errProcessing' && action.origin === 'users#ping') {
        return state.set('pingInProgress', false);
    }

    if (action.type === 'endProcessing' && action.origin === 'users#ping') {
        return state.set('isLoggedIn', true).set('pingInProgress', false);
    }

    return state;
};
