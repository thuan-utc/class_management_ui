import axios from 'axios'
import { getAccessToken } from './auth-api'

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`

export { fetchClassExamScore, saveExamScoreResult, createNewExam,
     fetchClassExam, fetchStudentExamResult, downloadExamResult }

function createNewExam(newExamRequest) {
    const url = `${BASE_URL}/exam-score`
    return axios.post(
        url,
        newExamRequest,
        {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        }).then(response => response.data)
}

function fetchClassExam(classId) {
    const url = `${BASE_URL}/exam-score/${classId}/exam`
    return axios.get(
        url,
        {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        }).then(response => response.data)
}

function fetchClassExamScore(examId) {
    const url = `${BASE_URL}/exam-score/${examId}`
    return axios.get(
        url,
        {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        }).then(response => response.data)
}

function saveExamScoreResult(result) {
    const url = `${BASE_URL}/exam-score`
    return axios.put(
        url,
        result,
        {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        }).then(response => response.data)
}

function fetchStudentExamResult(classId) {
    const url = `${BASE_URL}/exam-score/student-exam-result?classId=${classId}`
    return axios.get(
        url,
        {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        }).then(response => response.data)
}

function downloadExamResult(classId) {
    const url = `${BASE_URL}/exam-score/${classId}/result`;
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
  