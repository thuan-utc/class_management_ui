import axios from 'axios'

export {test}

function test () {
    const url = "https://reqres.in/api/users?page=1&per_page=10";
    return axios.get(ur).then(response => response.data)
  }