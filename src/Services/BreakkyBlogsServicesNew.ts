import Axios from 'axios'

export const BreakkyBlogsServiceNew = {
  getAll: async () => {
    try {
      const res = await Axios.get('/get-all-breakky-blog')
      return res.data || []
    } catch (e) {
      console.log('ERROR!!!!', e)
    }
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