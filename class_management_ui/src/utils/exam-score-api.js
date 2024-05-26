import axios from 'axios'
import { getAccessToken } from './auth-api'

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`

export { fetchClassExamScore, saveExamScoreResult, createNewExam, fetchClassExam }

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