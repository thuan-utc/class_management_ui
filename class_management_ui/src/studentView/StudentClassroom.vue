<template>
  <div class="container-fluid">
    <div class="fade-in" v-if="isPageList">
      <!-- search card -->
      <div class="card shadow mb-4">
        <!-- Card Header - Accordion -->
        <a ref="searchLink" href="#searchCriteriaCard" class="d-block card-header py-3" data-toggle="collapse"
          role="button" aria-expanded="false" aria-controls="searchCriteriaCard">
          <h5 class="m-0 font-weight-bold text-primary">Thông tin lớp học</h5>
        </a>
        <!-- Card Content - Collapse -->
        <div class="collapse" id="searchCriteriaCard" style="">
          <div class="card-body">
            <!-- search search-->
            <form @submit.prevent='search' @reset='reset'>
              <div class="row">
                <div class="form-group col-sm-6 col-md-3 col-lg-3 col-xl-2">
                  <label for="customerName">Tên lớp</label>
                  <input type='text' class='form-control' v-model='searchCriteria.className'>
                </div>

                <div class="form-group col-sm-5 col-md-3 col-lg-3 col-xl-2">
                  <label for="customerName">Tên môn</label>
                  <input type='text' class='form-control' v-model='searchCriteria.subjectName'>
                </div>
                <div class="form-group col-sm-6 col-md-3 col-lg-3 col-xl-3">
                  <label>Action</label>
                  <div>
                    <button type='reset' class='btn btn-md btn-warning btn-reset mr-2'>
                      <i class="fa fa-arrows"></i>
                      Làm mới
                    </button>
                    <button class='btn btn-info' type='submit' @click="search">
                      <i class="fa fa-search"></i>
                      Tìm kiếm
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- list all class -->
      <div class="card shadow mb-4">
        <div class="card-body">
          <data-table :config="tableConfig"></data-table>
        </div>
      </div>

      <!-- attendance result -->
      <div class="card shadow mb-4" v-if="classAttendanceTableConfig !== null">
        <div class="card-header py-3 col-12 tutor-fee-header">
          <div class="d-flex justify-content-between align-items-center">
            <h6 class="m-0 font-weight-bold text-primary">Kết quả điểm danh</h6>
          </div>
        </div>

        <div class="card-header">
          <div class="row">
            <div class="col-6">
              <form class="row">
                <div class="form-group col-7">
                  <label for="className" class="col-12 col-form-label">Giáo viên:</label>
                  <div class="col-12">
                    <input disabled id="className" class="form-control" type="text" v-model="selectedClass.teacherName">
                  </div>
                </div>
                <div class="form-group col-7">
                  <label for="className" class="col-12 col-form-label">Lớp học:</label>
                  <div class="col-12">
                    <input disabled id="className" class="form-control" type="text" v-model="selectedClass.className">
                  </div>
                </div>
                <div class="form-group col-7">
                  <label for="className" class="col-12 col-form-label">Môn học:</label>
                  <div class="col-12">
                    <input disabled id="className" class="form-control" type="text" v-model="selectedClass.subjectName">
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
            <data-table :config="classAttendanceTableConfig"></data-table>
          </div>
        </div>

      </div>

      <!-- exam result -->
      <div class="card shadow mb-4" v-if="examScoreTableConfig !== null">
        <div class="card-header py-3 col-12 tutor-fee-header">
          <div class="d-flex justify-content-between align-items-center">
            <h6 class="m-0 font-weight-bold text-primary">Danh sách điểm</h6>
          </div>
        </div>

        <div class="card-header">
          <div class="row">
            <div class="col-6">
              <form class="row">
                <div class="form-group col-7">
                  <label for="className" class="col-12 col-form-label">Giáo viên:</label>
                  <div class="col-12">
                    <input disabled id="className" class="form-control" type="text" v-model="selectedClass.teacherName">
                  </div>
                </div>
                <div class="form-group col-7">
                  <label for="className" class="col-12 col-form-label">Lớp học:</label>
                  <div class="col-12">
                    <input disabled id="className" class="form-control" type="text" v-model="selectedClass.className">
                  </div>
                </div>
                <div class="form-group col-7">
                  <label for="className" class="col-12 col-form-label">Môn học:</label>
                  <div class="col-12">
                    <input disabled id="className" class="form-control" type="text" v-model="selectedClass.subjectName">
                  </div>
                </div>
              </form>
            </div>
            <div class="col-md-6">
              <canvas id="examScoreChart" width="300" height="250"></canvas>
            </div>
          </div>
        </div>

        <div class="card-body">
          <div class="row">
            <data-table :config="examScoreTableConfig"></data-table>
          </div>
        </div>

      </div>

      <!-- tutorFee -->
      <div class="card shadow mb-4" v-if="tutorFeeTableConfig !== null">
        <div class="card-header py-3 col-12 tutor-fee-header">
          <div class="d-flex justify-content-between align-items-center">
            <h6 class="m-0 font-weight-bold text-primary">Danh sách học phí</h6>
          </div>
        </div>

        <div class="card-header">
          <form class="row">
            <div class="form-group col-4">
              <label for="className" class="col-12 col-form-label">Giáo viên:</label>
              <div class="col-12">
                <input disabled id="className" class="form-control" type="text" v-model="selectedClass.teacherName">
              </div>
            </div>
            <div class="form-group col-4">
              <label for="className" class="col-12 col-form-label">Lớp học:</label>
              <div class="col-12">
                <input disabled id="className" class="form-control" type="text" v-model="selectedClass.className">
              </div>
            </div>
            <div class="form-group col-4">
              <label for="className" class="col-12 col-form-label">Môn học:</label>
              <div class="col-12">
                <input disabled id="className" class="form-control" type="text" v-model="selectedClass.subjectName">
              </div>
            </div>
          </form>
        </div>

        <div class="card-body">
          <div class="row">
            <data-table :config="tutorFeeTableConfig"></data-table>
          </div>
        </div>

      </div>
    </div>

    <!-- class detail  -->
    <div class="fade-in" v-if="!isPageList">
      <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex justify-content-between align-items-center">
          <h6 class="m-0 font-weight-bold text-primary">Chi tiết lớp học</h6>
          <button class="btn btn-warning btn-sm" type="button" @click="backToList()">
            Quay lại
          </button>
        </div>
        <div class="card-body">
          <div class="form-group row">
            <label for="className" class="col-sm-2 col-form-label">Tên lớp:</label>
            <div class="col-sm-3">
              <input id="className" class="form-control" type="text" v-model="selectedClass.className">
            </div>

            <label for="createdDate" class="col-sm-2 col-form-label">Ngày tạo:</label>
            <div class="col-sm-3">
              <input disabled id="createdDate" class="form-control" type="text" v-model="formattedDate">
            </div>
          </div>
          <div class="form-group row">
            <label for="subjectName" class="col-sm-2 col-form-label">Tên môn:</label>
            <div class="col-sm-3">
              <input id="subjectName" class="form-control" type="text" v-model="selectedClass.subjectName">
            </div>
          </div>
        </div>
      </div>

      <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex justify-content-between align-items-center">
          <!-- <a href="#listStudent" class="d-block card-header py-3 collapsed" data-toggle="collapse" role="button"
            aria-expanded="false" aria-controls="listStudent"></a> -->
          <h6 class="m-0 font-weight-bold text-primary">Danh sách học viên</h6>
        </div>
        <div class="card-body" id="listStudent">
          <div class="row"><data-table :config="selectedClass.studentTableConfig"></data-table></div>
        </div>
      </div>

      <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex justify-content-between align-items-center">
          <h6 class="m-0 font-weight-bold text-primary">Lịch học</h6>
        </div>
        <div class="card-body">
          <div class="row"><data-table :config="selectedClass.scheduleTalbeConfig"></data-table></div>
        </div>
      </div>

      <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex justify-content-between align-items-center">
          <h6 class="m-0 font-weight-bold text-primary">Danh sách tài liệu</h6>
        </div>
        <div class="card-body">
          <div class="row"><data-table :config="selectedClass.documentTableConfig"></data-table></div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import DataTable from '@/common/DataTable.vue'
