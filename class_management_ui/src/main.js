import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
// var cors = require('cors')
// app.use(cors({
//     origin: "*"
// })) 

app.use(router)

app.mount('#app')
