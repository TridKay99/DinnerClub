import React from 'react';
import {Banner} from './Banner/Banner';
import {NavBar} from "./Banner/NavBar";
import './styles/component-container-container.scss'
import {AdminLogin} from "./AdminLogin"
import {MaintainBlogs} from "./MaintainBlogs/MaintainBlogs"
import {DinnerDramasContainer} from "./BlogContainers/dinner_dramas/DinnerDramasContainer"
import {BreakkyBlogContainer} from "./BlogContainers/breakky_blog/BreakkyBlogContainer"
import {Home} from "./Home"

export enum DisplayToggle {
  BREAKKY_BLOG_LIST = 'breakky',
  DINNER_BLOG_LIST = 'dinner',
  ADMIN_LOGIN = 'admin_login',
  MAINTAIN_BLOGS = 'MAINTAIN_BLOGS',
  NEW_BLOG = 'new_blog',
  HOME = 'home'
}

type State = {
  pageToRender: DisplayToggle
  isBlogPicked: boolean
}

export class DinnerClubContainerAdventures extends React.Component<{}, State> {

  state: State = {
    pageToRender: DisplayToggle.ADMIN_LOGIN,
    isBlogPicked: false
  };

  handleClick = (value: DisplayToggle) => {
    this.setState({pageToRender: value, isBlogPicked: false})
  };

  handleIsBlogPicked = () => {
    this.setState({ isBlogPicked: true})
  };

  pageToRender = () => {
    const {pageToRender} = this.state;

    switch(pageToRender) {
      case DisplayToggle.ADMIN_LOGIN: return <AdminLogin handleClick={this.handleClick}
                                                         pageToRender={DisplayToggle.ADMIN_LOGIN}/>;
      case DisplayToggle.MAINTAIN_BLOGS: return <MaintainBlogs handleClick={this.handleClick}
                                                               pageToRender={DisplayToggle.ADMIN_LOGIN}/>
      case DisplayToggle.DINNER_BLOG_LIST: return <DinnerDramasContainer isBlogPicked={this.state.isBlogPicked}
                                                                         handleIsBlogPicked={this.handleIsBlogPicked}/>;
      case DisplayToggle.BREAKKY_BLOG_LIST: return <BreakkyBlogContainer isBlogPicked={this.state.isBlogPicked}
                                                                         handleIsBlogPicked={this.handleIsBlogPicked}/>;
      default: return <Home/>
    }
  };

  render() {
    return (
      <div className={'container'}>
        <Banner handleClick={this.handleClick}/>
        <br/>
        <br/>
        <NavBar handleClick={this.handleClick}/>
        {this.pageToRender()}
      </div>
    )
  }
}
