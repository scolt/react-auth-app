import React from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Container,
    Header,
    Icon
} from 'semantic-ui-react';
import styled from 'styled-components';

import HeaderMain from '../../common/components/header-main/header';

const AppName = styled.h1`
    font-size: 3em !important;
    font-weight: normal !important;
    margin-bottom: 2em !important;
    margin-top: 2em !important;
`;

const HeaderSection = styled.div`
    text-align: center;
    background-image: url("https://ak3.picdn.net/shutterstock/videos/11237060/thumb/1.jpg");
    height: 480px;
`;

export default () => <div>
    <HeaderSection>
        <HeaderMain />
        <Container text>
            <Header
                as={AppName}
                content='React oAuth App'
                inverted
            />
            <Link to='/login'>
                <Button as="span"  size='huge'>
                    Get Started
                    <Icon name='right arrow'/>
                </Button>
            </Link>
        </Container>
    </HeaderSection>
</div>;
