import React from 'react';
import '../../styles/component-blog-containers.scss'
import {Container, Image} from "semantic-ui-react";
import {ILoveDumplings} from "../../services/DinnerDramaService";

export class DinnerDramasContainer extends React.Component {

  getBlogCards = () => {
    const dinnerDramas = [ILoveDumplings]
    return dinnerDramas.map((blog) => {
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
