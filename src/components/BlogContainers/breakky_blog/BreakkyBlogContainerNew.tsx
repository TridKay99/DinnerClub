import React, {useEffect, useState} from 'react'
import {Button, Card, Container, Image} from "semantic-ui-react"
import {Blog} from "../../Blog"
import {BreakkyBlog} from "../../../Types/BlogTypes"
import {BreakkyBlogsServiceNew} from "../../../Services/BreakkyBlogsServicesNew"

type Props = {
  isBlogPicked: boolean
  handleIsBlogPicked: () => void
}

export const BreakkyBlogContainerNew = (props: Props) => {
  const [blogs, setBlogs] = useState<BreakkyBlog[]>([])
  const [presentingBlog, setPresentingBlog] = useState<BreakkyBlog | null>(null)

  useEffect(() => {
    const collectedBlogs = async () => {
      await setCollectedBlogs()
    }

    collectedBlogs()
  }, [])

  const setCollectedBlogs = async () => {
    const collectedBlogs = await BreakkyBlogsServiceNew.getAll()
    setBlogs(collectedBlogs)
  }

  const getBlogCards = () => {
    return blogs.map((blog: BreakkyBlog) => {
      return (
        <React.Fragment>
          <Card>
            <Image src='/images/avatar/large/matthew.png' wrapped ui={false}/>
            <Card.Content>
              <Card.Header>{blog.cafe}</Card.Header>
              <Card.Meta>
                <span className='date'>{blog.location}</span>
              </Card.Meta>
              <Card.Description>
                {blog.title}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button content={'Read more...'}
                      color={'blue'}
                      onClick={() => selectBlog(blog)}
                      inverted
              />
            </Card.Content>
          </Card>
        </React.Fragment>
      )
    })
  }

  const selectBlog = (blog: BreakkyBlog) => {
    setPresentingBlog(blog)
    props.handleIsBlogPicked()
  }

  return (
    <React.Fragment>
      {props.isBlogPicked
        ? <Blog blog={presentingBlog!}/>
        : <Container className={'blogOptionContainer'}>
            <Card.Group>
              { getBlogCards() }
            </Card.Group>
          </Container>
      }
    </React.Fragment>
  )
}
