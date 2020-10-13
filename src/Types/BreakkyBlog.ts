import {BlogType} from "../components/BlogForm"

export type BreakkyBlog = {
  title: string
  cafe: string
  location: string
  displayImage: string
  body: string
  blogType: BlogType
  _id?: string
}