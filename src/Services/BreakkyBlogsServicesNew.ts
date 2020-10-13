import Axios from 'axios'
import {BreakkyBlog} from "../Types/BreakkyBlog"

export const BreakkyBlogsServiceNew = {
  getAll: async () => {
    try {
      const res = await Axios.get('/get-all-breakky-blog')
      return res.data || []
    } catch (e) {
      console.log('ERROR!!!!', e)
    }
  },

  create: async (blog: BreakkyBlog) => {
    const res = await Axios.post('/create-breakky-blog', {
      body: blog,
      'Content-type': 'application/json'
    })
    console.log(res)
  },

  delete: async (id: string) => {
    try {
      const res = await Axios.delete(`/delete-breakky-blog/`, {
        headers: {
          _id: id
        }
      })
      console.log('res', res)
    } catch (e) {
      console.log('ERROR!!!!', e)
    }
  }
}