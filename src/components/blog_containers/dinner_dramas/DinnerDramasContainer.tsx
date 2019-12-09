import React from 'react';
import '../../styles/component-blog-containers.scss'
import {Container, Image} from "semantic-ui-react";
import {EmpressOfChina, ILoveDumplings, Madaeya} from "../../services/DinnerDramaService";
import {Blog} from "../../Blog";
import {MalvenVale, TaoDumplings, ThaiToGo} from "../../DinnerBlogs/DinnerDramasListTwo";
import {BlogInfo} from "../../types/BlogInfo";

type State = {
  blogInfo: BlogInfo | null
}

type Props = {
  isBlogPicked: boolean
  handleIsBlogPicked: () => void
}

export class DinnerDramasContainer extends React.Component<Props, State> {

  state: State = {
    blogInfo: null
  }

  getBlogCards = () => {
    const dinnerDramas = [MalvenVale, ThaiToGo, TaoDumplings ,Madaeya, EmpressOfChina, ILoveDumplings]
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
        {!this.props.isBlogPicked ?  <Container className={'blogOptionContainer'}>
                                     {this.getBlogCards()}
                                     </Container>
                                    :  this.renderBlog()
        }
      </>
    )
  }
}
