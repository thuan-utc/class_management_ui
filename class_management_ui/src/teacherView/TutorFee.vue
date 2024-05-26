<template>
    <div class="container-fluid">
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h5 class="m-0 font-weight-bold text-primary">Tính học phí</h5>
            </div>
            <div class="card-body">
                <form @submit.prevent='getClassInfo'>
                    <div class="row d-flex align-items-end">
                        <div class="form-group col-sm-6 col-md-3 col-lg-3 col-xl-2">
                            <label for="classId">ID lớp</label>
                            <input type='number' class='form-control' v-model='classId'>
                        </div>
                        <div class="form-group col-sm-6 col-md-3 col-lg-3 col-xl-2 d-flex justify-content-end">
                            <button class='btn btn-info' type='submit'>
                                <i class="fa fa-search"></i>
                                Tìm kiếm
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div class="card shadow mb-4" v-if="selectedClass !== null">
            <div class="card-header py-3">
                <div class="d-flex justify-content-between align-items-center">
                    <h6 class="m-0 font-weight-bold text-primary">Học phí theo tháng</h6>
                </div>
            </div>
            <div class="card-body">
                <form @submit.prevent=''>
                    <div class="row">
                        <div class="form-group col-4">
                            <label for="className" class="col-12 col-form-label">Tên lớp:</label>
                            <div class="col-sm-12">
                                <input disabled id="className" class="form-control" type="text"
                                    v-model="selectedClass.className">
                            </div>
                        </div>
                        <div class="form-group col-4">
                            <label for="subjectName" class="col-sm-12 col-form-label">Tên môn:</label>
                            <div class="col-sm-12">
                                <input disabled id="subjectName" class="form-control" type="text"
                                    v-model="selectedClass.subjectName">
                            </div>
                        </div>
                        <div class="form-group col-4">
                            <label for="note" class="col-sm-12 col-form-label">Ghi chú:</label>
                            <div class="col-sm-12">
                                <textarea disabled id="note" class="form-control"
                                    v-model="selectedClass.note"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-4">
                            <label for="className" class="col-12 col-form-label">Tháng:</label>
                            <div class="col-sm-12">
                                <input type="number" class="form-control" v-model="month" min="1" max="12">
                            </div>
                        </div>
                        <div class="form-group col-4">
                            <label for="className" class="col-12 col-form-label">Năm:</label>
                            <div class="col-sm-12">
                                <input type="number" class="form-control" v-model="year">
                            </div>
                        </div>
                        <div class="form-group col-4">
                            <label for="className" class="col-12 col-form-label">Giá 1 buổi học (VND):</label>
                            <div class="col-sm-12">
                                <input type="number" class="form-control" v-model="classSessionPrice">
                            </div>
                        </div>

                    </div>
                    <div class="row d-flex justify-content-end mb-3">
                        <div class="form-group col-6 d-flex justify-content-end">
                            <button class='btn btn-success' @click="showListTutorFee">
                                <i class="fa fa-calculator"></i>
                                Tính toán
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div class="card shadow mb-4" v-if="tutorFeeTable !== null">
            <div class="card-header py-3 col-12 tutor-fee-header">
                <div class="d-flex justify-content-between align-items-center">
                    <h6 class="m-0 font-weight-bold text-primary">Chi tiết</h6>
                    <div v-if="totalFee !== null" class="form-group d-flex align-items-center mr-3">
                            <label for="totalFee" class="mr-2 mb-0">Tổng học phí</label>
                            <span class="mr-2">{{ totalFee }} vnd</span>
                            <i class="fa fa-solid fa-money-bill"></i>
                        </div>
                    <div class="d-flex align-items-center">
                        <button class="btn btn-sm btn-primary mr-3" @click="sendEmail">
                            <i class="fa fa-envelope"></i> Gửi Email
                        </button>
                        <button class="btn btn-sm btn-success" @click="downloadFile">
                            <i class="fa fa-download"></i> Tải Xuống (XLSX)
                        </button>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="row"><data-table :config="tutorFeeTable"></data-table></div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import { calculateTutorFee } from '../utils/tutor-fee-api'
import { getClassDetail } from '../utils/all-class-room-api.js'
import DataTable from '@/common/DataTable.vue'

