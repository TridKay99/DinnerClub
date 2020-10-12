import Axios from 'axios'

export const UserProfileService = {
  getAll: async() => {
    try {
      let res = await Axios.get(`/all-user-profiles`);
      return res.data || [];
    } catch (e) {
      return console.log('ERROR!!!!', e)
    }
  }
}