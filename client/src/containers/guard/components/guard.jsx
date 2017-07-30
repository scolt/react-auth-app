import React from 'react';

export default class Login extends React.Component {
    componentWillMount() {
        this.props.ping();
    }

    render() {
        if (this.props.pingInProgress) {
            return this.props.loadingIndicator;
        }

        if (this.props.isLoggedIn) {
            return this.props.authorizedContent;
        }

        return this.props.unathorizedContent;
    }
}
