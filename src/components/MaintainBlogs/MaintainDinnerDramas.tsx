import React from 'react'
import {MaintainBlogsToggle} from "./MaintainBlogs"
import {DinnerDrama} from "../../Types/BreakkyBlog"
import {DisplayToggle} from "../DinnerClubContainerAdventures"
import {Button, Card} from "semantic-ui-react"
import {BlogForm} from "../BlogForm"
import {BreakkyBlogsServiceNew} from "../../Services/BreakkyBlogsServicesNew"
import '../styles/component-maintain-blogs.scss'

type Props = {
  maintainToggle: MaintainBlogsToggle
  changeMaintainToggle: (maintainToggle: MaintainBlogsToggle) => void
  dinnerDramas: DinnerDrama[]
  handleClick: (value: DisplayToggle) => void
}

export class MaintainDinnerDramas extends React.Component<Props> {

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
                      onClick={() => this.setState({
                        maintainToggle: MaintainBlogsToggle.UPDATE,
                        selectedBlog: blog
                      })}>
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
          />
        </React.Fragment>
        }
        {/*{this.state.maintainToggle === MaintainBlogsToggle.UPDATE &&*/}
        {/*<React.Fragment>*/}
        {/*  <BlogForm handleClick={this.props.handleClick}*/}
        {/*            pageToRender={DisplayToggle.ADMIN_LOGIN}*/}
        {/*            blog={this.state.selectedBlog}/>*/}
        {/*</React.Fragment>*/}
      </React.Fragment>
    )
  }
}
