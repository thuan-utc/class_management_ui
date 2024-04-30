import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { logout } from './utils/auth-api'
import axios from 'axios'

const app = createApp(App)

app.use(router)

app.mount('#app')

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error && error.response && error.response.status === 401
    && error.response.data.path !== '/api/auth/login') {
    console.log("seesion exipired")
    alert("Session Expired!")
    logout()
  }
  return Promise.reject(error)
})