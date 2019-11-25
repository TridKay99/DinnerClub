import React from 'react';
import { Banner } from './banner/Banner';
import {Container} from "semantic-ui-react";
import {NavBar} from "./banner/NavBar";
import {BlogRenderer} from "./blog_containers/BlogRenderer";

export enum ToggleBlogs {
  BREAKKY_BLOG_LIST = 'breakky',
  DINNER_BLOG_LIST = 'dinner',
  HOME = 'home'
}

type State = {
  pageToRender: ToggleBlogs
  isBlogPicked: boolean
}

export class DinnerClubContainerAdventures extends React.Component {

  state: State = {
    pageToRender: ToggleBlogs.HOME,
    isBlogPicked: false
  }

  handleClick = (value: ToggleBlogs) => {
    this.setState({pageToRender: value, isBlogPicked: false})
  };

  handleIsBlogPicked = () => {
    this.setState({ isBlogPicked: true})
  }

  render() {

    return (
      <Container>
        <Banner handleClick={this.handleClick} />
        <NavBar handleClick={this.handleClick} />
        <BlogRenderer pageToRender={this.state.pageToRender}
                      handleClick={this.handleClick}
                      handleIsBlogPicked={this.handleIsBlogPicked}
                      isBlogPicked={this.state.isBlogPicked}/>
      </Container>
    )
  }
}
