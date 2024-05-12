<template>
  <div class="container-fluid">
    <div class="fade-in" v-if="isPageList">
      <!-- search card -->
      <div class="card shadow mb-4">
        <!-- Card Header - Accordion -->
        <a href="#searchCriteriaCard" class="d-block card-header py-3 collapsed" data-toggle="collapse" role="button"
          aria-expanded="false" aria-controls="searchCriteriaCard">
          <h6 class="m-0 font-weight-bold text-primary">Quản lý lớp học</h6>
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
          <div class="row d-flex justify-content-end mb-3">
            <button class="btn btn-sm btn-success mr-2" @click="showNewClassModel" data-toggle="modal"
              data-target="#create-newclass-modal">
              Tạo lớp học
            </button>
          </div>
          <div class="row"><data-table :config="tableConfig"></data-table></div>
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
              <input id="createdDate" class="form-control" type="text" v-model="formattedDate">
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
          <h6 class="m-0 font-weight-bold text-primary">Danh sách học viên</h6>
          <div class="card-action">
            <button class="btn btn-primary btn-sm mr-1" type="button" @click="showAddStudentModel()">
              Thêm học viên
            </button>
            <button class="btn btn-info btn-sm mr-1" type="button" @click="showAddListStudentModel()">
              Tải lên danh sách
            </button>
            <button class="btn btn-success btn-sm" type="button" @click="backToList()">
              Tải xuống
            </button>
          </div>

        </div>
        <div class="card-body">
          <div class="row"><data-table :config="tableConfig"></data-table></div>
        </div>
      </div>

      <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex justify-content-between align-items-center">
          <h6 class="m-0 font-weight-bold text-primary">Lịch học</h6>
        </div>
        <div class="card-body">
         
        </div>
      </div>

      <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex justify-content-between align-items-center">
          <h6 class="m-0 font-weight-bold text-primary">Danh sách tài liệu</h6>
        </div>
        <div class="card-body">

        </div>
      </div>
    </div>

    <!-- Modal Create new class-->
    <div class="modal fade" id="create-newclass-modal" tabindex="-1" role="dialog"
      aria-labelledby="create-newclass-modal" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="searchCriteriaCard">Tạo lớp học mới</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group row">
                <label class="col-md-4 col-form-label">Tên lớp</label>
                <div class="col-md-8">
                  <input :disabled="isProcessing" class="form-control" type="text" name="text-input"
                    v-model="newClass.className">
                  <!-- <h6 v-show="true" class="missing-input">This field is required</h6> -->
                </div>
              </div>

              <div class="form-group row">
                <label class="col-md-4 col-form-label">Tên môn học</label>
                <div class="col-md-8">
                  <input :disabled="isProcessing" class="form-control" type="text" name="text-input"
                    v-model="newClass.subjectName">
                  <!-- <h6 v-show="true" class="missing-input">This field is required</h6> -->
                </div>
              </div>

              <div class="form-group row">
                <label class="col-md-4 col-form-label">Ghi chú</label>
                <div class="col-md-8">
                  <textarea rows="1" maxlength="600" v-model="newClass.note"> </textarea>
                  <!-- <h6 v-show="true" class="missing-input">This field is required</h6> -->
                </div>
              </div>

              <div class="form-group row align-items-center">
                <label class="col-md-4 col-form-label">Danh sách học viên</label>
                <div class="col-md-8">
                  <em><a title="mau_danh_sach_hoc_vien.xlsx" href="#" rel="nofollow"
                      @click="downloadFile('mau_danh_sach_hoc_vien.xlsx')">
                      File mẫu</a></em>
                </div>
              </div>

              <p>*Thêm danhh sách học viên và lịch học ở chi tiết lớp học sau khi khởi tạo thông tin cơ bản.</p>

              <!-- <div class="form-group row">
                <label class="col-md-4 col-form-label">Danh sách học viên</label>
                <div class="col-md-8">
                  <button class="btn btn-sm btn-success mr-1" data-target="#create-newclass-modal">
                    Lịch học
                  </button>
                </div>
              </div> -->
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
            <button type="button" class="btn btn-primary" @click="createClassroom">Tạo</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Add student-->
    <div class="modal fade" id="add-student-modal" tabindex="-1" role="dialog" aria-labelledby="create-newclass-modal"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="searchCriteriaCard">Thêm học viên</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group row">
                <label class="col-md-4 col-form-label">Tên lớp</label>
                <div class="col-md-8">
                  <input :disabled="isProcessing" class="form-control" type="text" name="text-input"
                    v-model="newClass.className">
                  <!-- <h6 v-show="true" class="missing-input">This field is required</h6> -->
                </div>
              </div>

              <div class="form-group row">
                <label class="col-md-4 col-form-label">Tên môn học</label>
                <div class="col-md-8">
                  <input :disabled="isProcessing" class="form-control" type="text" name="text-input"
                    v-model="newClass.subjectName">
                  <!-- <h6 v-show="true" class="missing-input">This field is required</h6> -->
                </div>
              </div>

              <div class="form-group row">
                <label class="col-md-4 col-form-label">Ghi chú</label>
                <div class="col-md-8">
                  <textarea rows="1" maxlength="600" v-model="newClass.note"> </textarea>
                  <!-- <h6 v-show="true" class="missing-input">This field is required</h6> -->
                </div>
              </div>

              <div class="form-group row align-items-center">
                <label class="col-md-4 col-form-label">Danh sách học viên</label>
                <div class="col-md-8">
                  <em><a title="mau_danh_sach_hoc_vien.xlsx" href="#" rel="nofollow"
                      @click="downloadFile('mau_danh_sach_hoc_vien.xlsx')">
                      File mẫu</a></em>
                </div>
              </div>

              <p>*Thêm danhh sách học viên và lịch học ở chi tiết lớp học sau khi khởi tạo thông tin cơ bản.</p>         
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
            <button type="button" class="btn btn-primary" @click="addStduent">Tạo</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal add list student-->
    <div class="modal fade" id="add-list-student-modal" tabindex="-1" role="dialog"
      aria-labelledby="create-newclass-modal" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="searchCriteriaCard">Tải lên danh sách học viên</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group row">
                <label class="col-md-4 col-form-label">Chọn file</label>
                <div class="col-md-4">
                  <div @click="browserFile" class="btn">
                    <i class="fa fa-light fa-file fa-2x"></i>
                  </div>
                </div>
                <div class="col-md-4">
                  <em><a title="mau_danh_sach_hoc_vien.xlsx" href="#" rel="nofollow"
                      @click="downloadFile('mau_danh_sach_hoc_vien.xlsx')">File mẫu</a></em>
                </div>
              </div>

              <div class="form-group row align-items-center">
                <label class="col-md-4 col-form-label">File đã chọn</label>
                <div class="col-md-8">
                  <em><a aria-disabled="true" title="mau_danh_sach_hoc_vien.xlsx" href="#" rel="nofollow">
                      {{ filePicked }}</a></em>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
            <button type="button" class="btn btn-primary" :disabled="filePicked === null || isProcessing"
              @click="uploadListStudent">Nộp</button>
          </div>
        </div>
      </div>
    </div>

    <!-- File input -->
    <div>
      <input type="file" id="browseFile" style="display:none" accept=".xlsx" ref="file" data-rule-required='true'
        @change="handleFileChange">
    </div>


  </div>
