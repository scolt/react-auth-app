import React from 'react';
import styled from 'styled-components';
import { Button, Icon, Header, Segment, Image } from 'semantic-ui-react';

import theme from '../../../common/theme/basic';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background: ${theme.primaryGray};
`;

const Block = styled.div`
    width: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
`;

export default class Login extends React.Component {
    render() {
        return <Wrapper>
            <Block>
                <Header as='h2' color='teal' textAlign='center'>
                    <Image src='/themes/default/assets/images/logo.png' alt="react oauth"/>
                    {' '}React App
                </Header>
                <Segment size="large" >
                    <Button color='vk' size='large' fluid href="https://roauth.herokuapp.com/auth/vk/heroku">
                        <Icon name='vk'/> VK
                    </Button>
                </Segment>
            </Block>
        </Wrapper>;
    }
}