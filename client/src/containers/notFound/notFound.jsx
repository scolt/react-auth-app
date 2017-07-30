import React from 'react';
import {Message} from 'semantic-ui-react';
import styled from 'styled-components';

import Translate from '../../common/components/translate/translate';

const MessageWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
    max-width: 500px;
`;

export default () => <MessageWrapper><Message
    icon='binoculars'
    header={<Translate text="pages.404.header"/>}
    content={<Translate text="pages.404.text"/>}
/></MessageWrapper>;
