import React from 'react';
import '../../styles/component-blog-containers.scss'
import {Container, Image} from 'semantic-ui-react';
import {BeansRepublique, MrFoxx} from "../../services/BreakkyBlogService";

export class BreakkyBlogContainer extends React.Component {

  getBlogCards = () => {
    const breakkyBlods = [BeansRepublique, MrFoxx]
    return breakkyBlods.map((blog) => {
      return (
        <div className={'blogContent'}>
          <Image src={blog.img} className={'blogImage'}/>
          {blog.title}
          <button className={'btn draw-border blogArrowIcon'}>
            >
          </button>
        </div>
      )
    })
  };

  render() {
    return (
      <Container className={'blogOptionContainer'}>
        {this.getBlogCards()}
      </Container>
    )
  }
}
