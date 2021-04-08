import React, {useEffect, useState} from 'react'
import {Button, Card, Container} from "semantic-ui-react"
import {Blog} from "../../Blog"
import {DinnerDrama} from "../../../Types/BlogTypes"
import {DinnerDramaServiceNew} from "../../../Services/DinnerDramaServiceNew"
import {EmpressOfChina, ILoveDumplings, Madaeya} from "../../services/DinnerBlogs/DinnerDramaService"
import {
  dragonDumplingHouse,
  MalvenVale,
  ReturnOfTheTao,
  SubiQKoreanBBQ,
  TaoDumplings,
  ThaiToGo, vietStar
} from "../../services/DinnerBlogs/DinnerDramasListTwo"

type Props = {
  isBlogPicked: boolean
  handleIsBlogPicked: () => void
}

export const DinnerDramaContainerNew = (props: Props) => {
  const [blogs, setBlogs] = useState<any[]>([])
  const [presentingBlog, setPresentingBlog] = useState<DinnerDrama | null>(null)

  useEffect(() => {
    // const collectedBlogs = async () => {
    //   await setCollectedBlogs()
    // }
    //
    // collectedBlogs()
    const blogs = [ILoveDumplings, Madaeya, EmpressOfChina, TaoDumplings, ThaiToGo,
      MalvenVale, SubiQKoreanBBQ, ReturnOfTheTao, dragonDumplingHouse, vietStar]
    setBlogs(blogs)
  }, [])

  // const setCollectedBlogs = async () => {
  //   const collectedBlogs = await DinnerDramaServiceNew.getAll()
  //   setBlogs(collectedBlogs)
  // }

  const getBlogCards = () => {
    return blogs.map((blog: any, index) => {
      return (
        <Card key={index}>
          {/*TODO add images to the cards when backend ready*/}
          {/*<Image src='/images/avatar/large/matthew.png' wrapped ui={false}/>*/}
          <Card.Content>
            <Card.Header>{blog.title}</Card.Header>
            <Card.Meta>
              {/*<span className='date'>{blog.location}</span>*/}
            </Card.Meta>
            <Card.Description>
              {blog.restaurant}
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

  const selectBlog = (blog: any) => {
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
