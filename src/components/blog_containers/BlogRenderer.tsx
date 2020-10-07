import React from 'react';
import '../styles/component-banner.scss';
import {Home} from "../Home";
import {DisplayToggle} from "../DinnerClubContainerAdventures";
import {BreakkyBlogContainer} from './breakky_blog/BreakkyBlogContainer';
import {DinnerDramasContainer} from './dinner_dramas/DinnerDramasContainer';
import {NewBlog} from "../NewBlog";
import {AdminLogin} from "../AdminLogin"

type Props = {
  pageToRender: DisplayToggle
  handleClick: (value: DisplayToggle) => void
  handleIsBlogPicked: () => void
  isBlogPicked: boolean
}

export class BlogRenderer extends React.Component<Props> {

  pageToRender = () => {
    const {pageToRender} = this.props;

    switch(pageToRender) {
      case DisplayToggle.ADMIN_LOGIN: return <AdminLogin handleClick={this.props.handleClick}
                                                         pageToRender={this.props.pageToRender}/>;
      case DisplayToggle.NEW_BLOG: return <NewBlog handleClick={this.props.handleClick}
                                                   pageToRender={this.props.pageToRender}/>;
      case DisplayToggle.DINNER_BLOG_LIST: return <DinnerDramasContainer isBlogPicked={this.props.isBlogPicked}
                                                                         handleIsBlogPicked={this.props.handleIsBlogPicked}/>;
      case DisplayToggle.BREAKKY_BLOG_LIST: return <BreakkyBlogContainer isBlogPicked={this.props.isBlogPicked}
                                                                         handleIsBlogPicked={this.props.handleIsBlogPicked}/>;
      default: return <Home/>
    }
  };

  render() {
    return (
      <React.Fragment>
        {this.pageToRender()}
        <br/>
        <br/>
      </React.Fragment>
    )
  }
}
