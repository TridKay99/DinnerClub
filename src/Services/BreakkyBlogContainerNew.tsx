import React, {useEffect, useState} from 'react'
import {BlogInfo} from "../Types/BlogInfo"
import {Button, Card, Container, Icon, Image} from "semantic-ui-react"
import {Blog} from "../components/Blog"
import {BreakkyBlog} from "../Types/BlogTypes"
import {BreakkyBlogsServiceNew} from "./BreakkyBlogsServicesNew"

type Props = {
  isBlogPicked: boolean
  handleIsBlogPicked: () => void
}

export const BreakkyBlogContainerNew = (props: Props) => {
  const [blogs, setBlogs] = useState<BreakkyBlog[]>([])
  const [blogInfo, setBlogInfo] = useState<BlogInfo | null>(null)

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

  // useEffect(() => {
  //   props.handleIsBlogPicked()
  // }, [blogInfo])

  useEffect(() => {
    setBlogs(blogs)
  }, [blogs])

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
                      inverted
              />
            </Card.Content>
          </Card>
        </React.Fragment>
      )
    })
  }

  return (
    <React.Fragment>
      {props.isBlogPicked
        ? <Blog blog={blogInfo!}/>
        : <Container className={'blogOptionContainer'}>
          {getBlogCards()}
        </Container>
      }
    </React.Fragment>
  )
}
