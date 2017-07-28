import React from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Container,
    Header,
    Icon,
    Grid,
    Image
} from 'semantic-ui-react';
import styled from 'styled-components';

import HeaderMain from '../../common/components/header-main/header';

const AppName = styled.h1`
    font-size: 3em !important;
    font-weight: normal !important;
    margin-bottom: 1em !important;
    padding: .25em .5em !important;
    background: rgba(33, 133, 208, 0.58);
    margin-top: 2em !important;
    display: inline-block;
`;

const HeaderSection = styled.div`
    text-align: center;
    background-image: url("https://cdn1.tnwcdn.com/wp-content/blogs.dir/1/files/2015/06/webdesign.jpg");
    height: 480px;
`;

const MiddleSection = styled.div`
    padding: 5em 0;  
`;

const Text = styled.p`
    font-size: 1.33rem
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
            <br />
            <Link to='/login'>
                <Button as='span' color='blue' size='huge'>
                    Get Started
                    <Icon name='right arrow'/>
                </Button>
            </Link>
        </Container>
    </HeaderSection>
    <MiddleSection>
        <Grid container stackable verticalAlign='middle'>
            <Grid.Row>
                <Grid.Column width={8}>
                    <Header as='h3'>This is app without idea</Header>
                    <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dolor augue, vulputate id lectus vel, malesuada malesuada velit.
                    </Text>
                    <Header as='h3'>We Make Bananas That Can Dance</Header>
                    <Text>
                        Cras eu odio vel turpis fringilla imperdiet molestie in velit. Integer ac fermentum nunc, vitae consectetur sem. Donec semper elit risus, eget mollis felis suscipit vel. Etiam viverra laoreet tortor, vitae porta dui. Aliquam sed lectus quis est mollis egestas quis sed augue. Integer eleifend massa vitae sollicitudin elementum. Cras varius sollicitudin neque non convallis.
                    </Text>
                </Grid.Column>
                <Grid.Column floated='right' width={6}>
                    <Image
                        size='medium'
                        src='https://www.gitbook.com/cover/book/mongkuen/react.jpg?build=1470682429235'
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </MiddleSection>
    <MiddleSection>
        <Grid container celled='internally' columns='equal' stackable>
            <Grid.Row textAlign='center'>
                <Grid.Column>
                    <Header as='h3'>"What a Backend"</Header>
                    <Text>That is what they all say about us: NodeJS and MySQL</Text>
                </Grid.Column>
                <Grid.Column>
                    <Header as='h3'>"I shouldn't have gone with their competitor."</Header>
                    <Text>
                        <b>Nan</b> Chief Fun Officer Acme Toys
                    </Text>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </MiddleSection>
    <MiddleSection>
        <Container>
            <Header as='h3'>Breaking The Grid, Grabs Your Attention</Header>
            <Text>
                Instead of focusing on content creation and hard work, we have learned how to master the art of doing
                nothing by providing massive amounts of whitespace and generic content that can seem massive, monolithic
                and worth your attention.
            </Text>
            <Button as='a' size='large'>Read More</Button>
        </Container>
    </MiddleSection>
</div>;
