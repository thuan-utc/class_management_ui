<template>
    <!-- <div class="bg-gradient-primary"> -->
    <div class="container">
        <!-- Outer Row -->
        <div class="row justify-content-center">

            <div class="col-xl-10 col-lg-12 col-md-9">

                <div class="card o-hidden border-0 shadow-lg my-5">
                    <div class="card-body p-0">
                        <!-- Nested Row within Card Body -->
                        <div class="row">
                            <div class="col-lg-6 col-6 d-none d-lg-block">
                                <img src="../assets/img/class_login.jpg" alt="login page" height="500px" width="500px">
                            </div>
                            <div class="col-lg-6">
                                <div class="p-5">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">Class Managment System!</h1>
                                    </div>
                                    <form class="user">
                                        <div class="form-group">
                                            <input type="email" class="form-control form-control-user"
                                                id="exampleInputEmail" aria-describedby="emailHelp"
                                                placeholder="Enter Email Address..." v-model="this.user.userName">
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control form-control-user"
                                                id="exampleInputPassword" placeholder="Password"
                                                v-model="this.user.userPassword">
                                        </div>
                                        <!-- <div class="form-group">
                                            <div class="custom-control custom-checkbox small">
                                                <input type="checkbox" class="custom-control-input" id="customCheck">
                                                <label class="custom-control-label" for="customCheck">Remember
                                                    Me</label>
                                            </div>
                                        </div> -->
                                        <div style="color: red;" v-if="errorLogin">{{ errorLogin }}</div>
                                        <a @click.prevent="loginn" class="btn btn-primary btn-user btn-block">
                                            Login
                                        </a>
                                        <hr>
                                    </form>
                                    <hr>
                                    <div class="text-center">
                                        <a class="small" href="forgot-password.html">Forgot Password?</a>
                                    </div>
                                    <div class="text-center">
                                        <a class="small" @click="this.$router.push({ path: `/signup` })">Create an
                                            Account!</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>


    </div>
    <!-- </div> -->
</template>

<script>
import '../assets/vendor/jquery/jquery.min.js'
import '../assets/vendor/bootstrap/js/bootstrap.bundle.min.js'
import '../assets/vendor/jquery-easing/jquery.easing.min.js'
import '../assets/js/sb-admin-2.min.js'
import router from '@/router'

import { login } from '../utils/login-api.js'
import { RouterLink } from 'vue-router'
export default {
    data() {
        return {
            user: {
                username: '',
                password: '',
                userRole: ''
            },
            error: '',
            changePassword: false,
            forgotPasswrod: false,
            sessionExpired: false

        }
    },
    methods: {
        loginn() {
            router.push("/dashboard")
            // login(this.user)
            //     .then((response) => {
            //         if (response.data.status === true) {
            //             const userRole = response.data.userRole
            //             const userName = this.user.userName
            //             if (response.data.userRole === 'admin') {
            //                 // Redirect to admin page
            //                 // window.location.href = '/admin';
            //                 this.$router.push({ path: `/admin/${userName}` })
            //             } else if (response.data.userRole === 'user') {
            //                 // Redirect to customer page
            //                 // window.location.href = '/customer';
            //                 this.$router.push({ path: `/customer/${userName}` })
            //             }
            //         }
            //     }).catch(error => {
            //         this.errorLogin = error.response.data
            //     })
        },
        redirectToChangePassword() {
            router.push("/change-password")
        },
        redirectToForgotPassword() {
            router.push("/forgot-password")
        },
        redirectToCreateAccount() {
            router.push("/create-account")
        }
    },
    mounted() {
        if (this.$route.query.sessionExpired) {
            this.sessionExpired = this.$route.query.sessionExpired
        }
    }
}
</script>

<style>
@import url("../assets/vendor/fontawesome-free/css/all.min.css");
@import url("../assets/css/sb-admin-2.min.css");
</style>