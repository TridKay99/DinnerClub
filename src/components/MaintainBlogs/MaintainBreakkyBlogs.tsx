import React from 'react'
import {Button, Card} from "semantic-ui-react"
import {MaintainBlogsToggle} from "./MaintainBlogs"
import {BreakkyBlog} from "../../Types/BlogTypes"
import {BreakkyBlogsServiceNew} from "../../Services/BreakkyBlogsServicesNew"
import {BlogForm, BlogType} from "../BlogForm"
import {DisplayToggle} from "../../Enums/DisplayToggle"

type Props = {
  maintainToggle: MaintainBlogsToggle
  changeMaintainToggle: (maintainToggle: MaintainBlogsToggle) => void
  breakkyBlogs: BreakkyBlog[]
  handleClick: (value: DisplayToggle) => void
}

type State = {
  selectedBlog: BreakkyBlog | null
}

export class MaintainBreakkyBlogs extends React.Component<Props, State> {

  state: State = {
    selectedBlog: null
  }

  componentDidMount = () => {
    if (this.props.maintainToggle === MaintainBlogsToggle.CREATE) {
      this.props.changeMaintainToggle(MaintainBlogsToggle.MAINTAIN)
    }
  }

  handleEditClick = (blog: BreakkyBlog) => {
    this.setState({selectedBlog: blog})
    this.props.changeMaintainToggle(MaintainBlogsToggle.UPDATE)
  }

  renderBlogRow = () => {
    return this.props.breakkyBlogs.map((blog) => {
      return (
        <Card>
          <Card.Content>
            <Card.Header>{blog.title}</Card.Header>
            <Card.Description>
              {blog.cafe},
            </Card.Description>
            <Card.Description>
              {blog.location}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button basic
                      color='blue'
                      onClick={() => this.handleEditClick(blog)}>
                Edit
              </Button>
              <Button basic
                      color='red'
                      onClick={() => this.deleteBlog(blog)}>
                Delete
              </Button>
            </div>
          </Card.Content>
        </Card>
      )
    })
  }

  deleteBlog = async (blog: BreakkyBlog) => {
    if (blog._id) {
      await BreakkyBlogsServiceNew.delete(blog._id)
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.props.maintainToggle === MaintainBlogsToggle.MAINTAIN &&
        <React.Fragment>
          <Button basic
                  color={'green'}
                  icon={'plus'}
                  onClick={() => this.props.changeMaintainToggle(MaintainBlogsToggle.CREATE)}
                  content={'New Blog'}/>
          <br/>
          <br/>
          <Card.Group>
            {this.renderBlogRow()}
          </Card.Group>
        </React.Fragment>
        }
        {this.props.maintainToggle === MaintainBlogsToggle.CREATE &&
        <React.Fragment>
          <BlogForm handleClick={this.props.handleClick}
                    blog={null}
                    changeMaintainToggle={this.props.changeMaintainToggle}
                    blogVariety={BlogType.BREAKKY}
          />
        </React.Fragment>
        }
        {this.props.maintainToggle === MaintainBlogsToggle.UPDATE &&
        <BlogForm handleClick={this.props.handleClick}
                  changeMaintainToggle={this.props.changeMaintainToggle}
                  blog={this.state.selectedBlog}
                  blogVariety={BlogType.BREAKKY}
        />
        }
      </React.Fragment>
    )
  }
}
