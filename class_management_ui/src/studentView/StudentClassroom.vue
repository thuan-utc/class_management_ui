<template>
  <div class="container-fluid">
    <div class="fade-in" v-if="isPageList">
      <!-- search card -->
      <div class="card shadow mb-4">
        <!-- Card Header - Accordion -->
        <a href="#searchCriteriaCard" class="d-block card-header py-3" data-toggle="collapse" role="button"
          aria-expanded="false" aria-controls="searchCriteriaCard">
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

                <div class="form-group col-sm-6 col-md-3 col-lg-3 col-xl-2">
                  <label for="customerName">Ngày tạo bắt đầu</label>
                  <input type='date' class='form-control' v-model='searchCriteria.startCreatedDate'>
                </div>

                <div class="form-group col-sm-6 col-md-3 col-lg-3 col-xl-2">
                  <label for="customerName">Ngày tạo kết thúc</label>
                  <input type='date' class='form-control' v-model='searchCriteria.endCreatedDate'>
                </div>

              </div>
              <div class="row">
                <div class="form-group col-sm-6 col-md-3 col-lg-3 col-xl-3">
                  <label>Action</label>
                  <div>
                    <button type='reset' class='btn btn-md btn-warning btn-reset mr-1'>
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

      <!-- list class -->
      <div class="card shadow mb-4">
        <div class="card-body">
          <data-table :config="tableConfig"></data-table>
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
            <label for="note" class="col-sm-2 col-form-label">Ghi chú:</label>
            <div class="col-sm-3">
              <textarea id="note" class="form-control" v-model="selectedClass.note"></textarea>
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
import { getAllSchedule, createClassSchedule } from '@/utils/class-schedule-api'
import moment from 'moment'
import Notification from '@/common/Notification.vue'
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
      showFilter: true,
      tableConfig: null,
      newClass: {
        className: '',
        subjectName: '',
        note: ''
      },
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
        documentTableConfig: ''
      }
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
            //   { sTitle: 'Sĩ số', mData: 'numberOfStudent', defaultContent: '0' },
            { sTitle: 'Ghi chú', mData: 'note' },
            {
              sTitle: 'Ngày tạo', mData: 'createdDate',
              mRender: function (data, type, full) {
                return data !== null ? moment(data).format('YYYY/MM/DD hh:mm:ss') : ''
              }
            },
            {
              sTitle: 'Xem điểm danh', mData: 'id',
              mRender: function (data, type, full) {
                return `<button class="btn btn-outline-success btn-sm btn-class-detail mr-2">
                            <span class="icon text-gray-600"><i class="fas fa-user-check"></i></span>
                          </button>`
              }
            },
            {
              sTitle: 'Xem điểm', mData: 'id',
              mRender: function (data, type, full) {
                return `<button class="btn btn-outline-warning btn-sm btn-class-detail mr-2">
                            <span class="icon text-gray-600"><i class="fas fa-pencil-alt"></i></span>
                          </button>`
              }
            },
            {
              sTitle: 'Chi tiết lớp học', mData: 'id',
              mRender: function (data, type, full) {
                return `<button class="btn btn-outline-info btn-sm btn-class-detail mr-2">
                            <span class="icon text-gray-600"><i class="fas fa-info-circle"></i></span>
                          Chi tiết</button>`
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
    onStartDateChange(e) {
      if (this.searchCriteria.endCreatedDate && this.searchCriteria.startCreatedDate && moment(this.searchCriteria.startCreatedDate, 'DD/MM/YYYY').isAfter(moment(this.searchCriteria.endCreatedDate, 'DD/MM/YYYY'))) {
        this.searchCriteria.endCreatedDate = null
        $('#endCreatedDate').val('').trigger('change')
      }
    },
    onEndDateChange(e) {
      if (this.searchCriteria.startCreatedDate && this.searchCriteria.endCreatedDate && moment(this.searchCriteria.endCreatedDate, 'DD/MM/YYYY').isBefore(moment(this.searchCriteria.startCreatedDate, 'DD/MM/YYYY'))) {
        $.alert({
          title: '',
          content: 'Invalid Date Range'
        })
        this.searchCriteria.endCreatedDate = null
        $('#endCreatedDate').val('').trigger('change')
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
    showModalAddStudent() {
      $('#add-student-modal').modal()
    },
    showModalAddListStudent() {
      $('#add-list-student-modal').modal()
    },
    closeModalAddListStudent() {
      $('#add-list-student-modal').modal('hide')
    },
    showModalAddClassSchedule() {
      $('#add-class-schedule-modal').modal()
    },
    showModalAddClassDocument() {
      $('#add-class-document-modal').modal()
    },
    handleFileChange(refName) {
      const inputFile = this.$refs[refName];
      if (inputFile) {
        const fileList = inputFile.files;
        if (fileList.length > 0) {
          const file = fileList[0];
          console.log(`File selected in ${refName}:`, file.name);
        }
      } else {
        console.error(`${refName} ref is not defined`);
      }
      const fileInput = event.target;
      const selectedFile = fileInput.files[0];
      if (refName === 'studentFile') {
        this.studentFilePicked = selectedFile ? selectedFile.name : 'Chưa có file nào được chọn'
      } else if (refName === 'documentFile') {
        this.documentFilePicked = selectedFile ? selectedFile.name : 'Chưa có file nào được chọn'
      }

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
              sTitle: 'Ngày tạo', mData: 'createdDate',
              mRender: function (data, type, full) {
                return data !== null ? moment(data).format('YYYY/MM/DD hh:mm:ss') : ''
              }
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
    }
  },
  mounted() {
    this.initTable()
  }
}
</script>