import React from 'react';
import './styles/component-blog.scss'
import { Container } from 'semantic-ui-react';
import {BlogInfo} from "./types/BlogInfo";

type Props = {
  blog: BlogInfo
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
            <p>{blog.restaurant}</p>
          </div>
          <p dangerouslySetInnerHTML={{ __html: `${blog.body}` }} />
        </div>
      </Container>
    )
  }
}
