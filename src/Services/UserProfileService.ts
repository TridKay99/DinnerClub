import Axios from 'axios'

export const UserProfileService = {
  getAllProfiles: async() => {
    let res = await Axios.get(`/all-user-profiles`);
    return res.data || [];
  }
}