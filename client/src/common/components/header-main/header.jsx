import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
    Container,
    Menu,
    Button
} from 'semantic-ui-react';

import Translate from '../translate/translate';
import Switcher from '../translate/switcher';

export default () =>
    <Menu inverted pointing secondary size='large'>
        <Menu.Item as={NavLink} to='/' activeClassName='active'>{<Translate text='header.home' />}</Menu.Item>
        <Menu.Item as={NavLink} to='/faq' activeClassName='active'>{<Translate text='header.faq' />}</Menu.Item>
        <Menu.Item as={Link} to='/login' position='right'>
            <Button as='span' inverted >{<Translate text='header.login' />}</Button>
        </Menu.Item>
        <Menu.Item as={Switcher} position='right'/>
    </Menu>;
