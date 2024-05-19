<template>
    <div class="container-fluid">
        <!-- search card -->
        <div class="card shadow mb-4">
            <!-- Card Header - Accordion -->
            <a href="#searchCriteriaCard" class="d-block card-header py-3 collapsed" data-toggle="collapse"
                role="button" aria-expanded="false" aria-controls="searchCriteriaCard">
                <h5 class="m-0 font-weight-bold text-primary">Quản lý học  phí</h5>
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

                            <div class="form-group col-sm-5 col-md-3 col-lg-3 col-xl-2">
                                <label for="customerName">Tên tài liệu</label>
                                <input type='text' class='form-control' v-model='searchCriteria.documentName'>
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

        <div class="card shadow mb-4">
            <div class="card-body">
                <!-- <div class="row"><data-table :config="documentTableConfig"></data-table></div> -->
            </div>
        </div>
    </div>
</template>
<script>
import { search } from '../utils/document-api.js'
import DataTable from '@/common/DataTable.vue'
import moment from 'moment'
export default {
    name: 'tutor-fee',
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
            documentTableConfig: null
        }
    },
    methods: {
        initTable() {
            this.documentTableConfig = {
                id: 'documentTable',
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
                        { sTitle: 'Tên tài liệu', mData: 'numberOfStudent', defaultContent: '0' },
                        { sTitle: 'Ghi chú', mData: 'note' },
                        {
                            sTitle: 'Ngày tạo', mData: 'createdDate',
                            mRender: function (data, type, full) {
                                return data !== null ? moment(data).format('YYYY/MM/DD hh:mm:ss') : ''
                            }
                        }
                    ],
                    fnServerData: this.getAllDocument

                }
            }
        },
        getAllDocument(sSource, aoData, fnCallback) {
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
            $('#' + this.documentTableConfig.id).DataTable().draw()
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
    }
}
</script>