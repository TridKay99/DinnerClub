import React, {useEffect, useState} from 'react'
import {Button, Card, Container, Image} from "semantic-ui-react"
import {Blog} from "../../Blog"
import {DinnerDrama} from "../../../Types/BlogTypes"
import {DinnerDramaServiceNew} from "../../../Services/DinnerDramaServiceNew"

type Props = {
  isBlogPicked: boolean
  handleIsBlogPicked: () => void
}

export const DinnerDramaContainerNew = (props: Props) => {
  const [blogs, setBlogs] = useState<DinnerDrama[]>([])
  const [presentingBlog, setPresentingBlog] = useState<DinnerDrama | null>(null)

  useEffect(() => {
    const collectedBlogs = async () => {
      await setCollectedBlogs()
    }

    collectedBlogs()
  }, [])

  const setCollectedBlogs = async () => {
    const collectedBlogs = await DinnerDramaServiceNew.getAll()
    setBlogs(collectedBlogs)
  }

  const getBlogCards = () => {
    return blogs.map((blog: DinnerDrama) => {
      return (
        <React.Fragment>
          <Card>
            <Image src='/images/avatar/large/matthew.png' wrapped ui={false}/>
            <Card.Content>
              <Card.Header>{blog.restaurant}</Card.Header>
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

  const selectBlog = (blog: DinnerDrama) => {
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