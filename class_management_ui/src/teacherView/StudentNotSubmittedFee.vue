<template>
    <div class="container-fluid">
        <!-- search card -->
        <div class="card shadow mb-4">
            <!-- Card Header - Accordion -->
            <a ref="searchLink" href="#searchCriteriaCard" class="d-block card-header py-3 collapsed"
                data-toggle="collapse" role="button" aria-expanded="false" aria-controls="searchCriteriaCard">
                <h5 class="m-0 font-weight-bold text-primary">Bộ lọc</h5>
            </a>
            <!-- Card Content - Collapse -->
            <div class="collapse" id="searchCriteriaCard" style="">
                <div class="card-body">
                    <!-- search search-->
                    <form @submit.prevent='search' @reset='reset'>
                        <div class="row">
                            <div class="form-group col-sm-5 col-md-3 col-lg-3 col-xl-2">
                                <label for="customerName">Tên Họ</label>
                                <input type='text' class='form-control' v-model='searchCriteria.firstName'>
                            </div>

                            <div class="form-group col-sm-5 col-md-3 col-lg-3 col-xl-2">
                                <label for="customerName">Tên đệm</label>
                                <input type='text' class='form-control' v-model='searchCriteria.surname'>
                            </div>

                            <div class="form-group col-sm-5 col-md-3 col-lg-3 col-xl-2">
                                <label for="customerName">Tên</label>
                                <input type='text' class='form-control' v-model='searchCriteria.lastName'>
                            </div>

                            <div class="form-group col-sm-5 col-md-3 col-lg-3 col-xl-2">
                                <label for="customerName">Email</label>
                                <input type='text' class='form-control' v-model='searchCriteria.email'>
                            </div>

                            <div class="form-group col-sm-5 col-md-3 col-lg-3 col-xl-2">
                                <label for="customerName">Số điện thoại</label>
                                <input type='text' class='form-control' v-model='searchCriteria.phone'>
                            </div>

                            <div class="form-group col-sm-5 col-md-3 col-lg-3 col-xl-2">
                                <label for="customerName">Tên lớp học</label>
                                <input type='text' class='form-control' v-model='searchCriteria.className'>
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
            <a  class="d-block card-header py-3 collapsed"
                data-toggle="collapse" role="button" aria-expanded="false" aria-controls="searchCriteriaCard">
                <h5 class="m-0 font-weight-bold text-primary">Danh sách sinh viên chưa đóng học phí</h5>
            </a>    
            <div class="card-body">
                <div class="row"><data-table :config="studentTableConfig"></data-table></div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="payConfirmModal" tabindex="-1" aria-labelledby="payConfirmModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    Xác nhận học viên {{ selectedFee != null ? selectedFee.firstName + " " + selectedFee.surname + " " +
                    selectedFee.lastName : '' }}
                    thanh toán {{ selectedFee != null ? selectedFee.feeNotSubmitted.toLocaleString('en-US') : '0' }} vnd
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" id="confirmDeleteBtn" @click="payFee">Xác nhận</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                        @click="cancelConfirm">Hủy</button>
                </div>
            </div>P
        </div>
    </div>

</template>
<script>
import { search } from '../utils/student-api.js'
import { getStudentNotSubmittedFee, payFee } from '../utils/tutor-fee-api.js'
import DataTable from '@/common/DataTable.vue'
import moment from 'moment'
export default {
    name: 'student-not-submitted-fee',
    components: {
        DataTable
    },
    data() {
        return {
            searchCriteria: {
                firstName: '',
                surname: '',
                lastName: '',
                email: '',
                phone: '',
                className: '',
            },
            studentTableConfig: null,
            selectedFee: null
        }
    },
    methods: {
        initTable() {
            this.studentTableConfig = {
                id: 'allStudentTable',
                events: [
                    {
                        event: 'click',
                        selector: '.btn-confirm-pay',
                        handler: this.showCofirmPayModal
                    }
                ],
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
                        { sTitle: 'Năm', mData: 'year' },
                        { sTitle: 'Tháng', mData: 'month' },
                        { sTitle: 'Lớp học', mData: 'className' },
                        { sTitle: 'Tên họ', mData: 'firstName' },
                        { sTitle: 'Tên đệm', mData: 'surname' },
                        { sTitle: 'Tên', mData: 'lastName' },
                        { sTitle: 'Email', mData: 'email' },
                        { sTitle: 'Số điện thoại', mData: 'phone' },
                        {
                            sTitle: 'Tổng học phí nợ', mData: 'feeNotSubmitted',
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
                            sTitle: 'Xác nhận thanh toán', mData: 'id',
                            mRender: function (data, type, full) {
                                return `
                                <button class="btn btn-outline-success btn-confirm-pay">
                                    <span class="icon text-gray-600"><i class="fas fa-check-circle"> Xác nhận</i></span>
                                </button>`
                            }

                        }
                    ],
                    fnServerData: this.getStudentNotSubmittedFee

                }
            }
        },
        getStudentNotSubmittedFee(sSource, aoData, fnCallback) {
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
            getStudentNotSubmittedFee(restParams).then((response) => {
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
        showCofirmPayModal(e) {
            let currentRow = $(e.target.closest('table')).dataTable().api().row(e.target.closest('tr')).data()
            this.selectedFee = currentRow
            $('#payConfirmModal').modal('show')
        },
        cancelConfirm() {
            $('#payConfirmModal').modal('hide')
        },
        payFee() {
            payFee(this.selectedFee.id).then((response) => {
                this.cancelConfirm()
                this.search()
                alert("Thành công")
            }).catch((error) => {
                alert("Thất bại")
                console.log(error)
            })
        }
    },
    mounted() {
        this.initTable()
        this.$refs.searchLink.click()
    }
}
</script>