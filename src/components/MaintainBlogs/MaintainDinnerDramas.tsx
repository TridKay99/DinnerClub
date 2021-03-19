import {DinnerDrama} from "../../Types/BlogTypes"
import {BlogDisplayToggle, MaintainBlogsToggle} from "./MaintainBlogs"
import React, {useEffect, useState} from "react"
import {Button, Card} from "semantic-ui-react"
import {BlogForm, BlogType} from "../BlogForm"
import {DinnerDramaServiceNew} from "../../Services/DinnerDramaServiceNew"

type Props = {
  dinnerDramas: DinnerDrama[]
  blogDisplayToggle: BlogDisplayToggle
  setBlogDisplay: (display: BlogDisplayToggle) => void
  collectBlogs: () => void
  activeIndex: number
}

export const MaintainDinnerDramas = (props: Props) => {
  const [selectedBlog, setSelectedBlog] = useState<DinnerDrama | null>(null)

  useEffect(() => {
    setSelectedBlog(null)
    props.setBlogDisplay(BlogDisplayToggle.MAINTAIN)
  }, [props.activeIndex])

  const handleEditClick = (blog: DinnerDrama) => {
    setSelectedBlog(blog)
    props.setBlogDisplay(BlogDisplayToggle.EDIT)
  }

  const deleteBlog = async (blog: DinnerDrama) => {
    if (blog._id) {
      await DinnerDramaServiceNew.delete(blog._id)
      props.collectBlogs()
    }
  }

  const handleSetSelectedBlogToNull = () => {
    setSelectedBlog(null)
  }

  const renderBlogRow = () => {
    return props.dinnerDramas.map((blog) => {
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
                      onClick={() => handleEditClick(blog)}
              >
                Edit
              </Button>
              <Button basic
                      color='red'
                      onClick={() => deleteBlog(blog)}>
                Delete
              </Button>
            </div>
          </Card.Content>
        </Card>
      )
    })
  }

  const renderBlogCards = () => {
    return (
      <React.Fragment>
        <Button inverted
                color={'green'}
                icon={'plus'}
                onClick={() => props.setBlogDisplay(BlogDisplayToggle.EDIT)}
                content={'New Blog'}/>
        <br/>
        <br/>
        <Card.Group>
          {renderBlogRow()}
        </Card.Group>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      {props.blogDisplayToggle === BlogDisplayToggle.MAINTAIN
        ? renderBlogCards()
        : <BlogForm setBlogDisplay={props.setBlogDisplay}
                    blog={selectedBlog}
                    blogVariety={BlogType.DINNER}
                    saveType={MaintainBlogsToggle.CREATE}
                    collectBlogs={props.collectBlogs}
                    handleSetSelectedBlogToNull={handleSetSelectedBlogToNull}
        />
      }
    </React.Fragment>
  )
}