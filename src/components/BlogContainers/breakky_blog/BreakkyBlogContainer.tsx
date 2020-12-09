import React from 'react';
import '../../styles/component-blog-containers.scss'
import {Container, Image} from 'semantic-ui-react';
import {BeansRepublique, Darling, MrFoxx} from "../../services/BreakkyBlogs/BreakkyBlogService";
import {Blog} from "../../Blog";
import {MobyDick} from "../../services/BreakkyBlogs/BreakkyBlogListTwo";
import {BlogInfo} from "../../../Types/BlogInfo";

type State = {
  blogInfo: BlogInfo | null
}

type Props = {
  isBlogPicked: boolean
  handleIsBlogPicked: () => void
}

export class BreakkyBlogContainer extends React.Component<Props, State> {

  state: State = {
    blogInfo: null
  }

  getBlogCards = () => {
    const arrow = '>'
    const breakkyBlogs = [MobyDick, Darling, BeansRepublique, MrFoxx]
    return breakkyBlogs.map((blog) => {
      return (
        <div className={'blogContent'}>
          <Image src={blog.img} className={'blogImage'}/>
          {blog.title}
          <button className={'btn draw-border blogArrowIcon'}
                  onClick={() => this.handleBlogChange(blog)}>
            {arrow}
          </button>
        </div>
      )
    })
  };

  handleBlogChange = (value: BlogInfo) => {
    this.setState({blogInfo: value}, () => this.props.handleIsBlogPicked())
  }

  renderBlog = () => {
    const {blogInfo} = this.state
    if(blogInfo) {
      return (
        <Blog blog={blogInfo}/>
      )
    }
  }

  render() {
    return (
      <>
      {!this.props.isBlogPicked ? <Container className={'blogOptionContainer'}>
                                  {this.getBlogCards()}
                                  </Container>
                                :
                                  this.renderBlog()
                                  }
      </>
    )
  }
}
