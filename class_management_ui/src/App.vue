<template>
  <div v-if="currentRouteName == 'Login'">
    <login></login>
  </div>
  <div id="wrapper" v-else>
    <nav-bar></nav-bar>
    <div id="content-wrapper">
      <div class="content">
        <top-bar></top-bar>
        <RouterView></RouterView>
      </div>
      <footer-bar></footer-bar>
    </div>
  </div>
</template>

<script>
import { login } from './utils/login-api';
import Login from './views/Login.vue';
import NavBar from './components/NavBar.vue';
import TopBar from './components/TopBar.vue';
import FooterBar from './components/FooterBar.vue';
import './assets/vendor/jquery/jquery.min.js'
import './assets/vendor/bootstrap/js/bootstrap.bundle.min.js'
import './assets/vendor/jquery-easing/jquery.easing.min.js'
import './assets/js/sb-admin-2.min.js'
import './assets/js/sb-admin-2.js'
import './assets/vendor/datatables/jquery.dataTables.js'
import './assets/vendor/datatables/jquery.dataTables.min.js'
import './assets/vendor/datatables/dataTables.bootstrap4.min.js'

export default {
  name: 'app',
  components: {
    Login,
    NavBar,
    TopBar,
    FooterBar
  },
  computed: {
    currentRouteName() {
      return this.$route.name
    }
  },
}
</script>

<style scoped></style>
