<template>
    <div class="container-fluid">
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h5 class="m-0 font-weight-bold text-primary">Quản lý điểm danh</h5>
            </div>

            <div class="card-body">
                <!-- search search-->
                <form @submit.prevent='getClassInfo'>
                    <div class="row d-flex align-items-end">
                        <div class="form-group col-sm-6 col-md-3 col-lg-3 col-xl-2">
                            <label for="customerName">ID lớp</label>
                            <input type='number' class='form-control' v-model='classId' @input="updateRoute">
                        </div>

                        <div class="form-group col-sm-6 col-md-3 col-lg-3 col-xl-2 d-flex justify-content-end">
                            <button class='btn btn-info' type='submit'>
                                <i class="fa fa-search"></i>
                                Tìm kiếm
                            </button>
                        </div>
                    </div>
                </form>

                <div v-if="selectedClass !== null">
                    <div class="form-group row mb-3">
                        <label for="className" class="col-sm-2 col-form-label">Tên lớp:</label>
                        <div class="col-sm-3">
                            <input disabled id="className" class="form-control" type="text"
                                v-model="selectedClass.className">
                        </div>

                        <label for="createdDate" class="col-sm-2 col-form-label">Ngày tạo:</label>
                        <div class="col-sm-3">
                            <input disabled id="createdDate" class="form-control" type="text"
                                v-model="formattedCreatedDate">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="subjectName" class="col-sm-2 col-form-label">Tên môn:</label>
                        <div class="col-sm-3">
                            <input disabled id="subjectName" class="form-control" type="text"
                                v-model="selectedClass.subjectName">
                        </div>

                        <label for="note" class="col-sm-2 col-form-label">Ghi chú:</label>
                        <div class="col-sm-3">
                            <textarea disabled id="note" class="form-control" v-model="selectedClass.note"></textarea>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="card shadow mb-4" v-if="scheduleTableConfig !== null">
            <div class="card-body">
                <div class="row d-flex justify-content-end mb-3">
                    <button class="btn btn-success btn-sm" type="button" @click="downloadAttendanceResult">
                        <i class="fa fas fa-download"></i>
                        Kết quả điểm danh
                    </button>
                </div>
                <div class="row"><data-table :config="scheduleTableConfig"></data-table></div>
            </div>
        </div>

        <div class="card shadow mb-4" v-if="classAttendanceTableConfig !== null">
            <div class="card-header py-3 col-12 tutor-fee-header">
                <div class="d-flex justify-content-between align-items-center">
                    <h6 class="m-0 font-weight-bold text-primary">Chi tiết</h6>
                </div>
            </div>

            <div class="card-header">
                <div class="row">
                    <div class="col-6">
                        <form class="row">
                            <div class="form-group col-7">
                                <label for="className" class="col-12 col-form-label">Ngày học:</label>
                                <div class="col-12">
                                    <input disabled id="className" class="form-control" type="text"
                                        v-model="selectedSchedule.day">
                                </div>
                            </div>
                            <div class="form-group col-7">
                                <label for="className" class="col-12 col-form-label">Ngày trong tuần:</label>
                                <div class="col-12">
                                    <input disabled id="className" class="form-control" type="text"
                                        :value="formattedDayInWeek">
                                </div>
                            </div>
                            <div class="form-group col-6">
                                <label for="className" class="col-12 col-form-label">Ca học:</label>
                                <div class="col-12">
                                    <input disabled id="className" class="form-control" type="text"
                                        :value="formattedPeriodInDay">
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="col-md-6">
                        <canvas id="attendanceChart" width="300" height="300"></canvas>
                    </div>
                </div>

            </div>

            <div class="card-body">
                <div class="row">
                    <div class="col d-flex justify-content-end">
                        <button v-if="editAble" class="btn btn-info btn mr-2" type="button" @click="attendAll">
                            <i class="fa fas fa-check-square"></i>
                            Điểm danh tất cả
                        </button>
                        <button v-if="editAble" class="btn btn-success btn mr-2" type="button" @click="submitResult">
                            <i class="fa fas fa-save"></i>
                            Lưu
                        </button>
                        <button v-if="!editAble" class="btn btn-warning btn mr-2" type="button"
                            @click="this.editAble = true">
                            <i class="fa fas fa-edit"></i>
                            Sửa
                        </button>
                        <button v-else="!editAble" class="btn btn-secondary btn mr-2" type="button"
                            @click="this.editAble = false">
                            <i class="fa fas fa-times"></i>
                            Hủy
                        </button>
                    </div>

                </div>
                <div class="row"> <!--:class="editAble ? '' : 'disabled-table'"?-->
                    <data-table :config="classAttendanceTableConfig"></data-table>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import { searchSchedule } from '../utils/class-schedule-api.js'
import DataTable from '@/common/DataTable.vue'
import { getClassDetail } from '../utils/all-class-room-api.js'
import { fetchClassAttendance, saveClassAttendanceResult, downloadAttendanceResult } from '@/utils/class-attendance-api.js'
import Chart from 'chart.js/auto'

