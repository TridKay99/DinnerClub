import Axios from "axios"

export const DinnerDramaServiceNew = {
  getAll: async () => {
    try {
      const res = await Axios.get('/get-all-dinner-drama')
      return res.data || []
    } catch (e) {
      console.log('ERROR!!!!', e)
    }
  },
}