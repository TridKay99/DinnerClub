import React, {useEffect, useState} from 'react'
import {Button, Card, Container} from "semantic-ui-react"
import {Blog} from "../../Blog"
import {BreakkyBlog} from "../../../Types/BlogTypes"
import {BreakkyBlogsServiceNew} from "../../../Services/BreakkyBlogsServicesNew"
import '../../styles/component-blog-containers.scss'
import {BeansRepublique, Darling, MrFoxx} from "../../services/BreakkyBlogs/BreakkyBlogService"
import {MobyDick} from "../../services/BreakkyBlogs/BreakkyBlogListTwo"

type Props = {
  isBlogPicked: boolean
  handleIsBlogPicked: () => void
}

export const BreakkyBlogContainer = (props: Props) => {
  const [blogs, setBlogs] = useState<any[]>([])
  const [presentingBlog, setPresentingBlog] = useState<BreakkyBlog | null>(null)

  useEffect(() => {
    // const collectedBlogs = async () => {
    //   await setCollectedBlogs()
    // }
    //
    // collectedBlogs()

    const blogs = [BeansRepublique, MrFoxx, Darling, MobyDick]
    setBlogs(blogs)
  }, [])

  // const setCollectedBlogs = async () => {
  //   const collectedBlogs = await BreakkyBlogsServiceNew.getAll()
  //   setBlogs(collectedBlogs)
  // }

  const getBlogCards = () => {
    return blogs.map((blog: BreakkyBlog, index) => {
      return (
        <Card key={index}>
          {/*TODO add images to the cards when backend ready*/}
          {/*<Image src='/images/avatar/large/matthew.png' wrapped ui={false}/>*/}
          <Card.Content>
            <Card.Header>{blog.title}</Card.Header>
            <Card.Meta>
              <span className='date'>{blog.location}</span>
            </Card.Meta>
            <Card.Description>
              {blog.cafe}
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
            <Card.Group itemsPerRow={3}>
              { getBlogCards() }
            </Card.Group>
          </Container>
      }
    </React.Fragment>
  )
}