import moment from 'moment'
import { error } from 'jquery'
export default {
    name: 'class-attendance',
    components: {
        DataTable
    },
    props: ['classIdFromParent'],
    data() {
        return {
            classId: null,
            scheduleId: null,
            scheduleTableConfig: null,
            classAttendanceTableConfig: null,
            selectedClass: null,
            selectedSchedule: null,
            attendanceChartData: null,
            attendanceChart: null,
            editAble: false
        }
    },
    computed: {
        formattedCreatedDate() {
            return moment(this.selectedClass.createdDate).format("DD/MM/YYYY")
        },
        formattedScheduleDay() {
            return moment(this.selectedSchedule.day).format("DD/MM/YYYY")
        },
        formattedDayInWeek() {
            let data = this.selectedSchedule.dayInWeek
            switch (data) {
                case 'MONDAY':
                    return "Thứ 2"
                case 'TUESDAY':
                    return "Thứ 3"
                case 'WEDNESDAY':
                    return "Thứ 4"
                case 'THURSDAY':
                    return "Thứ 5"
                case 'FRIDAY':
                    return "Thứ 6"
                case 'SATURDAY':
                    return "Thứ 7"
                case 'SUNDAY':
                    return "Chủ nhật"
                default:
                    return ''
            }
        },
        formattedPeriodInDay() {
            let data = this.selectedSchedule.periodInDay
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
            return ''
        }
    },
    watch: {
        '$el': {
            handler() {
                // Whenever the component's DOM is updated, reattach the event listeners
                this.attachCheckboxEventListeners()
            },
            deep: true,
        },
        editAble(newVal) {
            // When editAble changes, update DataTable rendering
            $('#' + this.classAttendanceTableConfig.id).DataTable().draw()
        }
    },
    methods: {
        initScheduleTable() {
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
        },
        getAllSchedule(sSource, aoData, fnCallback) {
            let paramMap = {}
            for (let i = 0; i < aoData.length; i++) {
                paramMap[aoData[i].name] = aoData[i].value
            }
            let pageSize = paramMap.length
            let start = paramMap.start
            let pageNum = (start === 0) ? 0 : (start / pageSize)
            let sort = ''
            if (paramMap.order && paramMap.order.length > 0) {
                sort = paramMap.columns[paramMap.order[0].column].data + ',' + paramMap.order[0].dir
            } else {
                sort = paramMap.columns[0].data + ',asc'
            }
            let restParams = {}
            restParams.size = pageSize
            restParams.page = pageNum
            restParams.sort = sort
            restParams.classId = this.classId
            let data = {}
            searchSchedule(restParams).then((response) => {
                data.recordsTotal = response.totalElements
                data.recordsFiltered = response.totalElements
                data.data = response.content
                fnCallback(data)
            }).catch((error) => {
                console.log(error)
                alert({
                    title: 'Error',
                    content: error.message
                })
            })
        },
        getClassInfo() {
            getClassDetail(this.classId).then((response) => {
                this.selectedClass = response
                this.isPageList = false
                if (this.scheduleTableConfig === null) {
                    this.initScheduleTable()
                } else {
                    $('#' + this.scheduleTableConfig.id).DataTable().draw()
                }
            }).catch((error) => {
                console.log("Error fecth class detail " + error)
                alert('Không tìm thấy thông tin')
            })
        },
        initClassAttendanceTable() {
            this.classAttendanceTableConfig = {
                id: 'classAttendanceTable',
                datatable: {
                    order: [[0, 'desc']],
                    searching: false,
                    lengthChange: !1,
                    pageLength: 10,
                    paging: false,
                    select: 0,
                    scrollX: true,
                    scrollY: '200px',
                    bServerSide: true,
                    bProcessing: false,
                    sAjaxSource: '',
                    language: {
                        processing: '<div class="spinner-grow spinner-grow-lg text-primary" aria-hidden="false" aria-label="Loading" role="status"/>'
                    },
                    aoColumns: [
                        { sTitle: 'Id', mData: 'id', bVisible: true },
                        { sTitle: 'Họ tên', mData: 'name' },
                        { sTitle: 'Email', mData: 'email' },
                        {
                            sTitle: 'Điểm danh', mData: 'isAttended',
                            mRender: function (data, type, full) {
                                const disabledAttr = this.editAble ? '' : 'disabled="disabled"';
                                return `<input type="checkbox" class="attend-checkbox" data-id="${full.id}" ${data ? 'checked' : ''} ${disabledAttr}>`;

                            }.bind(this)
                            // return '<input type="checkbox" class="attend-checkbox" data-id="' + full.id + '" ' + (data ? 'checked' : '') + '>'

                        }
                    ],
                    fnServerData: this.fetchClassAttendance
                }
            }
        },
        fetchClassAttendance(sSource, aoData, fnCallback) {
            fetchClassAttendance(this.scheduleId).then((response) => {
                let data = {}
                data.recordsTotal = response.totalElements
                data.recordsFiltered = response.totalElements
                data.data = response.content
                fnCallback(data)
                this.attachCheckboxEventListeners()
                this.attendanceChartData = data.data
                this.updateAttendanceChart(data.data)
            }).catch((error) => {
                console.log("Error fecth class detail " + error)
                alert('Không tìm thấy thông tin')
            })
        },
        checkAttandance(e) {
            let currentRow = $(e.target.closest('table')).dataTable().api().row(e.target.closest('tr')).data()
            this.scheduleId = currentRow.id
            this.selectedSchedule = currentRow
            if (this.classAttendanceTableConfig === null) {
                this.initClassAttendanceTable()
                if (this.editAble) {
                    this.editAble = false
                }
            } else {
                $('#' + this.classAttendanceTableConfig.id).DataTable().draw()
                if (this.editAble) {
                    this.editAble = false
                }
            }
        },
        submitResult() {
            let attendanceData = []
            console.log($)
            let rows = $('#' + this.classAttendanceTableConfig.id).DataTable().rows().nodes()
            rows.each((index, row) => {
                let rowData = $('#' + this.classAttendanceTableConfig.id).DataTable().row(row).data()
                let studentId = rowData.id
                let isChecked = rowData.isAttended

                attendanceData.push({
                    id: studentId,
                    isAttended: isChecked
                })
            })
            saveClassAttendanceResult(attendanceData).then((response) => {
                console.log("Save class attendance result successfully")
                alert("Đã lưu")
                // this.updateAttendanceChart(response.content)
                this.attendanceChartData = response.content
                this.editAble = false
            }).catch((error) => {
                console.log(error)
                alert("", "Lưu thất bại!")
                this.editAble = false
            })

        },
        attachCheckboxEventListeners() {
            const checkboxes = this.$el.querySelectorAll('.attend-checkbox')
            checkboxes.forEach(checkbox => {
                checkbox.removeEventListener('change', this.handleCheckboxChange)
                checkbox.addEventListener('change', this.handleCheckboxChange)
            })
        },

        handleCheckboxChange(e) {
            const checkbox = e.target
            const isChecked = checkbox.checked
            const row = checkbox.closest('tr')
            const rowIndex = $('#' + this.classAttendanceTableConfig.id).DataTable().row(row).index()
            const rowData = $('#' + this.classAttendanceTableConfig.id).DataTable().row(rowIndex).data()
            rowData.isAttended = isChecked
            const updatedAttendanceData = this.attendanceChartData.map((data) => {
                if (data.id === rowData.id) {
                    return {
                        ...data,
                        isAttended: isChecked
                    };
                } else {
                    return data;
                }
            });

            this.attendanceChartData = updatedAttendanceData;

            this.updateAttendanceChart(this.attendanceChartData);
        },
        updateRoute() {
            // Update the route with the new classId value
            if (this.classId) {
                this.$router.replace({ name: 'ClassAttendance', params: { classIdFromParent: this.classId } })
            } else {
                // If classId is empty, redirect to the route without classId parameter
                this.$router.replace({ name: 'ClassAttendance' })
            }
        },
        updateAttendanceChart(attendanceData) {
            const attendedCount = attendanceData.filter(student => student.isAttended).length
            const notAttendedCount = attendanceData.length - attendedCount
            this.$nextTick(() => {
                // Destroy existing chart if it exists
                if (this.attendanceChart) {
                    this.attendanceChart.destroy()
                }

                const ctx = document.getElementById('attendanceChart').getContext('2d')
                this.attendanceChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: ['Đi học', 'Nghỉ học'],
                        datasets: [{
                            data: [attendedCount, notAttendedCount],
                            backgroundColor: ['#36a2eb', '#ff6384']
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false
                    }
                })
            })
        },
        formateDate(date) {
            return moment(date).format("DD/MM/YYYY")
        },
        downloadAttendanceResult() {
            downloadAttendanceResult(this.classId).catch((error) => {
                console.log(error)
                alert("Không thể tải file!")
            })
        },
        attendAll() {
            // Check all checkboxes in the table
            $('#' + this.classAttendanceTableConfig.id + ' .attend-checkbox').each((index, checkbox) => {
                checkbox.checked = true;
            });

            // Update the underlying data
            let rows = $('#' + this.classAttendanceTableConfig.id).DataTable().rows().nodes();
            rows.each((index, row) => {
                let rowData = $('#' + this.classAttendanceTableConfig.id).DataTable().row(row).data();
                rowData.isAttended = true;
            });

            // Optional: Redraw the table to reflect changes
            // $('#' + this.classAttendanceTableConfig.id).DataTable().draw();
            const updatedAttendanceData = this.attendanceChartData.map((data) => {
                return {
                        ...data,
                        isAttended: true
                    };
            });

            this.attendanceChartData = updatedAttendanceData;
            this.updateAttendanceChart(this.attendanceChartData)

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

<style scoped>
.disabled-table {
    pointer-events: none;
    /* Disable pointer events */
    opacity: 0.6;
    /* Lower opacity */
    filter: grayscale(100%);
    /* Optional: grayscale effect */
}
</style>