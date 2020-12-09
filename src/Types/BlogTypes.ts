import {BlogType} from "../components/BlogForm"

export type BreakkyBlog = {
  title: string
  cafe: string
  location: string
  displayImage: FileType | null
  blogText: string
  blogVariety: BlogType
  date: Date
  _id?: string
}

export type DinnerDrama = {
  title: string
  restaurant: string
  location: string
  displayImage: FileType | null
  blogText: string
  blogVariety: BlogType
  date: Date
  _id?: string
}

export type FileType = {
  name: string
  base64: string
}

export const isBreakkyBlog = (blog: BreakkyBlog | DinnerDrama): blog is BreakkyBlog => {
  return (blog as BreakkyBlog).cafe !== undefined
}