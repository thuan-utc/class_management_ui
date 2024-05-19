import axios from 'axios'
import { getAccessToken } from './auth-api'

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`

export { search, getAllClassDocument, uploadDocument, downloadFile }

function search(params) {
    const url = `${BASE_URL}/document/search`
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

  function getAllClassDocument(classId) {
    const url = `${BASE_URL}/document?classId=${classId}`
    return axios.get(
      url,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`
        }
      }).then(response => response.data)
  }

  function uploadDocument(file, classid) {
    const url = `${BASE_URL}/document/${classid}`
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

  function downloadFile(documentId) {
    const url = `${BASE_URL}/document/download/${documentId}`
    return axios.get(
        url,
        {
            headers: { Authorization: `Bearer ${getAccessToken()}` },
            responseType: 'arraybuffer'
        }).then((response) => {
            const contentDispositionHeader = response.headers['content-disposition']
            const parts = contentDispositionHeader.split(';')
            const filename = parts[1].split('=')[1]
            let blob = new Blob([response.data], { type: 'application/octet-stream' })
            saveAs(blob, filename)
        })

}