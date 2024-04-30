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
                                                id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Login"
                                                v-model="this.user.username">
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control form-control-user"
                                                id="exampleInputPassword" placeholder="Password"
                                                v-model="this.user.password">
                                        </div>
                                        
                                        <button :disabled="isProcessing" @click.prevent="loginn"
                                            class="btn btn-primary btn-user btn-block">Login</button>
                                    </form>
                                    <div class="text-center" style="color: red !important;" v-if="errorMessage"><span
                                            class="small" href="#">{{ errorMessage }}</span></div>
                                    <hr>
                                    <div class="text-center">
                                        <a class="small" href="#" @click="redirectToForgotPassword">Forgot Password?</a>
                                    </div>
                                    <div class="text-center">
                                        <a class="small" @click="this.$router.push({ path: `/signup`})">Create an
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

import { login } from '../utils/auth-api.js'
import { RouterLink } from 'vue-router'
export default {
    data() {
        return {
            user: {
                username: '',
                password: '',
                userRole: ''
            },
            errorMessage: '',
            changePassword: false,
            forgotPasswrod: false,
            // sessionExpired: false,
            isProcessing: false
        }
    },
    methods: {
        loginn() {
            this.isProcessing = true
            login(this.user).catch(error => {
                if (error.code === "ERR_NETWORK") {
                    this.errorMessage = error.message
                } else {
                    this.errorMessage = error.response.data.error
                }
                this.isProcessing = false
            })
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
            // this.sessionExpired = this.$route.query.sessionExpired
            this.errorMessage = "Session expired!"
        }
    }
}
</script>

<style>
@import url("../assets/vendor/fontawesome-free/css/all.min.css");
@import url("../assets/css/sb-admin-2.min.css");
</style>