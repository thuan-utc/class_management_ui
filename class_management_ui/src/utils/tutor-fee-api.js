import axios from 'axios'
import { getAccessToken } from './auth-api'
import { saveAs } from 'file-saver'

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`

export { calculateTutorFee, downloadTutorFeeResult, sendTutorFeeNotification,
   searchTutorFee, getTutorFeeDetail, reCalculate, getStudentNotSubmittedFee, payFee,
   getStudentTutorFee}

function getTutorFeeDetail(params) {
  const url = `${BASE_URL}/tutor-fee`
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

function calculateTutorFee(params) {
    const url = `${BASE_URL}/tutor-fee/calculate`
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

  function reCalculate(params) {
    const url = `${BASE_URL}/tutor-fee/re-calculate`
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

function searchTutorFee(params) {
  const url = `${BASE_URL}/tutor-fee/search`
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

function getStudentNotSubmittedFee(params) {
  const url = `${BASE_URL}/tutor-fee/student-not-submitted-tutor-fee`
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



function downloadTutorFeeResult(classId, month, year, priceclassSessionPrice) {
  const url = `${BASE_URL}/tutor-fee/${classId}/result?month=${month}&year=${year}&classSessionPrice=${priceclassSessionPrice}`;
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

function sendTutorFeeNotification(classId, month, year, priceclassSessionPrice) {
  const url = `${BASE_URL}/tutor-fee/send-tutor-fee-notification?classId=${classId}&month=${month}&year=${year}&classSessionPrice=${priceclassSessionPrice}`;

  return axios.get(
    url,
    {
      headers: { Authorization: `Bearer ${getAccessToken()}` }
    }
  ).then(response => response.data)
}


function payFee(tutorFeeDetailId) {
  const url = `${BASE_URL}/tutor-fee/pay?tutorFeeDetailId=${tutorFeeDetailId}`;

  return axios.put(
    url,
    {},
    {
      headers: { Authorization: `Bearer ${getAccessToken()}` }
    }
  ).then(response => response.data)
}

function getStudentTutorFee(classId) {
  const url = `${BASE_URL}/tutor-fee/fee-for-student?classId=${classId}`;

  return axios.get(
    url,
    {
      headers: { Authorization: `Bearer ${getAccessToken()}` }
    }
  ).then(response => response.data)
}

