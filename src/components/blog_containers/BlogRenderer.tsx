import React from 'react';
import '../styles/component-banner.scss'
import {Home} from "../Home";
import {ToggleBlogs} from "../DinnerClubContainerAdventures";
import { BreakkyBlogContainer } from './breakky_blog/BreakkyBlogContainer';
import { DinnerDramasContainer } from './dinner_dramas/DinnerDramasContainer';

type Props = {
  pageToRender: ToggleBlogs
}

export class BlogRenderer extends React.Component<Props> {

  pageToRender = () => {
   const {pageToRender} = this.props
    if(pageToRender === ToggleBlogs.BREAKKY) { return <BreakkyBlogContainer />}
    else if(pageToRender === ToggleBlogs.DINNER) { return <DinnerDramasContainer/>}
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
