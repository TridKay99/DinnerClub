import React from 'react';
import './styles/component-blog.scss'
import {BlogInfo} from "./services/DinnerDramaService";
import { Container } from 'semantic-ui-react';

type Props = {
  blog: BlogInfo
}

export class Blog extends React.Component<Props> {


  render() {
    const { blog } = this.props

    return (
      <Container className={'blogContainer'}>
        <div className={'blog'}>
          <p>{blog.title}</p>
          <p dangerouslySetInnerHTML={{ __html: `${blog.body}` }} />
        </div>
      </Container>
    )
  }
}
