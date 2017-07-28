import React from 'react';
import translation from '../actions/translation';

export default (props) => {
    return <div>{translation.translate(props.text)}</div>
}
