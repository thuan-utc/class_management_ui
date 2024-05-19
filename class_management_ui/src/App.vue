<template>
  <div v-if="currentRouteName == 'Login'">
    <login @login-success="handleLoginSuccess"></login>
  </div>
  <div v-else-if="currentRouteName == 'ForgotPassword'">
    <ForgotPassword></ForgotPassword>
  </div>
  <div v-else-if="currentRouteName == 'NewAccount'">
    <NewAccount></NewAccount>
  </div>
  <div id="wrapper" v-else>
    <nav-bar v-if="this.userRole === 'TEACHER'"></nav-bar>
    <StudentNavBar v-if="this.userRole === 'STUDENT'"></StudentNavBar>
    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <top-bar :username="this.username"></top-bar>
        <RouterView :username="this.username"></RouterView>
      </div>
      <footer-bar></footer-bar>
    </div>
  </div>
</template>

<script>
import Login from './views/Login.vue'
import NavBar from './teacherView/NavBar.vue'
import TopBar from './components/TopBar.vue'
import FooterBar from './components/FooterBar.vue'
import './assets/vendor/jquery/jquery.js'
import './assets/vendor/bootstrap/js/bootstrap.bundle.min.js'
import './assets/vendor/jquery-easing/jquery.easing.min.js'
import './assets/js/sb-admin-2.min.js'
import './assets/js/sb-admin-2.js'
import './assets/vendor/datatables/jquery.dataTables.js'
import './assets/vendor/datatables/jquery.dataTables.min.js'
import './assets/vendor/datatables/dataTables.bootstrap4.min.js'
import ForgotPassword from './views/ForgotPassword.vue'
import NewAccount from './views/NewAccount.vue'
import StudentNavBar from './studentView/StudentNavBar.vue'
import { getUserInfo } from './utils/user-api'
import { error } from 'jquery'

export default {
  name: 'app',
  components: {
    Login,
    NavBar,
    TopBar,
    FooterBar,
    ForgotPassword,
    NewAccount,
    StudentNavBar
  },
  data() {
    return {
      username: '',
      userRole: null
    }
  },
  methods: {
    getUserInfo() {
      getUserInfo().then((response) => {
        this.userRole = response.role
        this.username = response.username
        if (response.lastName !== null && response.lastName !== '') {
          this.username = response.lastName
        }
      }).catch((error) => { 
        console.log(error)
        alert("Không thể tìm thấy thông tin người dùng!")
      })

    },
    handleLoginSuccess () {
      this.getUserInfo()
    }

  },
  computed: {
    currentRouteName() {
      return this.$route.name
    }
  },
  mounted() {
    this.getUserInfo()
  }
}
</script>

<style scoped>
/* @import './assets/datatables/datatables.min.css' */
</style>
