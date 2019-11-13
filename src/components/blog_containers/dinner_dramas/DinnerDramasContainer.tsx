import React from 'react';
import '../../styles/component-blog-containers.scss'
import {Container, Image} from "semantic-ui-react";
import {BlogInfo, ILoveDumplings} from "../../services/DinnerDramaService";
import {Blog} from "../../Blog";

type State = {
  isBlogPicked: boolean
  blogInfo: BlogInfo | null
}

export class DinnerDramasContainer extends React.Component {

  state: State = {
    isBlogPicked: false,
    blogInfo: null
  }

  getBlogCards = () => {
    const dinnerDramas = [ILoveDumplings]
    return dinnerDramas.map((blog) => {
      return (
        <div className={'blogContent'}>
          <Image src={blog.img} className={'blogImage'}/>
          {blog.title}
          <button className={'btn draw-border blogArrowIcon'} onClick={() => this.handleBlogChange(blog)}>
            >
          </button>
        </div>
      )
    })
  };

  handleBlogChange = (value: BlogInfo) => {
    this.setState({blogInfo: value, isBlogPicked: true})
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
        {!this.state.isBlogPicked ?  <Container className={'blogOptionContainer'}>
                                     {this.getBlogCards()}
                                     </Container>
                                  :  this.renderBlog()
        }
      </>
    )
  }
}
