import axios from 'axios'
import { getAccessToken } from './auth-api'

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`

export { getAllSchedule, createClassSchedule, searchSchedule, deleteSchedule }

function searchSchedule(params) {
  const url = `${BASE_URL}/class-schedule/search`
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

function getAllSchedule(classId) {
  const url = `${BASE_URL}/class-schedule?classId=${classId}`
  return axios.get(
    url,
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }).then(response => response.data)
}

function createClassSchedule(request) {
  const url = `${BASE_URL}/class-schedule`
  return axios.post(
    url,
    request,
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }).then(response => response.data)
}

function deleteSchedule(scheduleId) {
  const url = `${BASE_URL}/class-schedule/delete/${scheduleId}`
  return axios.put(
    url,
    {},
    {
      headers: { Authorization: `Bearer ${getAccessToken()}` }
    }
  ).then((response) => {
    return response.data;
  })

}