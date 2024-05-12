import axios from 'axios'
import { getAccessToken } from './auth-api'

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`

export { getUserInfo, updateUserInfo }

function getUserInfo() {
  const url = `${BASE_URL}/user`
  return axios.get(
    url,
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }).then(response => response.data)
}

function updateUserInfo(userInfo) {
  const url = `${BASE_URL}/user`
  return axios.put(
    url,
    userInfo,
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }).then(response => response.data)
}