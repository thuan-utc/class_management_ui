<template>
    <div class="container-fluid">
        <!-- search card -->
        <div class="card shadow mb-4">
            <!-- Card Header - Accordion -->
            <a ref="searchLink" href="#searchCriteriaCard" class="d-block card-header py-3 collapsed"
                data-toggle="collapse" role="button" aria-expanded="false" aria-controls="searchCriteriaCard">
                <h5 class="m-0 font-weight-bold text-primary">Quản lý học viên</h5>
            </a>
            <!-- Card Content - Collapse -->
            <div class="collapse" id="searchCriteriaCard" style="">
                <div class="card-body">
                    <!-- search search-->
                    <form @submit.prevent='search' @reset='reset'>
                        <div class="row">
                            <div class="form-group col-sm-5 col-md-3 col-lg-3 col-xl-2">
                                <label for="customerName">Tên</label>
                                <input type='text' class='form-control' v-model='searchCriteria.documentName'>
                            </div>

                            <div class="form-group col-sm-5 col-md-3 col-lg-3 col-xl-2">
                                <label for="customerName">Email</label>
                                <input type='text' class='form-control' v-model='searchCriteria.documentName'>
                            </div>

                            <div class="form-group col-sm-5 col-md-3 col-lg-3 col-xl-2">
                                <label for="customerName">Số điện thoại</label>
                                <input type='text' class='form-control' v-model='searchCriteria.documentName'>
                            </div>

                            <div class="form-group col-sm-5 col-md-3 col-lg-3 col-xl-2">
                                <label for="customerName">Tên lớp học</label>
                                <input type='text' class='form-control' v-model='searchCriteria.documentName'>
                            </div>

                        </div>
                        <div class="row">
                            <div class="form-group col-sm-6 col-md-3 col-lg-3 col-xl-3">
                                <label>Action</label>
                                <div>
                                    <button type='reset' class='btn btn-sm btn-md btn-warning btn-reset mr-1'>
                                        <i class="fa fa-arrows"></i>
                                        Làm mới
                                    </button>
                                    <button class='btn btn-sm btn-info' type='submit' @click="search">
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

        <div class="card shadow mb-4">
            <div class="card-body">
                <div class="row"><data-table :config="studentTableConfig"></data-table></div>
            </div>
        </div>
    </div>
</template>
<script>
import { search } from '../utils/student-api.js'
import DataTable from '@/common/DataTable.vue'
import moment from 'moment'
export default {
    name: 'all-student',
    components: {
        DataTable
    },
    data() {
        return {
            searchCriteria: {
                className: '',
                subjectName: '',
                documentName: '',
                startCreatedDate: '',
                endCreatedDate: ''
            },
            studentTableConfig: null
        }
    },
    methods: {
        initTable() {
            this.studentTableConfig = {
                id: 'allStudentTable',
                datatable: {
                    order: [[0, 'desc']],
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
                        { mData: 'id', bVisible: false },
                        { sTitle: 'Tên họ', mData: 'firstName' },
                        { sTitle: 'Tên đệm', mData: 'surname' },
                        { sTitle: 'Tên', mData: 'lastName' },
                        { sTitle: 'Email', mData: 'email' },
                        { sTitle: 'Số điện thoại', mData: 'phone' },
                        { sTitle: 'Lớp học', mData: 'note' },
                        { sTitle: 'Môn học', mData: 'note' },
                        { sTitle: 'Ghi chú', mData: 'note' },
                        {
                            sTitle: 'Ngày thêm', mData: 'createdDate',
                            mRender: function (data, type, full) {
                                return data !== null ? moment(data).format('YYYY/MM/DD hh:mm:ss') : ''
                            }
                        },
                        {
                            sTitle: 'Sửa', mData: 'id',
                            mRender: function (data, type, full) {
                                return `
                                <button class="btn btn-outline-warning btn-sm btn-class-detail mr-2">
                                    <span class="icon text-gray-600"><i class="fas fa-pencil-alt"></i></span>
                                </button>`;
                            }

                        },
                        {
                            sTitle: 'Xóa', mData: 'id',
                            mRender: function (data, type, full) {
                                return `
                                <button class="btn btn-outline-danger btn-sm btn-class-detail">
                                    <span class="icon text-gray-600"><i class="fas fa-trash-alt"></i></span>
                                </button>`
                            }

                        }
                    ],
                    fnServerData: this.getAllStudent

                }
            }
        },
        getAllStudent(sSource, aoData, fnCallback) {
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
        },
        search() {
            $('#' + this.studentTableConfig.id).DataTable().draw()
        },
        reset() {
            this.searchCriteria = {
                className: '',
                subjectName: '',
                documentName: '',
                startCreatedDate: null,
                endCreatedDate: null
            }
            this.search()
        },
    },
    mounted() {
        this.initTable()
        this.$refs.searchLink.click()
    }
}
</script>