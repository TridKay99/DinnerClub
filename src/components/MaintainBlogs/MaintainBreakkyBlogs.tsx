import React from 'react'
import {Button, Card} from "semantic-ui-react"
import {MaintainBlogsToggle} from "./MaintainBlogs"
import {BreakkyBlog} from "../../Types/BreakkyBlog"
import {BreakkyBlogsServiceNew} from "../../Services/BreakkyBlogsServicesNew"
import {BlogForm} from "../BlogForm"
import {DisplayToggle} from "../DinnerClubContainerAdventures"

type Props = {
  maintainToggle: MaintainBlogsToggle
  changeMaintainToggle: (maintainToggle: MaintainBlogsToggle) => void
  breakkyBlogs: BreakkyBlog[]
  handleClick: (value: DisplayToggle) => void
}

export class MaintainBreakkyBlogs extends React.Component<Props> {

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

  deleteBlog = async(blog: BreakkyBlog) => {
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
    </React.Fragment>)
  }
}
