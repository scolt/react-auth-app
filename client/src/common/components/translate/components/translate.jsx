import React from 'react';
import translation from '../actions/translation';

export default (props) => {
    return <span>{translation.translate(props.text)}</span>;
};
