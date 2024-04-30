import axios from 'axios'
import { getAccessToken } from './auth-api'
import saveAs from 'file-saver'

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`

export { downloadSample }

function downloadSample(fileName) {
    const url = `${BASE_URL}/files/sample/${fileName}`
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