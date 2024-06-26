import axios from 'axios'
import { getAccessToken } from './auth-api'

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`

export { getAllClassroom, createNewClass, search,
   uploadListStudent, getClassDetail, searchClassForStudent,
    updateClassDetail }

function getAllClassroom() {
  const url = `${BASE_URL}/classroom`
  return axios.get(
    url,
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }).then(response => response.data)
}

function search(params) {
  const url = `${BASE_URL}/classroom/search`
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

function searchClassForStudent(params) {
  const url = `${BASE_URL}/classroom/class-for-student`
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
  const url = `${BASE_URL}/classroom`
  return axios.post(
    url,
    newClass,
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }).then(response => response.data)
}

function uploadListStudent(file, classid) {
  const url = `${BASE_URL}/classroom/student/${classid}`
  return axios.put(
    url,
    file,
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }
  ).then(response => response.data)
}

function getClassDetail(classId) {
  const url = `${BASE_URL}/classroom/detail?classId=${classId}`
  return axios.get(
    url,
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }
  ).then(response => response.data)
}

function updateClassDetail(request) {
  const url = `${BASE_URL}/classroom`
  return axios.put(
    url,
    request,
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }
  ).then(response => response.data)
}