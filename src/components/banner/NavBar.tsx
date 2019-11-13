import React from 'react';
import '../styles/component-navbar.scss'
import {Button} from "semantic-ui-react";
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
      </div>
    )
  }
}
