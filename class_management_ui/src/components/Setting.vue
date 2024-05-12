<template>
    <div class="container">
        <div class="card shadow mb-4">
            <div class="card-header">
                <h3 class="m-0 font-weight-bold text-primary">Thông tin tài khoản</h3>
            </div>
            <div class="card-body">
                <div class="form-group row">
                    <label for="className" class="col-sm-2 col-form-label">Loại tài khoản:</label>
                    <div class="col-sm-3">
                        <input disabled id="className" class="form-control" type="text" v-model="user.accountType">
                    </div>

                    <label for="note" class="col-sm-2 col-form-label">Tên đăng nhập:</label>
                    <div class="col-sm-3">
                        <input disabled id="note" class="form-control" v-model="user.username">
                    </div>
                </div>

                <div class="form-group row">
                    <label for="className" class="col-sm-2 col-form-label">Tên họ:</label>
                    <div class="col-sm-3">
                        <input :disabled="!isEdting" id="className" class="form-control" type="text" v-model="user.firstName">
                    </div>

                    <label for="note" class="col-sm-2 col-form-label">Tên đệm:</label>
                    <div class="col-sm-3">
                        <input :disabled="!isEdting" id="note" class="form-control" v-model="user.surname">
                    </div>
                </div>

                <div class="form-group row">
                    <label for="className" class="col-sm-2 col-form-label">Tên:</label>
                    <div class="col-sm-3">
                        <input :disabled="!isEdting" id="className" class="form-control" type="text" v-model="user.lastName">
                    </div>

                    <label for="note" class="col-sm-2 col-form-label">Ngày sinh:</label>
                    <div class="col-sm-3">
                        <input :disabled="!isEdting" type="date" class="form-control" v-model="user.dob">
                    </div>
                </div>

                <div class="form-group row">
                    <label for="className" class="col-sm-2 col-form-label">Email:</label>
                    <div class="col-sm-3">
                        <input disabled id="className" class="form-control" type="text" v-model="user.email">
                    </div>

                    <label for="note" class="col-sm-2 col-form-label">Số điện thoại:</label>
                    <div class="col-sm-3">
                        <input :disabled="!isEdting" id="note" class="form-control" v-model="user.phone">
                    </div>
                </div>

            </div>
            <div class="card-footer d-flex justify-content-end">
                <button v-show="!isEdting"class="btn btn-warning mr-2" type="button" @click="enableEdit">
                    <i class="fa fas fa-edit"></i>
                    Sửa
                </button>
                <button v-show="isEdting" class="btn btn-secondary mr-2" type="button" @click="disableEdit">
                    <i class="fa fas fa-times"></i>
                    Hủy
                </button>
                <button v-show="isEdting" class="btn btn-info mr-2" type="button" @click="saveInfo">
                    <i class="fa fas fa-save"></i>
                    Lưu
                </button>
            </div>
        </div>


    </div>
</template>
<script>
import moment from 'moment';
import { getUserInfo, updateUserInfo} from '../utils/user-api'
export default {
    name: 'setting',
    data() {
        return {
            user: {},
            isEdting: false
        }
    },
    computed: {
        formattedDate() {
            return moment(this.user.dob).format("DD/MM/YYYY");
        }
    },
    methods: {
        getUserInfo() {
            getUserInfo().then((response) => {
                this.user = response
                console.log(response)
            }).catch((error) => {
                console.log(error)
                alert("Không thể lấy thông tin người dùng!")
            })
        },
        enableEdit() {
            this.isEdting = true
        },
        disableEdit() {
            this.isEdting = false
            this.getUserInfo()
        },
        saveInfo() {
            updateUserInfo(this.user).then((response) =>{
                this.user = response
            }).catch((error) => {
                console.log(error)
                alert("Không thể cập nhật thông tin!")
            })
            this.isEdting = false
            
        }
    },
    mounted() {
        this.getUserInfo()
    }
}
</script>
