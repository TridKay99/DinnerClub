import React from 'react';
import './styles/component-blog.scss'
import { Container } from 'semantic-ui-react';
import {BreakkyBlog} from "../Types/BlogTypes"

type Props = {
  blog: BreakkyBlog
}

export class Blog extends React.Component<Props> {


  render() {
    const { blog } = this.props

    return (
      <Container className={'blogContainer'}>
        <div className={'blog'}>
          <div className={'blogTitle'}>
            <p>{blog.title}</p>
          </div>
          <div className={'blogRestaurant'}>
            <p>{blog.cafe}</p>
          </div>
          <p dangerouslySetInnerHTML={{ __html: `${blog.blogText}` }} />
        </div>
      </Container>
    )
  }
}
