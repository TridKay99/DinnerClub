import React from 'react'
import {MaintainBlogsToggle} from "./MaintainBlogs"
import {DinnerDrama} from "../../Types/BlogTypes"
import {Button, Card} from "semantic-ui-react"
import {BlogForm, BlogType} from "../BlogForm"
import {BreakkyBlogsServiceNew} from "../../Services/BreakkyBlogsServicesNew"
import '../styles/component-maintain-blogs.scss'
import {DisplayToggle} from "../../Enums/DisplayToggle"
import {DinnerDramaServiceNew} from "../../Services/DinnerDramaServiceNew"

type Props = {
  maintainToggle: MaintainBlogsToggle
  changeMaintainToggle: (maintainToggle: MaintainBlogsToggle) => void
  dinnerDramas: DinnerDrama[]
  handleClick: (value: DisplayToggle) => void
}

type State = {
  selectedBlog: DinnerDrama | null
}

export class MaintainDinnerDramas extends React.Component<Props, State> {

  state: State = {
    selectedBlog: null
  }

  componentDidMount = () => {
    if(this.props.maintainToggle === MaintainBlogsToggle.CREATE) {
      this.props.changeMaintainToggle(MaintainBlogsToggle.MAINTAIN)
    }
  }

  handleEditClick = (blog: DinnerDrama) => {
    this.setState({selectedBlog: blog})
    this.props.changeMaintainToggle(MaintainBlogsToggle.UPDATE)
  }

  renderBlogRow = () => {
    return this.props.dinnerDramas.map((blog) => {
      return (
        <Card>
          <Card.Content>
            <Card.Header>{blog.title}</Card.Header>
            <Card.Description>
              {blog.restaurant},
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

  deleteBlog = async(blog: DinnerDrama) => {
    if(blog._id) {
      await DinnerDramaServiceNew.delete(blog._id)
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
                    blogVariety={BlogType.DINNER}/>
        </React.Fragment>
        }
        {this.props.maintainToggle === MaintainBlogsToggle.UPDATE &&
          <BlogForm handleClick={this.props.handleClick}
                    changeMaintainToggle={this.props.changeMaintainToggle}
                    blog={this.state.selectedBlog}
                    blogVariety={BlogType.DINNER}/>
        }
      </React.Fragment>
    )
  }
}
