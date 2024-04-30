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
                                        <h1 class="h4 text-gray-900 mb-4">Reset password</h1>
                                    </div>
                                    <form class="user">
                                        <div v-if="this.resetState === 'sendingCode'">
                                            <div class="form-group">
                                                <input type="email" class="form-control form-control-user"
                                                    id="exampleInputEmail" aria-describedby="emailHelp"
                                                    placeholder="enter email" v-model="this.user.email">
                                            </div>

                                            <button v-show="this.resetState === 'sendingCode'" :disabled="isProcessing"
                                                @click.prevent="sendEmailForgotPassword"
                                                class="btn btn-primary btn-user btn-block">Send code</button>

                                            <div class="text-center">
                                                <a class="small" @click="this.$router.push({ path: `/login` })">Back to login</a>
                                            </div>
                                        </div>

                                        <div v-else>
                                            <div class="form-group">
                                                <input v-show="this.resetState === 'resetPassword'" type="text"
                                                    class="form-control form-control-user" id=""
                                                    aria-describedby="emailHelp" placeholder="enter reset code"
                                                    v-model="this.user.code">
                                            </div>
                                            <div class="form-group">
                                                <input v-show="this.resetState === 'resetPassword'" type="password"
                                                    class="form-control form-control-user" id=""
                                                    aria-describedby="emailHelp" placeholder="enter new password"
                                                    v-model="this.user.newPassword">
                                            </div>
                                            <div class="form-group">
                                                <input v-show="resetState === 'resetPassword'" type="password"
                                                    class="form-control form-control-user" id=""
                                                    placeholder="Re-enter new password" v-model="user.confirmPassword"
                                                    @input="validatePasswords">
                                            </div>

                                            <button v-show="this.resetState === 'resetPassword'"
                                                :disabled="isProcessing" @click.prevent="resetPassword"
                                                class="btn btn-primary btn-user btn-block">Submit</button>
                                        </div>
                                    </form>
                                    <div class="text-center" style="color: red !important;" v-if="errorMessage"><span
                                            class="small" href="#">{{ errorMessage }}</span></div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>

</template>

<script>
import '../assets/vendor/jquery/jquery.min.js'
import '../assets/vendor/bootstrap/js/bootstrap.bundle.min.js'
import '../assets/vendor/jquery-easing/jquery.easing.min.js'
import '../assets/js/sb-admin-2.min.js'

import { resetPassword, sendMailResetPassword } from '../utils/auth-api.js'
export default {
    data() {
        return {
            user: {
                email: '',
                code: '',
                newPassword: '',
                confirmPassword: ''
            },
            errorMessage: '',
            isProcessing: false,
            resetState: 'sendingCode',
            passwordsMatch: true
        }
    },
    methods: {
        sendEmailForgotPassword() {
            if (this.user.email === null || this.user.email === '') {
                this.errorMessage = "Email must not be empty!"
                return
            }
            this.isProcessing = true
            sendMailResetPassword(this.user.email).then((response) => {
                alert(response.data.message)
                this.isProcessing = false
                this.errorMessage = ''
                this.resetState = 'resetPassword'
            }).catch((error) => {
                console.log(error)
                // alert(error.response.data.error)
                this.errorMessage = error.response.data.error
                this.isProcessing = false
            })
        },
        validatePasswords() {
            if (this.user.newPassword !== this.user.confirmPassword) {
                this.passwordsMatch = false;
                this.errorMessage = 'Password not match.'
            } else {
                this.passwordsMatch = true;
                this.errorMessage = ''
            }
        },
        resetPassword() {
            if (this.validatePasswords) {
                this.isProcessing = true
                resetPassword(this.user).then((response) => {
                    this.isProcessing = false
                    this.$router.push({ path: `/login` })
                }).catch((error) => {
                    console.log(error)
                    this.isProcessing = false
                    this.errorMessage = error.response.data.error

                })
            } else {
                alert("New password not valid!")
            }
        }

    },
    mounted() {
    }
}
</script>

<style>
@import url("../assets/vendor/fontawesome-free/css/all.min.css");
@import url("../assets/css/sb-admin-2.min.css");
</style>