import React from 'react';
import '../styles/component-navbar.scss'
import moustache from '../styles/moustache.png'
import {Button} from "semantic-ui-react";

export class NavBar extends React.Component {

  render() {
    return (
      <div className={'navbar'}>
        <div className={'bnavButtons'}>
        <Button className={'btn draw-border'} color={'teal'}>
          Breakfast Blogs
        </Button>
        <Button className={'btn draw-border'} color={'teal'}>
          Dinner Dramas
        </Button>
        </div>
        <div className={'moustacheSpace'}>
          <img src={moustache} alt={''} className={'moustache'}/>
        </div>
      </div>
    )
  }
}
