import axios from 'axios'
import { getAccessToken } from './auth-api'

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`

export { getAllStudent, search }

function getAllStudent(classId) {
  const url = `${BASE_URL}/student?classId=${classId}`
  return axios.get(
    url,
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }).then(response => response.data)
}

function search(params) {
  const url = `${BASE_URL}/student/search`
  let paramsNotNull = {}
  Object.keys(params).forEach((key) => {
    if (params[key] != null && params[key] !== '') {
      paramsNotNull[key] = params[key].toString().trim()
    }
  })

  return axios.get(
    url,
    {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
      params: paramsNotNull
    }
  ).then(response => response.data)
}