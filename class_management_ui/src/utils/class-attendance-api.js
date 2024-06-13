import axios from 'axios'
import { getAccessToken } from './auth-api'

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`

export { fetchClassAttendance, saveClassAttendanceResult, fetchStudentAttendanceResult, downloadAttendanceResult}


function fetchClassAttendance(scheduleId) {
  const url = `${BASE_URL}/class-attendance/${scheduleId}`
  return axios.get(
    url,
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }).then(response => response.data)
}

function saveClassAttendanceResult(result) {
  const url = `${BASE_URL}/class-attendance`
  return axios.put(
    url,
    result,
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }).then(response => response.data)
}

function fetchStudentAttendanceResult(classId) {
  const url = `${BASE_URL}/class-attendance/student-attendance-result?classId=${classId}`
  return axios.get(
    url,
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }).then(response => response.data)
}

function downloadAttendanceResult(classId) {
  const url = `${BASE_URL}/class-attendance/${classId}/result`;
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
