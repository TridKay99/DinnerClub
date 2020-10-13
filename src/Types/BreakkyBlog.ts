import {BlogType} from "../components/BlogForm"

export type BreakkyBlog = {
  title: string
  cafe: string
  location: string
  displayImage: string
  BlogText: string
  blogVariety: BlogType
  _id?: string
}