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

export type DinnerDrama = {
  title: string
  restaurant: string
  location: string
  displayImage: string
  blogText: string
  blogVariety: BlogType
  _id?: string
}

export const isBreakkyBlog = (blog: BreakkyBlog | DinnerDrama): blog is BreakkyBlog => {
  return (blog as BreakkyBlog).cafe !== undefined
}