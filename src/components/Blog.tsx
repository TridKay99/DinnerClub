import React from 'react';
import './styles/component-blog.scss'
import {BreakkyBlog, DinnerDrama, isBreakkyBlog} from "../Types/BlogTypes"

type Props = {
  blog: BreakkyBlog | DinnerDrama
}

export class Blog extends React.Component<Props> {

  render() {
    const { blog } = this.props

    return (
      <div className={'blogContainer'}>
        <div className={'blog'}>
          <div className={'blogTitle'}>
            <p>{blog.title}</p>
          </div>
          <div className={'blogRestaurant'}>
            {isBreakkyBlog(blog)
              ? <p>{blog.cafe}</p>
              : <p>{blog.restaurant}</p>
            }
          </div>
          <p dangerouslySetInnerHTML={{ __html: `${blog.blogText}` }}/>
        </div>
      </div>
    )
  }
}
