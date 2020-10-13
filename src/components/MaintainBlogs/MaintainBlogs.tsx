import React from 'react'
import {BreakkyBlogsServiceNew} from "../../Services/BreakkyBlogsServicesNew"
import {Button, Card, Header} from "semantic-ui-react"
import {DisplayToggle} from "../DinnerClubContainerAdventures"
import {BlogForm} from "../BlogForm"
import {BreakkyBlog} from "../../Types/BreakkyBlog"

export enum MaintainBlogsToggle {
  MAINTAIN = 'maintain',
  CREATE = 'create',
  UPDATE = 'update'
}

type Props = {
  handleClick: (value: DisplayToggle) => void
  pageToRender: DisplayToggle
}

type State = {
  breakkyBlogs: BreakkyBlog[]
  maintainToggle: MaintainBlogsToggle
  selectedBlog: BreakkyBlog | null
}

export class MaintainBlogs extends React.Component<Props, State> {

  state: State = {
    breakkyBlogs: [],
    maintainToggle: MaintainBlogsToggle.MAINTAIN,
    selectedBlog: null
  }

  componentDidMount = async() => {
    const breakkyBlogs = await BreakkyBlogsServiceNew.getAll()
    this.setState({breakkyBlogs})
  }

  changeMaintainToggle = (maintainToggle: MaintainBlogsToggle) => {
    this.setState({maintainToggle})
  }

  renderBlogRow = () => {
    return this.state.breakkyBlogs.map((blog) => {
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
                      onClick={() => this.deleteBlog(blog)}
              >
                Delete
              </Button>
            </div>
          </Card.Content>
        </Card>
      )
    })
  }

  deleteBlog = async(blog: BreakkyBlog) => {
    console.log(blog)
    if(blog._id) {
      await BreakkyBlogsServiceNew.delete(blog._id)
    }
  }

  render() {
    return (
      <div className={'maintainBlogsContainer'}>
        {this.state.maintainToggle === MaintainBlogsToggle.MAINTAIN &&
        <React.Fragment>
          <Header color={'red'} as={'h1'}>Breakky Blogs</Header>
          <Button basic
                  color={'green'}
                  icon={'plus'}
                  onClick={() => this.changeMaintainToggle(MaintainBlogsToggle.CREATE)}
                  content={'New Blog'}/>
          <Card.Group>
            {this.renderBlogRow()}
          </Card.Group>
        </React.Fragment>
        }
        {this.state.maintainToggle === MaintainBlogsToggle.CREATE &&
        <React.Fragment>
          <BlogForm handleClick={this.props.handleClick}
                    pageToRender={DisplayToggle.ADMIN_LOGIN}
                    blog={null}
          />
        </React.Fragment>
        }
        {this.state.maintainToggle === MaintainBlogsToggle.UPDATE &&
        <React.Fragment>
          <BlogForm handleClick={this.props.handleClick}
                    pageToRender={DisplayToggle.ADMIN_LOGIN}
                    blog={this.state.selectedBlog}/>
        </React.Fragment>
        }
      </div>
    )
  }
}
