import axios from 'axios'
import { getAccessToken } from './auth-api';

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`

export { getAllClassroom, createNewClass, search }

function getAllClassroom() {
  const url = `${BASE_URL}/classroom`;
  return axios.get(
    url,
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }).then(response => response.data)
}

function search(params) {
  const url = `${BASE_URL}/classroom/search`;
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

function createNewClass(newClass) {
  const url = `${BASE_URL}/classroom`;
  return axios.post(
    url,
    newClass,
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }).then(response => response.data)
}