import React from 'react';
import {Banner} from './Banner/Banner';
import {NavBar} from "./Banner/NavBar";
import './styles/component-container-container.scss'
import {AdminLogin} from "./AdminLogin"
import {MaintainBlogs} from "./MaintainBlogs/MaintainBlogs"
import {DinnerDramasContainer} from "./BlogContainers/dinner_dramas/DinnerDramasContainer"
import {BreakkyBlogContainer} from "./BlogContainers/breakky_blog/BreakkyBlogContainer"
import {Home} from "./Home"
import {DisplayToggle} from "../Enums/DisplayToggle"
import {BreakkyBlogContainerNew} from "../Services/BreakkyBlogContainerNew"

type State = {
  pageToRender: DisplayToggle
  isBlogPicked: boolean
  removeMainBlogButtons: boolean
}

export class DinnerClubContainerAdventures extends React.Component<{}, State> {

  state: State = {
    pageToRender: DisplayToggle.HOME,
    isBlogPicked: false,
    removeMainBlogButtons: false
  };

  componentDidMount = () => {

  }

  componentDidUpdate = () => {
    if((this.state.pageToRender === DisplayToggle.ADMIN_LOGIN
      || this.state.pageToRender === DisplayToggle.MAINTAIN_BLOGS
      || this.state.pageToRender === DisplayToggle.NEW_BLOG)
      && !this.state.removeMainBlogButtons) {
      this.setState({removeMainBlogButtons: true})
    }

    if((this.state.pageToRender === DisplayToggle.HOME
      || this.state.pageToRender === DisplayToggle.BREAKKY_BLOG_LIST
      || this.state.pageToRender === DisplayToggle.DINNER_BLOG_LIST)
      && this.state.removeMainBlogButtons) {
      this.setState({removeMainBlogButtons: false})
    }
  }

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
      case DisplayToggle.BREAKKY_BLOG_LIST: return <BreakkyBlogContainerNew isBlogPicked={this.state.isBlogPicked}
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
        {!this.state.removeMainBlogButtons &&
          <NavBar handleClick={this.handleClick} removeMainBlogButtons={this.state.removeMainBlogButtons}/>
        }
        {this.pageToRender()}
      </div>
    )
  }
}
