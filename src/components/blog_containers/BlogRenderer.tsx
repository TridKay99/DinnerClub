import React from 'react';
import '../styles/component-banner.scss'
import {Home} from "../Home";
import {ToggleBlogs} from "../DinnerClubContainerAdventures";
import { BreakkyBlogContainer } from './breakky_blog/BreakkyBlogContainer';
import { DinnerDramasContainer } from './dinner_dramas/DinnerDramasContainer';

type Props = {
  pageToRender: ToggleBlogs
  handleClick: (value: ToggleBlogs) => void
  handleIsBlogPicked: () => void
  isBlogPicked: boolean
}

export class BlogRenderer extends React.Component<Props> {

  pageToRender = () => {
   const {pageToRender} = this.props
    if(pageToRender === ToggleBlogs.BREAKKY_BLOG_LIST) { return <BreakkyBlogContainer isBlogPicked={this.props.isBlogPicked} handleIsBlogPicked={this.props.handleIsBlogPicked}/>}
    else if(pageToRender === ToggleBlogs.DINNER_BLOG_LIST) { return <DinnerDramasContainer isBlogPicked={this.props.isBlogPicked} handleIsBlogPicked={this.props.handleIsBlogPicked}/>}
    return <Home />
  };

  render() {
    return (
      <>
        {this.pageToRender()}
      </>
    )
  }
}
