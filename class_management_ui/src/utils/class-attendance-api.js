import axios from 'axios'
import { getAccessToken } from './auth-api'

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`

export { fetchClassAttendance}


function fetchClassAttendance(scheduleId) {
  const url = `${BASE_URL}/class-attendance?classId=${scheduleId}`
  return axios.get(
    url,
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }).then(response => response.data)
}