import axios from 'axios'
import { getAccessToken } from './auth-api'

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`

export { getAllStudent, search, addStudent, downloadListStudent }

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

function addStudent(classId, newStudent) {
  const url = `${BASE_URL}/student/${classId}`
  return axios.post(
    url,
    newStudent,
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }
  ).then(response => response.data)
}

function downloadListStudent(classId) {
  const url = `${BASE_URL}/student/${classId}/download`;
  return axios.get(url, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
    responseType: 'arraybuffer'
  }).then((response) => {
    const contentDispositionHeader = response.headers['content-disposition'];
    let filename = 'downloaded_file.xlsx'; // default filename
    if (contentDispositionHeader) {
      const parts = contentDispositionHeader.split(';');
      for (let part of parts) {
        if (part.trim().startsWith('filename=')) {
          filename = part.split('=')[1].trim();
          // Remove any surrounding quotes and decode URI components
          filename = decodeURIComponent(filename.replace(/['"]/g, ''));
          break;
        }
      }
    }

    const blob = new Blob([response.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    saveAs(blob, filename);
  }).catch((error) => {
    console.error('Error downloading the file', error);
  });
}
