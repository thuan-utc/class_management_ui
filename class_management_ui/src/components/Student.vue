<template>
    <div class="container-fluid">
      <div class="card shadow mb-4">
        <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold text-primary">Danh sách học sinh</h6>
          <!-- <button class="row">Lọc</button> -->
        </div>
        <div class="card-body">
  
        </div>
      </div>
  
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
  
      <!-- Modal create new classroom-->
      <!-- Button trigger modal -->
      <!-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
        Launch demo modal
      </button> -->
  
      <!-- Modal -->
      <div class="modal fade" id="create-newclass-modal" tabindex="-1" role="dialog"
        aria-labelledby="create-newclass-modal" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Tạo lớp học mới</h5>
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
                    <h6 v-show="true" class="missing-input">This field is required</h6>
                  </div>
                </div>
  
                <div class="form-group row">
                  <label class="col-md-4 col-form-label">Mô tả</label>
                  <div class="col-md-8">
                    <textarea rows="1" maxlength="600" v-model="newClass.description"> </textarea>
                    <h6 v-show="true" class="missing-input">This field is required</h6>
                  </div>
                </div>
  
                <div class="form-group row align-items-center">
                  <label class="col-md-4 col-form-label">Danh sách học viên</label>
                  <div class="col-md-8">
                    <em><a title="mau_danh_sach_hoc_vien.csv" href="#" rel="nofollow"
                        @click="downloadFile('mau_danh_sach_hoc_vien.csv')">
                        Mẫu file CSV</a></em>
                  </div>
                </div>
  
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
    </div>
  </template>
  
  <script>
  import DataTable from '@/common/DataTable.vue'
  import { getAllClassroom, createNewClass, search } from '../utils/all-class-room-api'
  import { downloadSample } from '../utils/file-api.js'
  export default {
    name: 'all-classroom',
    components: {
      DataTable
    },
    data() {
      return {
        isLoading: false,
        isProcessing: false,
        showFilter: true,
        tableConfig: null,
        newClass: {
          className: '',
          description: ''
        },
        searchCriteria: {
          className: '',
          description: ''
        }
      }
    },
    methods: {
      toggleShowFilter() {
        this.showFilter = !this.showFilter
        $('#filter').collapse('toggle')
      },
      initTable() {
        this.tableConfig = {
          id: 'classroomTable',
          event: [
            {
              event: 'click',
              selector: '.btn-upload-student',
              handler: this.displayCampaignLogo
            }
          ],
          datatable: {
            order: [[1, 'desc']],
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
              {mData: 'id', bVisible: false},
              {mData: 'createdDate', bVisible: false},
              { sTitle: 'Tên', mData: 'className' },
              { sTitle: 'Mô tả', mData: 'subjectDescription' },
              { sTitle: 'Sĩ số', defaultContent: '1' },
              {
                sTitle: 'Lịch học',
                mData: 'id',
                mRender: function (data, type, full) {
                  return '<button class="btn btn-outline-info btn-sm btn-show-schedule mr-2">Xem</button>'
                    + '<button class="btn btn-outline-success btn-sm btn-show-schedule">Chỉnh sửa</button>'
                }
              },
              {
                sTitle: 'Danh sách học viên',
                mData: 'id',
                mRender: function (data, type, full) {
                  return '<button class="btn btn-outline-info btn-sm btn-show-list-student mr-2">Danh sách học viên</button>'
                  + `<div class="btn btn-sm btn-outline-success mr-1" @click="browserFile">
                      Tải lên
                      <input type="file" id="browseCsv" style="display:none" accept=".csv" ref="file"
                        data-rule-required='true'>
                    </div>`
                }
              },
              {
                sTitle: 'Danh sách tài liệu',
                mData: 'id',
                mRender: function (data, type, full) {
                  return '<button class="btn btn-outline-info btn-sm btn-show-list-student mr-2">Tài liệu</button>'
                  + '<button class="btn btn-outline-success btn-sm btn-show-schedule">Chỉnh sửa</button>'
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
        let keywordSearch = paramMap.search ? paramMap.search.value : null
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
          // data.recordsTotal = 20
          // data.recordsFiltered = 20
          // data.data = response
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
            // runNotify({
            //   type: 'success',
            //   message: response.success,
            //   position: 'bottom-right'
            // })
          }
          this.resetNewClassModel()
          $('#' + this.tableConfig.id).DataTable().draw();
        }).catch((error) => {
          // runNotify({
          //   type: 'success',
          //   message: response.success,
          //   position: 'bottom-right'
          // })
          this.resetNewClassModel()
        })
      },
      browserFile() {
        $('#browseCsv').click()
      },
      downloadFile(fileName) {
        downloadSample(fileName)
      }
    },
    mounted() {
      this.initTable()
    }
  }
  </script><template>
  <div class="container-fluid">
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Quản lý lớp học</h6>
        <!-- <button class="row">Lọc</button> -->
      </div>
      <div class="card-body">

      </div>
    </div>

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

    <!-- Modal create new classroom-->
    <!-- Button trigger modal -->
    <!-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
      Launch demo modal
    </button> -->

    <!-- Modal -->
    <div class="modal fade" id="create-newclass-modal" tabindex="-1" role="dialog"
      aria-labelledby="create-newclass-modal" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Tạo lớp học mới</h5>
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
                  <h6 v-show="true" class="missing-input">This field is required</h6>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-md-4 col-form-label">Mô tả</label>
                <div class="col-md-8">
                  <textarea rows="1" maxlength="600" v-model="newClass.description"> </textarea>
                  <h6 v-show="true" class="missing-input">This field is required</h6>
                </div>
              </div>

              <div class="form-group row align-items-center">
                <label class="col-md-4 col-form-label">Danh sách học viên</label>
                <div class="col-md-8">
                  <em><a title="mau_danh_sach_hoc_vien.csv" href="#" rel="nofollow"
                      @click="downloadFile('mau_danh_sach_hoc_vien.csv')">
                      Mẫu file CSV</a></em>
                </div>
              </div>

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
  </div>
</template>

<script>
import DataTable from '@/common/DataTable.vue'
import { getAllClassroom, createNewClass, search } from '../utils/all-class-room-api'
import { downloadSample } from '../utils/file-api.js'
export default {
  name: 'all-classroom',
  components: {
    DataTable
  },
  data() {
    return {
      isLoading: false,
      isProcessing: false,
      showFilter: true,
      tableConfig: null,
      newClass: {
        className: '',
        description: ''
      },
      searchCriteria: {
        className: '',
        description: ''
      }
    }
  },
  methods: {
    toggleShowFilter() {
      this.showFilter = !this.showFilter
      $('#filter').collapse('toggle')
    },
    initTable() {
      this.tableConfig = {
        id: 'classroomTable',
        event: [
          {
            event: 'click',
            selector: '.btn-upload-student',
            handler: this.displayCampaignLogo
          }
        ],
        datatable: {
          order: [[1, 'desc']],
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
            {mData: 'id', bVisible: false},
            {mData: 'createdDate', bVisible: false},
            { sTitle: 'Tên', mData: 'className' },
            { sTitle: 'Mô tả', mData: 'subjectDescription' },
            { sTitle: 'Sĩ số', defaultContent: '1' },
            {
              sTitle: 'Lịch học',
              mData: 'id',
              mRender: function (data, type, full) {
                return '<button class="btn btn-outline-info btn-sm btn-show-schedule mr-2">Xem</button>'
                  + '<button class="btn btn-outline-success btn-sm btn-show-schedule">Chỉnh sửa</button>'
              }
            },
            {
              sTitle: 'Danh sách học viên',
              mData: 'id',
              mRender: function (data, type, full) {
                return '<button class="btn btn-outline-info btn-sm btn-show-list-student mr-2">Danh sách học viên</button>'
                + `<div class="btn btn-sm btn-outline-success mr-1" @click="browserFile">
                    Tải lên
                    <input type="file" id="browseCsv" style="display:none" accept=".csv" ref="file"
                      data-rule-required='true'>
                  </div>`
              }
            },
            {
              sTitle: 'Danh sách tài liệu',
              mData: 'id',
              mRender: function (data, type, full) {
                return '<button class="btn btn-outline-info btn-sm btn-show-list-student mr-2">Tài liệu</button>'
                + '<button class="btn btn-outline-success btn-sm btn-show-schedule">Chỉnh sửa</button>'
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
      let keywordSearch = paramMap.search ? paramMap.search.value : null
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
        // data.recordsTotal = 20
        // data.recordsFiltered = 20
        // data.data = response
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
          // runNotify({
          //   type: 'success',
          //   message: response.success,
          //   position: 'bottom-right'
          // })
        }
        this.resetNewClassModel()
        $('#' + this.tableConfig.id).DataTable().draw();
      }).catch((error) => {
        // runNotify({
        //   type: 'success',
        //   message: response.success,
        //   position: 'bottom-right'
        // })
        this.resetNewClassModel()
      })
    },
    browserFile() {
      $('#browseCsv').click()
    },
    downloadFile(fileName) {
      downloadSample(fileName)
    }
  },
  mounted() {
    this.initTable()
  }
}
</script>