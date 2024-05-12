<template>
  <div v-if="currentRouteName == 'Login'">
    <login></login>
  </div>
  <div v-else-if="currentRouteName == 'ForgotPassword'">
    <ForgotPassword></ForgotPassword>
  </div>
  <div v-else-if="currentRouteName == 'NewAccount'">
    <NewAccount></NewAccount>
  </div>
  <div id="wrapper" v-else>
    <nav-bar></nav-bar>
    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <top-bar></top-bar>
        <RouterView></RouterView>
      </div>
      <footer-bar></footer-bar>
    </div>
  </div>
</template>

<script>
import Login from './views/Login.vue'
import NavBar from './components/NavBar.vue'
import TopBar from './components/TopBar.vue'
import FooterBar from './components/FooterBar.vue'
import './assets/vendor/jquery/jquery.min.js'
import './assets/vendor/bootstrap/js/bootstrap.bundle.min.js'
import './assets/vendor/jquery-easing/jquery.easing.min.js'
import './assets/js/sb-admin-2.min.js'
import './assets/js/sb-admin-2.js'
import './assets/vendor/datatables/jquery.dataTables.js'
import './assets/vendor/datatables/jquery.dataTables.min.js'
import './assets/vendor/datatables/dataTables.bootstrap4.min.js'
import ForgotPassword from './views/ForgotPassword.vue'
import NewAccount from './views/NewAccount.vue'

export default {
  name: 'app',
  components: {
    Login,
    NavBar,
    TopBar,
    FooterBar,
    ForgotPassword,
    NewAccount
  },
  computed: {
    currentRouteName() {
      return this.$route.name
    }
  },
}
</script>

<style scoped>
/* @import './assets/datatables/datatables.min.css' */
</style>