import { getClassDetail, searchClassForStudent } from '../utils/all-class-room-api'
import { getAllStudent } from '../utils/student-api'
import { getAllClassDocument, downloadFile } from '@/utils/document-api'
import { getAllSchedule } from '@/utils/class-schedule-api'
import { getUserInfo } from '../utils/user-api'
import { fetchStudentAttendanceResult } from '../utils/class-attendance-api'
import { fetchStudentExamResult, downloadExamResult } from '../utils/exam-score-api'
import { getStudentTutorFee } from '../utils/tutor-fee-api'
import moment from 'moment'
import Chart from 'chart.js/auto'
export default {
  name: 'student-classroom',
  components: {
    DataTable,
    Notification
  },
  data() {
    return {
      isLoading: false,
      isProcessing: false,
      isPageList: true,
      tableConfig: null,
      searchCriteria: {
        className: '',
        subjectName: '',
        startCreatedDate: '',
        endCreatedDate: ''
      },
      selectedClass: {
        id: null,
        className: '',
        subjectName: '',
        note: '',
        createdDate: null,
        studentTableConfig: '',
        scheduleTalbeConfig: '',
        documentTableConfig: '',
        teacherName: ''
      },
      classAttendanceTableConfig: null,
      examScoreTableConfig: null,
      studentInfo: null,
      attendanceChartData: null,
      attendanceChart: null,
      examScoreChartData: null,
      examScoreChart: null,
      tutorFeeTableConfig: null
    }
  },
  computed: {
    formattedDate() {
      return moment(this.selectedClass.createdDate).format("DD/MM/YYYY");
    }
  },
  methods: {
    initTable() {
      this.tableConfig = {
        id: 'classroomTable',
        events: [
          {
            event: 'click',
            selector: '.btn-class-detail',
            handler: this.showClassDetail
          },
          {
            event: 'click',
            selector: '.btn-show-attendance-result',
            handler: this.showAttendanceResult
          },
          {
            event: 'click',
            selector: '.btn-show-score-result',
            handler: this.showScoreResult
          },
          {
            event: 'click',
            selector: '.btn-show-tutor-fee',
            handler: this.showTutorFee
          }
        ],
        datatable: {
          order: [[5, 'desc']],
          searching: false,
          lengthChange: !1,
          pageLength: 5,
          select: 0,
          scrollX: '100px',
          scrollX: true,
          bServerSide: true,
          bProcessing: false,
          sAjaxSource: '',
          language: {
            processing: '<div class="spinner-grow spinner-grow-lg text-primary" aria-hidden="false" aria-label="Loading" role="status"/>'
          },
          aoColumns: [
            { sTitle: 'ID', mData: 'id', bVisible: true },
            { sTitle: 'Tên Lớp', mData: 'className' },
            { sTitle: 'Tên Môn', mData: 'subjectName' },
            { sTitle: 'Ghi chú', mData: 'note' },
            {
              sTitle: 'Ngày tạo', mData: 'createdDate',
              mRender: function (data, type, full) {
                return data !== null ? moment(data).format('YYYY/MM/DD hh:mm:ss') : ''
              }
            },
            {
              sTitle: 'Kết quả điểm danh', mData: 'id',
              mRender: function (data, type, full) {
                return `<button class="btn btn-outline-success btn-sm btn-show-attendance-result mr-2">
                            <span class="icon text-gray-600">
                              <i class="fas fa-user-check"></i>
                            </span>
                          </button>`
              }
            },
            {
              sTitle: 'Xem điểm', mData: 'id',
              mRender: function (data, type, full) {
                return `<button class="btn btn-outline-danger btn-sm btn-show-score-result mr-2">
                            <span class="icon text-gray-600"><i class="fa fa-regular fa-star"></i></i></span>
                          </button>`
              }
            },
            {
              sTitle: 'Học phí', mData: 'id',
              mRender: function (data, type, full) {
                return `<button class="btn btn-outline-warning btn-show-tutor-fee mr-2">
                            <span class="icon text-gray-600"><i class="fa fa-money-bill"></i></span>
                        </button>`
              }
            },
            {
              sTitle: 'Chi tiết', mData: 'id',
              mRender: function (data, type, full) {
                return `<button class="btn btn-outline-info btn-class-detail mr-2">
                            <span class="icon text-gray-600">
                              <i class="fa fa-solid fa-info-circle"></i>
                            </span>
                        </button>`
              }
            }
          ],
          fnServerData: this.getAllClassroom

        }
      }
    },
    getAllClassroom(sSource, aoData, fnCallback) {
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
      restParams = Object.assign(restParams, this.searchCriteria)
      let data = {}
      searchClassForStudent(restParams).then((response) => {
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
    showClassDetail(e) {
      let currentRow = $(e.target.closest('table')).dataTable().api().row(e.target.closest('tr')).data()
      getClassDetail(currentRow.id).then((response) => {
        this.selectedClass = response
        this.isPageList = false
        this.initClassDetail()

      }).catch((error) => {
        console.log("Error fecth class detail " + error)
        alert('Không tìm thấy thông tin')
      })

    },
    getClassInfo(classId) {
      getClassDetail(classId).then((response) => {
        this.selectedClass = response
      }).catch((error) => {
        console.log("Error fecth class detail " + error)
        alert('Không tìm thấy thông tin')
      })
    },
    showAttendanceResult(e) {
      this.resetView()
      let currentRow = $(e.target.closest('table')).dataTable().api().row(e.target.closest('tr')).data()
      this.examScoreTableConfig = null
      this.selectedClass = currentRow
      this.getClassInfo(currentRow.id)
      if (this.classAttendanceTableConfig === null) {
        this.initClassAttendanceTable()
      } else {
        $('#' + this.classAttendanceTableConfig.id).DataTable().draw()
      }
    },
    showScoreResult(e) {
      this.resetView()
      this.classAttendanceTableConfig = null
      let currentRow = $(e.target.closest('table')).dataTable().api().row(e.target.closest('tr')).data()
      this.selectedClass = currentRow
      this.getClassInfo(currentRow.id)
      if (this.examScoreTableConfig === null) {
        this.initExamResultTable()
      } else {
        $('#' + this.examScoreTableConfig.id).DataTable().draw()
      }
    },
    search() {
      $('#' + this.tableConfig.id).DataTable().draw()
    },
    reset() {
      this.searchCriteria = {
        className: '',
        subjectName: '',
        startCreatedDate: null,
        endCreatedDate: null
      }
      this.search()
    },
    backToList() {
      this.isPageList = true
    },
    initClassDetail() {
      this.selectedClass.studentTableConfig = {
        id: 'studentTable',
        datatable: {
          order: [[5, 'desc']],
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
            { sTitle: 'Họ', mData: 'firstName' },
            { sTitle: 'Tên đệm', mData: 'surname' },
            { sTitle: 'Tên', mData: 'lastName' },
            { sTitle: 'Email', mData: 'email' },
            {
              sTitle: 'Ngày đăng kí', mData: 'createdDate',
              mRender: function (data, type, full) {
                return data !== null ? moment(data).format('YYYY/MM/DD hh:mm:ss') : ''
              }
            }
          ],
          fnServerData: this.getAllStudent
        }
      }
      this.selectedClass.scheduleTalbeConfig = {
        id: 'scheduleTable',
        datatable: {
          order: [[1, 'asc']],
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
              sTitle: 'Người tạo', mData: 'createdBy'
            }
          ],
          fnServerData: this.getAllSchedule
        }
      }
      this.selectedClass.documentTableConfig = {
        id: 'documentTable',
        events: [
          {
            event: 'click',
            selector: '.btn-download-file',
            handler: this.downloadFile
          }
        ],
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
            { sTitle: 'Id', mData: 'id', bVisible: false },
            { sTitle: 'Tên tài liệu', mData: 'documentName' },
            {
              sTitle: 'Ngày tạo', mData: 'createdDate',
              mRender: function (data, type, full) {
                return data !== null ? moment(data).format('YYYY/MM/DD hh:mm:ss') : ''
              }
            },
            {
              sTitle: 'Người tạo', mData: 'createdBy'
            },
            {
              sTitle: 'Tải xuống',
              mData: 'id',
              mRender: function (data, tupe, full) {
                return `<button class="btn btn-outline-success btn-sm btn-download-file mr-2">
                            <span class="icon text-gray-600"><i class="fa fas fa-download"></i></span></button>`
              }
            }
          ],
          fnServerData: this.getAllClassDocument
        }
      }
    },
    getAllStudent(sSource, aoData, fnCallback) {
      getAllStudent(this.selectedClass.id).then((response) => {
        let data = {}
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
    getAllSchedule(sSource, aoData, fnCallback) {
      getAllSchedule(this.selectedClass.id).then((response) => {
        let data = {}
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
    getAllClassDocument(sSource, aoData, fnCallback) {
      getAllClassDocument(this.selectedClass.id).then((response) => {
        let data = {}
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
    downloadFile(e) {
      let currentRow = $(e.target.closest('table')).dataTable().api().row(e.target.closest('tr')).data()
      downloadFile(currentRow.id).catch((error) => {
        console.log(error)
        alert("Không thể tải file!")
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
            { sTitle: 'Ngày', mData: 'day' },
            {
              sTitle: 'Thứ', mData: 'day',
              mRender: function (data, type, full) {
                let date = new Date(data)
                let dayOfWeek = date.getDay()
                let daysOfWeek = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']
                let dayOfWeekStr = daysOfWeek[dayOfWeek];
                return dayOfWeekStr
              }
            },
            {
              sTitle: 'Ca học', mData: 'classPeriod',
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
                return ''
              }
            },
            {
              sTitle: 'Kết quả điểm danh', mData: 'attended',
              mRender: function (data, type, full) {
                return data ? '<span style="color: green;">&#x2714;</span>'
                  : '<input disabled type="checkbox" class="attend-checkbox" data-id="' + full.id + '" ' + (data ? 'checked' : '') + '>';
              }
            }
          ],
          fnServerData: this.fetchStudentAttendanceResult
        }
      }

    },
    fetchStudentAttendanceResult(sSource, aoData, fnCallback) {
      fetchStudentAttendanceResult(this.selectedClass.id).then((response) => {
        let data = {}
        data.recordsTotal = response.totalElements
        data.recordsFiltered = response.totalElements
        data.data = response.content
        fnCallback(data)
        this.updateAttendanceChart(data.data)
      }).catch((error) => {
        console.log("Error fecth class detail " + error)
        alert('Không tìm thấy thông tin')
      })
    },
    updateAttendanceChart(attendanceData) {
      const attendedCount = attendanceData.filter(student => student.attended).length
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
    initExamResultTable() {
      this.examScoreTableConfig = {
        id: 'examResultTable',
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
            { sTitle: 'Tên điểm', mData: 'examName' },
            {
              sTitle: 'Kết quả', mData: 'score',
              mRender: function (data, type, full) {
                return data
              }
            }
          ],
          fnServerData: this.fetchStudentExamResult
        }
      }
    },
    fetchStudentExamResult(sSource, aoData, fnCallback) {
      fetchStudentExamResult(this.selectedClass.id).then((response) => {
        let data = {}
        data.recordsTotal = response.totalElements
        data.recordsFiltered = response.totalElements
        data.data = response.content
        fnCallback(data)
        this.examScoreData = response.content
        this.renderExamScoreChart(data.data)
      }).catch((error) => {
        console.log("Error fecth class detail " + error)
        alert('Không tìm thấy thông tin')
      })
    },
    renderExamScoreChartOld() {
      const ctx = document.getElementById('examScoreChart').getContext('2d');
      if (this.examScoreChart) {
        this.examScoreChart.destroy();
      }
      this.examScoreChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.examScoreData.map(score => score.examName),
          datasets: [{
            label: 'Điểm số',
            data: this.examScoreData.map(score => score.score),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    },
    renderExamScoreChart() {
      const ctx = document.getElementById('examScoreChart').getContext('2d');

      // Destroy existing chart if it exists
      if (this.examScoreChart) {
        this.examScoreChart.destroy();
      }

      // Create new line chart
      this.examScoreChart = new Chart(ctx, {
        type: 'line', // Change type to line
        data: {
          labels: this.examScoreData.map(score => score.examName),
          datasets: [{
            label: 'Điểm số',
            data: this.examScoreData.map(score => score.score),
            fill: false, // Disable fill for line chart
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            pointBackgroundColor: 'rgba(54, 162, 235, 1)', // Optional: Customize point color
            pointBorderColor: 'rgba(54, 162, 235, 1)', // Optional: Customize point border color
            pointRadius: 5, // Optional: Customize point radius
            pointHoverRadius: 7, // Optional: Customize point hover radius
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              suggestedMax: 10
            }
          }
        }
      });
    },
    getUserInfo() {
      getUserInfo().then((response) => {
        this.userRole = response.role
        this.username = response.username
        if (response.lastName !== null && response.lastName !== '') {
          this.username = response.lastName
        }
      }).catch((error) => {
        console.log(error)
        // alert("Không thể tìm thấy thông tin người dùng!")
      })

    },
    resetView() {
      this.classAttendanceTableConfig = null
      this.examScoreTableConfig = null
      this.tutorFeeTableConfig = null
    },
    initTutorFeeTable() {
      this.tutorFeeTableConfig = {
        id: 'tutorFeeTable',
        events: [],
        datatable: {
          order: [[5, 'desc']],
          searching: false,
          lengthChange: !1,
          pageLength: 5,
          select: 0,
          scrollX: '100px',
          scrollX: true,
          bServerSide: true,
          bProcessing: false,
          sAjaxSource: '',
          language: {
            processing: '<div class="spinner-grow spinner-grow-lg text-primary" aria-hidden="false" aria-label="Loading" role="status"/>'
          },
          aoColumns: [
            { sTitle: 'ID', mData: 'id', bVisible: false },
            { sTitle: 'Năm', mData: 'year' },
            { sTitle: 'Tháng', mData: 'month' },
            { sTitle: 'Số buổi', mData: 'numberOfClassesAttended' },
            {
              sTitle: 'Giá tiền 1 buổi', mData: 'lessionPrice',
              mRender: function (data, type, full) {
                if (typeof data === 'number') {
                  // Format the number with commas for thousands separators
                  return data.toLocaleString('en-US') + ' vnd';
                } else {
                  return data;
                }
              }
            },
            {
              sTitle: 'Tổng tiền', mData: 'feeAmount',
              mRender: function (data, type, full) {
                if (typeof data === 'number') {
                  // Format the number with commas for thousands separators
                  return data.toLocaleString('en-US') + ' vnd';
                } else {
                  return data;
                }
              }
            },
            {
              sTitle: 'Đã đóng', mData: 'feeSubmitted',
              mRender: function (data, type, full) {
                if (typeof data === 'number') {
                  // Format the number with commas for thousands separators
                  return data.toLocaleString('en-US') + ' vnd';
                } else {
                  return data;
                }
              }
            },
            {
              sTitle: 'Còn nợ', mData: 'feeNotSubmitted',
              mRender: function (data, type, full) {
                if (typeof data === 'number') {
                  // Format the number with commas for thousands separators
                  return data.toLocaleString('en-US') + ' vnd';
                } else {
                  return data;
                }
              }
            },
            {
              sTitle: 'Ngày tạo', mData: 'createdDate',
              mRender: function (data, type, full) {
                return data !== null ? moment(data).format('YYYY/MM/DD hh:mm:ss') : ''
              }
            }
          ],
          fnServerData: this.getTutorFee

        }
      }
    },
    getTutorFee(sSource, aoData, fnCallback) {
      getStudentTutorFee(this.selectedClass.id).then((response) => {
        let data = {}
        data.recordsTotal = response.totalElements
        data.recordsFiltered = response.totalElements
        data.data = response.content
        fnCallback(data)
      }).catch((error) => {
        console.log("Error fecth class detail " + error)
        alert('Không tìm thấy thông tin')
      })
    },
    showTutorFee(e) {
      this.resetView()
      let currentRow = $(e.target.closest('table')).dataTable().api().row(e.target.closest('tr')).data()
      this.selectedClass = currentRow
      this.getClassInfo(currentRow.id)
      if (this.tutorFeeTableConfig === null) {
        this.initTutorFeeTable()
        $('#' + this.tutorFeeTableConfig.id).DataTable().draw()
      } else {
        $('#' + this.tutorFeeTableConfig.id).DataTable().draw()
      }
    }
  },
  mounted() {
    this.initTable()
    this.$refs.searchLink.click();
  }
}
</script>