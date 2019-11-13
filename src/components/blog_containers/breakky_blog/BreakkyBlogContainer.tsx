import React from 'react';
import '../../styles/component-blog-containers.scss'
import {Blog1, Blog2} from "../../blog1Trial";

export class BreakkyBlogContainer extends React.Component {

  getBlogTiles = () => {
    const blog = Blog1
    const blog2 = Blog2
    const blogs = [Blog1, Blog2]

    return blogs.map((blog) => {
      return (
        <div className="card">
          <h3 className="title">{blog.title}</h3>
          <img src={blog.image} alt={''}/>
        </div>
      )
    })
  };

  render() {

    return (
      <div className="blogContainer">
        {this.getBlogTiles()}
      </div>
    )
  }
}
