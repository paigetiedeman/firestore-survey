import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react'


export default class Header extends Component {

  state = { activeItem: 'home' }
  
  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }
  
  render(){
  
    const { activeItem } = this.state
    

      return (
        <Menu secondary>
        <Menu.Item 
          name='Survey'
          className='title'
          />
        <Menu.Item
          as={Link} to="/"
          name='home'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
          />
        <Menu.Item
          as={Link} to="/signInControl"
          name='signInControl'
          active={activeItem === 'signInControl'}
          onClick={this.handleItemClick}
          />
      </Menu>
      )
    }
  }