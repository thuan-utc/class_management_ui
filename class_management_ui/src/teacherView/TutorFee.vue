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
                                <i class="fa fa-regular fa-calculator"></i>
                                Tìm kiếm
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div class="card shadow mb-4" v-if="listTutorFeeTableConfig !== null">
            <div class="card-header py-3">
                <div class="d-flex justify-content-between align-items-center">
                    <h6 class="m-0 font-weight-bold text-primary">Học phí đã tính</h6>
                    <!-- <button class="btn btn-success btn-sm" type="button">
                        <i class="fa fas fa-download"></i>
                        H
                    </button> -->

                </div>
            </div>
            <div class="card-body">

                <div class="row"><data-table :config="listTutorFeeTableConfig"></data-table></div>
            </div>
        </div>

        <div class="card shadow mb-4" v-if="detailTutorFeeTableConfig !== null">
            <div class="card-header py-3 col-12">
                <h6 class="m-0 font-weight-bold text-primary col-4">Chi tiết</h6>
            </div>
            <div class="card-header py-3 col-12">
                <div class="d-flex align-items-end flex-wrap">
                    <div class="form-group d-flex align-items-center col-sm-6 col-md-3 col-lg-3 col-xl-2 mb-0">
                        <label for="month" class="mr-2 mb-0">Tháng</label>
                        <input disabled type="number" class="form-control" v-model="month" min="1" max="12">
                    </div>
                    <div class="form-group d-flex align-items-center col-sm-6 col-md-3 col-lg-3 col-xl-2 mb-0 ml-3">
                        <label for="year" class="mr-2 mb-0">Năm</label>
                        <input disabled type="number" class="form-control" v-model="year">
                    </div>
                    <div v-if="totalFee !== null" class="form-group d-flex align-items-center col-sm-6 mb-0 ml-3">
                        <label for="totalFee" class="mr-2 mb-0">Tổng học phí</label>
                        <span class="mr-2">{{ totalFee }} vnd</span>
                        <i class="fa fa-solid fa-money-bill"></i>
                    </div>
                </div>
            </div>

            <div class="card-body">
                <div class="row"><data-table :config="detailTutorFeeTableConfig"></data-table></div>
            </div>
        </div>
    </div>
</template>

<script>
// import { calculateMonthlyFeeApi } from '../utils/tuition-fee-api.js'
import moment from 'moment'

export default {
    name: 'tutor-fee',
    props: ['classIdFromParent'],
    data() {
        return {
            classId: null,
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
            totalFee: '100',
            selectedClass: null,
            listTutorFeeTableConfig: null,
            detailTutorFeeTableConfig: null
        }
    },
    methods: {
        calculateMonthlyFee() {
            if (!this.classId || !this.month || !this.year) {
                alert("Vui lòng nhập đầy đủ thông tin.");
                return;
            }
            // calculateMonthlyFeeApi(this.classId, this.month, this.year).then((response) => {
            //     this.totalFee = response.data.totalFee;
            // }).catch((error) => {
            //     console.error("Error calculating monthly fee: ", error);
            //     alert("Không tính được học phí. Vui lòng thử lại sau.");
            // });
        },
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
                this.isPageList = false
                if (this.listTutorFeeTableConfig === null) {
                    this.initListTutorFeeTableConfig()
                } else {
                    $('#' + this.listTutorFeeTableConfig.id).DataTable().draw()
                }
            }).catch((error) => {
                console.log("Error fecth class detail " + error)
                alert('Không tìm thấy thông tin')
            })
        },
        initListTutorFeeTableConfig() {
            this.scheduleTableConfig = {
                id: 'scheduleTable',
                events: [
                    {
                        event: 'click',
                        selector: '.btn-check-attandance',
                        handler: this.checkAttandance
                    }
                ],
                datatable: {
                    order: [[5, 'desc']],
                    searching: false,
                    lengthChange: !1,
                    pageLength: 5,
                    select: 0,
                    scrollX: true,
                    scrollX: '200px',
                    bServerSide: true,
                    bProcessing: false,
                    sAjaxSource: '',
                    language: {
                        processing: '<div class="spinner-grow spinner-grow-lg text-primary" aria-hidden="false" aria-label="Loading" role="status"/>'
                    },
                    aoColumns: [
                        { sTitle: 'Id', mData: 'id', bVisible: true },
                        { sTitle: 'Ngày', mData: 'day' },
                        {
                            sTitle: 'Ngày trong tuần',
                            mData: 'dayInWeek',
                            mRender: function (data, type, full) {
                                if (data === 'MONDAY') {
                                    return "Thứ 2"
                                } else if (data === 'TUESDAY') {
                                    return "Thứ 3"
                                } else if (data === 'WEDNESDAY') {
                                    return "Thứ 4"
                                } else if (data === 'THURSDAY') {
                                    return "Thứ 5"
                                } else if (data === 'FRIDAY') {
                                    return "Thứ 6"
                                } else if (data === 'SATURDAY') {
                                    return "Thứ 7"
                                } else if (data === 'SUNDAY') {
                                    return "Chủ nhật"
                                }
                            }
                        },
                        {
                            sTitle: 'Ca học trong ngày',
                            mData: 'periodInDay',
                            mRender: function (data, type, full) {
                                if (data === 'PERIOD_1') {
                                    return "Ca 1"
                                } else if (data === 'PERIOD_2') {
                                    return "Ca 2"
                                } else if (data === 'PERIOD_3') {
                                    return "Ca 3"
                                } else if (data === 'PERIOD_4') {
                                    return "Ca 4"
                                } else if (data === 'PERIOD_5') {
                                    return "Ca 5"
                                } else if (data === 'PERIOD_6') {
                                    return "Ca 6"
                                }
                            }
                        },
                        {
                            sTitle: 'Ngày tạo', mData: 'createdDate',
                            mRender: function (data, type, full) {
                                return data !== null ? moment(data).format('YYYY/MM/DD hh:mm:ss') : ''
                            }
                        },
                        {
                            sTitle: 'Điểm danh',
                            mData: 'id',
                            mRender: function (data, tupe, full) {
                                return `<button class="btn btn-outline-warning btn-sm btn-check-attandance mr-2">
                          <span class="icon text-gray-600"><i class="fa fas fa-edit"></i></span> </button>`
                            }
                        }
                    ],
                    fnServerData: this.getAllSchedule

                }
            }
        }
    },
    mounted() {
        const classIdFromParent = this.$route.params.classIdFromParent
        if (classIdFromParent) {
            this.classId = classIdFromParent
        }
        if (this.classId) {
            this.getClacalculateMonthlyFeessInfo()
        }
    }
}
</script>
