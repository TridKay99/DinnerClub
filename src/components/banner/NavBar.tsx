import React from 'react';
import '../styles/component-navbar.scss'
import moustache from '../styles/moustache.png'
import {Button} from "semantic-ui-react";
import instagram from "../styles/instagram.png";
import {ToggleBlogs} from "../DinnerClubContainer";

type Props = {
  handleClick: (value: ToggleBlogs) => any
}

export class NavBar extends React.Component<Props> {

  render() {
    return (
      <div className={'navbar'}>
        <div className={'bnavButtons'}>
        <Button className={'btn draw-border'} color={'teal'} onClick={() => this.props.handleClick(ToggleBlogs.BREAKKY)}>
          Breakky Blogs
        </Button>
        <Button className={'btn draw-border'} color={'teal'} onClick={() => this.props.handleClick(ToggleBlogs.DINNER)}>
          Dinner Dramas
        </Button>
        </div>
        <div className={'instagram'}>
          <a href={'https://www.instagram.com/dinner_club_adventures/?hl=en'} target="_blank">
            <img src={instagram} alt={''} className={'instagram'}/>
          </a>
        </div>
        <div className={'moustacheSpace'}>
          <img src={moustache} alt={''} className={'moustache'}/>
        </div>
      </div>
    )
  }
}
