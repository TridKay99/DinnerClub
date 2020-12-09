import React from 'react';
import '../../styles/component-blog-containers.scss'
import {Button, Container, Image} from "semantic-ui-react"
import {EmpressOfChina, ILoveDumplings, Madaeya} from "../../services/DinnerBlogs/DinnerDramaService";
import {Blog} from "../../Blog";
import {
  MalvenVale,
  ReturnOfTheTao,
  SubiQKoreanBBQ,
  TaoDumplings,
  ThaiToGo,
  dragonDumplingHouse, vietStar
} from "../../services/DinnerBlogs/DinnerDramasListTwo";
import {BlogInfo} from "../../../Types/BlogInfo";

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
  };

  getBlogCards = () => {
    const arrow = '>'
    const dinnerDramas = [vietStar, dragonDumplingHouse, ReturnOfTheTao, SubiQKoreanBBQ, MalvenVale, ThaiToGo, TaoDumplings ,Madaeya, EmpressOfChina, ILoveDumplings];
    return dinnerDramas.map((blog, index) => {
      return (
        <React.Fragment>
        <div className={'blogContent'} key={index}>
          <Image src={blog.img} className={'blogImage'} key={index}/>
          {blog.title}
          <Button className={'btn draw-border blogArrowIcon'}
                  color={"teal"}
                  onClick={() => this.handleBlogChange(blog)}
                  key={index}>
            {arrow}
          </Button>
        </div>
        </React.Fragment>
      )
    })
  };

  handleBlogChange = (value: BlogInfo) => {
    this.setState({blogInfo: value}, () => this.props.handleIsBlogPicked())
  };

  renderBlog = () => {
    const {blogInfo} = this.state;
    if(blogInfo) {
      return (
        <Blog blog={blogInfo}/>
      )
    }
  };

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
