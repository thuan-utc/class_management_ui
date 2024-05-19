<template>
    <!-- Begin Page Content -->
    <div class="container-fluid">

        <!-- Page Heading -->
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Xin chào {{ username }}!</h1>
        </div>

        <div class="row">
            <div class="card shadow mb-4 col-12">
                <div class="card-header">
                    <h6 class="m-0 font-weight-bold text-primary">Lớp học trong tuần</h6>
                </div>
                <div class="card-body">
                    <div ><data-table :config="tableClassInWeekConfig"></data-table></div>
                </div>
            </div>
        </div>



    </div>
    <!-- /.container-fluid -->
</template>
<script>
import { getClassInWeek } from '../utils/dashboard-api'
import DataTable from '@/common/DataTable.vue'

export default {
    name: 'dashboard',
    components: {
        DataTable
    },
    props: {
        username: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            tableClassInWeekConfig: null
        }
    },
    methods: {
        initData() {
            this.tableClassInWeekConfig = {
                id: 'tableClassInWeek',
                datatable: {
                    order: [],
                    searching: false,
                    lengthChange: !1,
                    pageLength: 6,
                    select: 0,
                    scrollX: true,
                    bServerSide: true,
                    bProcessing: false,
                    sAjaxSource: '',
                    info: false,
                    paging: false,
                    autoWidth: true,
                    language: {
                        processing: '<div class="spinner-grow spinner-grow-lg text-primary" aria-hidden="false" aria-label="Loading" role="status"/>'
                    },
                    aoColumns: [
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
                            }
                        },
                        { sTitle: 'Thứ Hai', mData: 'mondayClass' },
                        { sTitle: 'Thứ Ba', mData: 'tuesdayClass' },
                        { sTitle: 'Thứ Tư', mData: 'wednesdayClass' },
                        { sTitle: 'Thứ Năm', mData: 'thursdayClass' },
                        { sTitle: 'Thứ Sáu', mData: 'fridayClass' },
                        { sTitle: 'Thứ Bảy', mData: 'saturdayClass' },
                        { sTitle: 'Chủ nhật', mData: 'sundayClass' },
                    ],
                    columnDefs: [
                        { orderable: false, targets: '_all' } // Disable sorting for all columns
                    ],

                    fnServerData: this.getClassInWeek
                }
            }
        },
        getClassInWeek(sSource, aoData, fnCallback) {
            getClassInWeek().then((response) => {
                let data = {}
                data.recordsTotal = response.totalElements
                data.recordsFiltered = response.totalElements
                data.data = response.content
                fnCallback(data)
            }).catch((error) => {
                console.log(error)
            })
        }
    },
    mounted() {
        this.initData()
    }
}
</script>