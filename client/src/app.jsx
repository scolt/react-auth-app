import './index.html';
import 'semantic-ui-css/semantic.min.css';
import 'semantic-ui-css/themes/default/assets/fonts/icons.ttf';
import 'semantic-ui-css/themes/default/assets/fonts/icons.woff';
import 'semantic-ui-css/themes/default/assets/fonts/icons.woff2';
import 'semantic-ui-css/themes/default/assets/images/flags.png';
import 'whatwg-fetch';
import './common/theme/assets/logo.png';

import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {render} from 'react-dom';

import thunk from 'redux-thunk';
import reducers from './common/reducers/reducers.js';

import Login from './containers/login/login';
import List from './containers/list/list';
import Guard from './containers/guard/guard';
import Landing from './containers/landing/landing';
import NotFound from './containers/notFound/notFound';

import Loading from './common/components/loadingIndicator';

const store = createStore(
    reducers,
    applyMiddleware(thunk)
);

const App = () => (
    <Provider store={store}>
        <Guard
            loadingIndicator={<Loading />}
            unathorizedContent={
                <Router>
                    <Switch>
                        <Route exact path="/" component={Landing}/>
                        <Route exact path="/login" component={Login}/>
                        <Route path="*" component={NotFound}/>
                    </Switch>
                </Router>
            }
            authorizedContent={
                <Router>
                    <Switch>
                        <Route exact path="/" component={List}/>
                        <Route path="*" component={NotFound}/>
                    </Switch>
                </Router>
            }
        />
    </Provider>
);

export default render(
    <App />,
    document.getElementById('app')
);
