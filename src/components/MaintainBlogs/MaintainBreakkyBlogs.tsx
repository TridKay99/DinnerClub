import React, {useEffect, useState} from 'react'
import {BreakkyBlog} from "../../Types/BlogTypes"
import {Button, Card} from "semantic-ui-react"
import {BlogDisplayToggle} from "./MaintainBlogs"
import {BlogForm, BlogType} from "../BlogForm"
import {BreakkyBlogsServiceNew} from "../../Services/BreakkyBlogsServicesNew"

export enum SaveType {
  CREATE = 'create',
  EDIT = 'edit'
}

type Props = {
  breakkyBlogs: BreakkyBlog[]
  blogDisplayToggle: BlogDisplayToggle
  setBlogDisplay: (display: BlogDisplayToggle) => void
  collectBlogs: () => void
  activeIndex: number
}

export const MaintainBreakkyBlogs = (props: Props) => {
  const [selectedBlog, setSelectedBlog] = useState<BreakkyBlog | null>(null)
  const [saveType, setSaveType] = useState<SaveType>(SaveType.CREATE)

  useEffect(() => {
    setSelectedBlog(null)
    props.setBlogDisplay(BlogDisplayToggle.MAINTAIN)
    // eslint-disable-next-line
  }, [props.activeIndex])

  const handleEditClick = (blog: BreakkyBlog) => {
    setSelectedBlog(blog)
    props.setBlogDisplay(BlogDisplayToggle.EDIT)
    setSaveType(SaveType.EDIT)
  }

  const deleteBlog = async (blog: BreakkyBlog) => {
    if (blog._id) {
      await BreakkyBlogsServiceNew.delete(blog._id)
      props.collectBlogs()
    }
  }

  const handleSetSelectedBlogToNull = () => {
    setSelectedBlog(null)
  }

  const renderBlogRow = () => {
    return props.breakkyBlogs.map((blog) => {
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
                      onClick={() => handleEditClick(blog)}>
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
                onClick={() => createNewBlogClick()}
                content={'New Blog'}/>
        <br/>
        <br/>
        <Card.Group>
          {renderBlogRow()}
        </Card.Group>
      </React.Fragment>
    )
  }

  const createNewBlogClick = () => {
    props.setBlogDisplay(BlogDisplayToggle.EDIT)
    setSaveType(SaveType.CREATE)
  }

  return (
    <React.Fragment>
      {props.blogDisplayToggle === BlogDisplayToggle.MAINTAIN
        ? renderBlogCards()
        : <BlogForm setBlogDisplay={props.setBlogDisplay}
                    blog={selectedBlog}
                    blogVariety={BlogType.BREAKKY}
                    saveType={saveType}
                    collectBlogs={props.collectBlogs}
                    handleSetSelectedBlogToNull={handleSetSelectedBlogToNull}/>
      }
    </React.Fragment>
  )
}
