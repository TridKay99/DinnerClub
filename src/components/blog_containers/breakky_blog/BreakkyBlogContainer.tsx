import React from 'react';
import '../../styles/component-blog-containers.scss'

export class BreakkyBlogContainer extends React.Component {

  getBlogTiles = () => {
    return ''
  }

  render() {

    return (
      <div className={'blogContainer'}>
        {this.getBlogTiles()}
      </div>
    )
  }
}
