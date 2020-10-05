import React from 'react';
import {Banner} from './banner/Banner';
import {NavBar} from "./banner/NavBar";
import {BlogRenderer} from "./blog_containers/BlogRenderer";
import './styles/component-container-container.scss'

export enum DisplayToggle {
  BREAKKY_BLOG_LIST = 'breakky',
  DINNER_BLOG_LIST = 'dinner',
  ADMIN_LOGIN = 'admin_login',
  NEW_BLOG = 'new_blog',
  HOME = 'home'
}

type State = {
  pageToRender: DisplayToggle
  isBlogPicked: boolean
}

export class DinnerClubContainerAdventures extends React.Component<{}, State> {

  state: State = {
    pageToRender: DisplayToggle.HOME,
    isBlogPicked: false
  };

  handleClick = (value: DisplayToggle) => {
    this.setState({pageToRender: value, isBlogPicked: false})
  };

  handleIsBlogPicked = () => {
    this.setState({ isBlogPicked: true})
  };

  render() {
    console.log(this.state.pageToRender);
    return (
      <div className={'container'}>
        <Banner handleClick={this.handleClick}/>
        <br/>
        <br/>
        <NavBar handleClick={this.handleClick}/>
        <BlogRenderer pageToRender={this.state.pageToRender}
                      handleClick={this.handleClick}
                      handleIsBlogPicked={this.handleIsBlogPicked}
                      isBlogPicked={this.state.isBlogPicked}/>
      </div>
    )
  }
}
