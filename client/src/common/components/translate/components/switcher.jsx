import React from 'react';
import {Flag} from 'semantic-ui-react';
import styled from 'styled-components';

const Switcher = styled.span`
    > *:hover {
        cursor: pointer;
    }
`;

export default (props) => {
    return <Switcher className="item">
        <Flag name='us' onClick={() => props.onChangeClick('en')}/>
        <Flag name='ru' onClick={() => props.onChangeClick('ru')}/>
    </Switcher>;
};
