<template>
  <div v-if="currentRouteName == 'Login'">
    <login></login>
  </div>
  <div id="wrapper" v-else>
    <nav-bar></nav-bar>
    <div id="content-wrapper">
      <top-bar></top-bar>
      <RouterView></RouterView>
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
