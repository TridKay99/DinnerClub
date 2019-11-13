import React from 'react';
import { Banner } from './banner/Banner';
import {Container} from "semantic-ui-react";
import {NavBar} from "./banner/NavBar";
import {BlogRenderer} from "./blog_containers/BlogRenderer";

export enum ToggleBlogs {
  BREAKKY = 'breakky',
  DINNER = 'dinner',
  HOME = 'home'
}

type State = {
  pageToRender: ToggleBlogs
}

export class DinnerClubContainer extends React.Component {

  state: State = {
    pageToRender: ToggleBlogs.HOME
  }

  handleClick = (value: ToggleBlogs) => {
    this.setState({pageToRender: value})
  };

  render() {
    return (
      <Container>
        <Banner handleClick={this.handleClick}/>
        <NavBar handleClick={this.handleClick}/>
        <BlogRenderer pageToRender={this.state.pageToRender}/>
      </Container>
    )
  }
}