export default {
    name: 'tutor-fee',
    components: {
        DataTable
    },
    props: ['classIdFromParent'],
    data() {
        return {
            classId: null,
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
            totalFee: null,
            selectedClass: null,
            tutorFeeTable: null,
            classSessionPrice: '50000'
        }
    },
    methods: {
        updateRoute() {
            // Update the route with the new classId value
            if (this.classId) {
                this.$router.replace({ name: 'TutorFee', params: { classIdFromParent: this.classId } });
            } else {
                // If classId is empty, redirect to the route without classId parameter
                this.$router.replace({ name: 'TutorFee' });
            }
        },
        getClassInfo() {
            getClassDetail(this.classId).then((response) => {
                this.selectedClass = response
            }).catch((error) => {
                console.log("Error fecth class detail " + error)
                alert('Không tìm thấy thông tin')
            })
        },
        initTutorFeeTable() {
            this.tutorFeeTable = {
                id: 'tutor-fee-table',
                datatable: {
                    order: [[0, 'desc']],
                    searching: false,
                    lengthChange: !1,
                    pageLength: 5,
                    select: 0,
                    paging: false,
                    scrollX: true,
                    scrollY: true,
                    scrollY: '200px',
                    bServerSide: true,
                    bProcessing: false,
                    sAjaxSource: '',
                    language: {
                        processing: '<div class="spinner-grow spinner-grow-lg text-primary" aria-hidden="false" aria-label="Loading" role="status"/>'
                    },
                    aoColumns: [
                        { sTitle: 'Họ tên', mData: 'studentName' },
                        { sTitle: 'Email', mData: 'email' },
                        { sTitle: 'Số điện thoại', mData: 'phone' },
                        { sTitle: 'Số buổi đi học', mData: 'numberOfClassesAttended' },
                        { sTitle: 'Tổng số buổi', mData: 'totalNumberOfClasses' },
                        {
                            sTitle: 'Thành tiền', mData: 'feeAmount',
                            mRender: function (data, type, full) {
                                if (typeof data === 'number') {
                                    // Format the number with commas for thousands separators
                                    return data.toLocaleString('en-US') + ' vnd';
                                } else {
                                    return data;
                                }
                            }
                        }
                    ],
                    fnServerData: this.getListTutorFee

                }
            }
        },
        getListTutorFee(sSource, aoData, fnCallback) {
            // let paramMap = {}
            // for (let i = 0; i < aoData.length; i++) {
            //     paramMap[aoData[i].name] = aoData[i].value
            // }
            // let pageSize = paramMap.length
            // let start = paramMap.start
            // let pageNum = (start === 0) ? 0 : (start / pageSize)
            // let sort = ''
            // if (paramMap.order && paramMap.order.length > 0) {
            //     sort = paramMap.columns[paramMap.order[0].column].data + ',' + paramMap.order[0].dir
            // } else {
            //     sort = paramMap.columns[0].data + ',asc'
            // }
            // let restParams = {}
            // restParams.size = pageSize
            // restParams.page = pageNum
            // restParams.sort = sort
            // restParams.classId = this.classId
            let data = {}
            let restParams = {}
            restParams.classId = this.classId
            restParams.month = this.month
            restParams.year = this.year
            restParams.classSessionPrice = this.classSessionPrice
            calculateTutorFee(restParams).then((response) => {
                data.recordsTotal = response.totalElements
                data.recordsFiltered = response.totalElements
                data.data = response.content
                this.totalFee = response.content.reduce((acc, tutorFee) => {
                    return acc + tutorFee.feeAmount;
                }, 0);
                this.totalFee = this.totalFee.toLocaleString('en-US')
                fnCallback(data)
            }).catch((error) => {
                console.log(error)
                alert({
                    title: 'Error',
                    content: error.message
                })
            })
        },
        showListTutorFee() {
            if (this.classSessionPrice === null || this.classSessionPrice === '') {
                alert("Nhập giá 1 buổi học!")
                return
            }
            if (this.tutorFeeTable === null) {
                this.initTutorFeeTable()
            } else {
                $('#' + this.tutorFeeTable.id).DataTable().draw()
            }
        }
    },
    mounted() {
        const classIdFromParent = this.$route.params.classIdFromParent
        if (classIdFromParent) {
            this.classId = classIdFromParent
        }
        if (this.classId) {
            this.getClassInfo()
        }
    }
}
</script>
