<template>
    <!-- <div class="bg-gradient-primary"> -->
    <div class="container">
        <!-- Outer Row -->
        <div class="row justify-content-center">

            <div class="col-xl-10 col-lg-12 col-md-9">
                <!-- <div class="alert alert-dark" role="alert">
  This is a dark alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
</div> -->
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
                                        <h1 class="h4 text-gray-900 mb-4">Create new account</h1>
                                    </div>
                                    <form class="user" v-show="this.signupState === 'sendingCode'" @submit="signup">
                                        <div class="form-group">
                                            <label for="username">Username</label>
                                            <input type="text" class="form-control form-control-user" id="username"
                                                aria-describedby="emailHelp" placeholder="Enter username"
                                                v-model="this.user.username" required>
                                        </div>

                                        <div class="form-group">
                                            <label>Email</label>
                                            <input type="email" class="form-control form-control-user"
                                                id="exampleInputEmail" aria-describedby="emailHelp"
                                                placeholder="Enter email" v-model="this.user.email" required>
                                            <!-- required -> default browser validation -->
                                        </div>

                                        <div class="form-group">
                                            <label for="exampleInputPassword">Password</label>
                                            <input type="password" class="form-control form-control-user"
                                                id="exampleInputPassword" aria-describedby="emailHelp"
                                                placeholder="Enter password" v-model="this.user.password" required>
                                        </div>

                                        <div class="form-group">
                                            <label for="exampleInputConfirmPassword">Confirm password</label>
                                            <input type="password" class="form-control form-control-user"
                                                id="exampleInputConfirmPassword" aria-describedby="emailHelp"
                                                placeholder="Confirm password" v-model="this.user.confirmPassword"
                                                required>
                                        </div>

                                        <div class="text-center">
                                            <a class="small" @click="this.$router.push({ path: `/login` })">Back to
                                                login</a>
                                        </div>


                                        <button :disabled="isProcessing" type="submit"
                                            class="btn btn-primary btn-user btn-block">Submit</button>
                                    </form>

                                    <form v-if="this.signupState === 'submittingCode'">
                                        <div class="form-group">
                                            <input type="text" class="form-control form-control-user" id=""
                                                aria-describedby="emailHelp" placeholder="Enter code sent to your email"
                                                v-model="this.user.code">
                                        </div>

                                        <button v-show="this.signupState === 'submittingCode'" :disabled="isProcessing"
                                            class="btn btn-primary btn-user btn-block" type="submit"
                                            @click="verifyCode">Submit
                                            code</button>
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

import { signup, verifyCode } from '../utils/auth-api.js'
export default {
    data() {
        return {
            user: {
                username: '',
                email: '',
                code: '',
                password: '',
                confirmPassword: ''
            },
            errorMessage: '',
            isProcessing: false,
            signupState: 'sendingCode',
            passwordsMatch: true
        }
    },
    methods: {
        signup() {
            event.preventDefault();
            if (!this.validatePasswords()) {
                return
            }
            this.isProcessing = true
            signup(this.user).then((response) => {
                alert(response.data.message)
                this.isProcessing = false
                this.errorMessage = ''
                this.signupState = 'submittingCode'
            }).catch((error) => {
                console.log(error)
                // alert(error.response.data.error)
                this.errorMessage = error.response.data.error
                this.isProcessing = false
            })
        },
        validatePasswords() {
            if (this.user.password !== this.user.confirmPassword) {
                this.passwordsMatch = false
                this.errorMessage = 'Password not match.'
                return false
            } else {
                this.passwordsMatch = true;
                this.errorMessage = ''
                return true
            }
        },
        verifyCode() {
            if (this.user.code === null || this.user.code === '') {
                alert("Active code must not be empty!")
            }
            this.isProcessing = true
            verifyCode(this.user).then((response) => {
                this.isProcessing = false
                alert("Acount actived!")
                this.$router.push({ path: `/login` })
            }).catch((error) => {
                console.log(error)
                this.isProcessing = false
                this.errorMessage = error.response.data.error

            })
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