</template>

<script>
import DataTable from '@/common/DataTable.vue'
import { createNewClass, search, getClassDetail, uploadListStudent } from '../utils/all-class-room-api'
import { downloadSample } from '../utils/file-api.js'
import moment from 'moment'
import Notification from '@/common/Notification.vue'
export default {
  name: 'all-classroom',
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
        listStudent: '',
        listSchedule: '',
        listDocument: ''
      },
      filePicked: null
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
          pageLength: 10,
          select: 0,
          scrollX: true,
          bServerSide: true,
          bProcessing: false,
          sAjaxSource: '',
          language: {
            processing: '<div class="spinner-grow spinner-grow-lg text-primary" aria-hidden="false" aria-label="Loading" role="status"/>'
          },
          aoColumns: [
            { mData: 'id', bVisible: false },
            { sTitle: 'Tên Lớp', mData: 'className' },
            { sTitle: 'Tên Môn', mData: 'subjectName' },
            { sTitle: 'Sĩ số', mData: 'numberOfStudent', defaultContent: '0' },
            { sTitle: 'Ghi chú', mData: 'note' },
            {
              sTitle: 'Ngày tạo', mData: 'createdDate',
              mRender: function (data, type, full) {
                return data !== null ? moment(data).format('YYYY/MM/DD hh:mm:ss') : ''
              }
            },
            {
              sTitle: 'Chi tiết lớp học', mData: 'id',
              mRender: function (data, type, full) {
                return `<button class="btn btn-outline-info btn-sm btn-class-detail mr-2">
                          <span class="icon text-gray-600"><i class="fas fa-arrow-right"></i></span>
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
      search(restParams).then((response) => {
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
      // $('body').append('<div class="alert alert-danger">Failed to fetch classroom data. Please try again later.</div>');

    },
    showNewClassModel() {
      $('#create-newclass-modals').modal()
    },
    resetNewClassModel() {
      this.newClass = {
        newClass: '',
        description: ''
      }
      $('#create-newclass-modal').modal('hide')
    },
    createClassroom() {
      createNewClass(this.newClass).then((response) => {
        if (response.success) {
          console.log("Created new class successfully!")
          // this.$refs.notification.showNotification('This is a success notification', 'success');
        }
        this.resetNewClassModel()
        $('#' + this.tableConfig.id).DataTable().draw();
      }).catch((error) => {
        // this.$refs.notification.showNotification('This is a failed notification', 'failed');
        this.resetNewClassModel()
      })
    },
    browserFile() {
      console.log("test")
      // clear before select new file
      this.$refs.file.files = null
      $('#browseFile').click()
    },
    downloadFile(fileName) {
      downloadSample(fileName)
    },
    uploadListStudent() {
      this.isProcessing = true
      let file = this.$refs.file.files[0]
      let formData = new FormData()
      formData.append('file', file)
      uploadListStudent(formData, this.selectedClass.id).then((response) => {
        alert("success")
        this.isProcessing = false
        this.closeAddListStudentModel()
      }).catch((error) => {
        console.log(error)
        alert("Failed")
        this.isProcessing = false
        this.closeAddListStudentModel()
      })
    },
    showClassDetail(e) {
      let currentRow = $(e.target.closest('table')).dataTable().api().row(e.target.closest('tr')).data()
      getClassDetail(currentRow.id).then((response) => {
        this.selectedClass = response
        this.isPageList = false

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
    showAddStudentModel() {
      $('#add-student-modal').modal()
    },
    showAddListStudentModel() {
      $('#add-list-student-modal').modal()
    },
    closeAddListStudentModel() {
      $('#add-list-student-modal').modal('hide')
    },
    handleFileChange(event) {
      const fileInput = event.target;
      const selectedFile = fileInput.files[0];
      this.filePicked = selectedFile ? selectedFile.name : 'Chưa có file nào được chọn';
    }
  },
  mounted() {
    this.initTable()
  }
}
</script>