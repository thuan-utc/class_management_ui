import axios from 'axios'
import { getAccessToken } from './auth-api'

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`

export {getClassInWeek}

function getClassInWeek() {
    const url = `${BASE_URL}/dashboard/class-in-week`
    return axios.get(
      url,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`
        }
      }).then(response => response.data)
  }