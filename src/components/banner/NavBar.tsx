import React from 'react';
import '../styles/component-navbar.scss'
import {Button} from "semantic-ui-react";
import {DisplayToggle} from "../../Enums/DisplayToggle"

type Props = {
  handleClick: (value: DisplayToggle) => void
  removeMainBlogButtons: boolean
}

export class NavBar extends React.Component<Props> {

  render() {
    return (
      <div className={'navbar'}>
        <div className={'bnavButtons'}>
          <Button className={'btn draw-border'} color={'teal'}
                  onClick={() => this.props.handleClick(DisplayToggle.BREAKKY_BLOG_LIST)}>
            Breakky Blogs
          </Button>
          < Button className={'btn draw-border'} color={'teal'} onClick={() => this.props.handleClick(DisplayToggle.DINNER_BLOG_LIST)}>
          Dinner Dramas
          </Button>
        </div>
      </div>
    )
  }
}
