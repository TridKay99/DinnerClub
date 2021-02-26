import Axios from "axios"
import {DinnerDrama} from "../Types/BlogTypes"

export const DinnerDramaServiceNew = {
  getAll: async () => {
    try {
      const res = await Axios.get('/get-all-dinner-drama')
      return res.data || []
    } catch (e) {
      console.log('ERROR TRIDDA!!!!', e)
    }
  },

  create: async (blog: DinnerDrama) => {
    try {
      const res = await Axios.post('create-dinner-drama', {
        data: blog
      })
      console.log(res)
    } catch(e) {
      console.log('ERROR TRIDDA!!!', e)
    }
  },

  delete: async (id: string) => {
    try {
      const res = await Axios.delete(`/delete-dinner-drama/`, {
        headers: {
          _id: id
        }
      })
      console.log('res', res)
    } catch (e) {
      console.log('ERROR TRIDDA!!!!', e)
    }
  }
}