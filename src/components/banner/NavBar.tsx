import React from 'react';
import '../styles/component-navbar.scss'
import {Button} from "semantic-ui-react";
import {ToggleBlogs} from "../DinnerClubContainerAdventures";

type Props = {
  handleClick: (value: ToggleBlogs) => void
}

export class NavBar extends React.Component<Props> {

  render() {
    return (
      <div className={'navbar'}>
        <div className={'bnavButtons'}>
        <Button className={'btn draw-border'} color={'teal'} onClick={() => this.props.handleClick(ToggleBlogs.BREAKKY_BLOG_LIST)}>
          Breakky Blogs
        </Button>
        <Button className={'btn draw-border'} color={'teal'} onClick={() => this.props.handleClick(ToggleBlogs.DINNER_BLOG_LIST)}>
          Dinner Dramas
        </Button>
        </div>
      </div>
    )
  }
}
