import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Divider } from 'semantic-ui-react'

const activeStyle = {
  fontWeight: 'bold',
  textDecoration: 'underline'
};

const Nav = () => (
    <div>
      <Menu>
        <Menu.Item
          name='messages'
          as='div'
        >
          <NavLink activeStyle={activeStyle} to="/messages">Messages</NavLink>
        </Menu.Item>

        <Menu.Item
          name='about'
          as='div'
        >
          <NavLink activeStyle={activeStyle} to="/about">About</NavLink>
        </Menu.Item>
      </Menu>
    </div>
);

export default Nav;