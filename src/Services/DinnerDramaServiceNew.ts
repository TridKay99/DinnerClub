import Axios from "axios"
import {DinnerDrama} from "../Types/BlogTypes"

export const DinnerDramaServiceNew = {
  getAll: async () => {
    try {
      const res = await Axios.get('/get-all-dinner-drama')
      return res.data || []
    } catch (e) {
      console.log('ERROR!!!!', e)
    }
  },

  create: async (blog: DinnerDrama) => {
    const res = await Axios.post('create-dinner-drama', {
      data: blog
    })
    console.log(res)
  }
}