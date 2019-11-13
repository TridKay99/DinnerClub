import React from 'react';
import './styles/component-blog.scss'
import {BlogInfo} from "./blog1Trial";

type Props = {
  blog: BlogInfo
}

export class Blog extends React.Component<Props> {

  render() {
    const { blog } = this.props

    return (
      <div className={'blog'}>
        <p>{blog.title}</p>
        <p dangerouslySetInnerHTML={{ __html: `${blog.body}` }} />
      </div>
    )
  }
}
