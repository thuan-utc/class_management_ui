<template>
    <div class="container-fluid">
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h5 class="m-0 font-weight-bold text-primary">Quản lý điểm</h5>
            </div>
            <div class="card-body">
                <!-- search search-->
                <form @submit.prevent='getClassInfo'>
                    <div class="row d-flex align-items-end">
                        <div class="form-group col-sm-6 col-md-3 col-lg-3 col-xl-2">
                            <label for="customerName">ID lớp</label>
                            <input type='number' class='form-control' v-model='classId'>
                        </div>

                        <div class="form-group col-sm-6 col-md-3 col-lg-3 col-xl-2 d-flex justify-content-end">
                            <button class='btn btn-info' type='submit' @click="getClassInfo">
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
                            <input disabled id="createdDate" class="form-control" type="text" v-model="formattedDate">
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

        <div class="card shadow mb-4" v-if="examTableConfig !== null">
            <div class="card-body">
                <div class="row d-flex justify-content-end mb-3">
                    <button class="btn btn-info btn-sm mr-2" type="button" @click="createNewExam">
                        <i class="fa fa-solid fa-plus"></i>
                        Tạo đầu điểm
                    </button>

                    <button class="btn btn-success btn-sm" type="button" @click="downloadListExamScore">
                        <i class="fa fas fa-download"></i>
                        Danh sách điểm
                    </button>
                </div>
                <div class="row"><data-table :config="examTableConfig"></data-table></div>
            </div>
        </div>

        <div class="card shadow mb-4" v-if="examScoreTableConfig !== null">
            <div class="card-header">
                <div class="row">
                    <div class="col-12">
                        <canvas id="examScoreChart" width="300" height="300"></canvas>
                    </div>
                </div>
            </div>

            <div class="card-body">
                <div v-if="selectedExam !== null" class="col-12">
                    <div class="form-group row">
                        <label for="className" class="col-sm-2 col-form-label">Tên bài kiểm tra:</label>
                        <div class="col-sm-3">
                            <input disabled id="className" class="form-control" type="text" v-model="selectedExam.name">
                        </div>
                        <div class="col d-flex justify-content-end">
                            <button class="btn btn-success" type="button" @click="submitResult">
                                <i class="fa fas fa-save"></i>
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>

                <div class="row"><data-table :config="examScoreTableConfig"></data-table></div>
            </div>
        </div>
    </div>

    <!-- Modal Add new exam-->
    <div class="modal fade" id="add-exam-modal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="searchCriteriaCard">Thêm đầu điểm</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group row">
                            <label class="col-md-4 col-form-label">Tên điểm:</label>
                            <div class="col-md-8">
                                <input :disabled="isProcessing" class="form-control" type="text" name="text-input"
                                    v-model="newExam.examName">
                                <!-- <h6 v-show="true" class="missing-input">This field is required</h6> -->
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
                    <button type="button" class="btn btn-primary" @click="addNewExam">Thêm</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import DataTable from '@/common/DataTable.vue'
import { getClassDetail } from '../utils/all-class-room-api'
import { fetchClassExamScore, saveExamScoreResult, createNewExam, fetchClassExam } from '@/utils/exam-score-api.js'
import moment from 'moment'
import Chart from 'chart.js/auto'
export default {
    name: 'exam-score',
    components: {
        DataTable
    },
    props: ['classIdFromParent'],
    data() {
        return {
            classId: null,
            examId: null,
            examTableConfig: null,
            examScoreTableConfig: null,
            selectedClass: null,
            selectedExam: null,
            newExam: {
                examName: '',
                classId: null
            },
            examScoreChart: null,
            examScoreChartData: null
        }
    },
    computed: {
        formattedDate() {
            return moment(this.selectedClass.createdDate).format("DD/MM/YYYY");
        }
    },
    methods: {
        initExamTable() {
            this.examTableConfig = {
                id: 'examTable',
                events: [
                    {
                        event: 'click',
                        selector: '.btn-check-score',
                        handler: this.editExamScore
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
                        { sTitle: 'Id', mData: 'id', bVisible: true },
                        { sTitle: 'Tên bài kiểm tra', mData: 'name' },
                        {
                            sTitle: 'Ngày tạo', mData: 'createdDate',
                            mRender: function (data, type, full) {
                                return data !== null ? moment(data).format('YYYY/MM/DD hh:mm:ss') : ''
                            }
                        },
                        {
                            sTitle: 'Danh sách điểm',
                            mData: 'id',
                            mRender: function (data, tupe, full) {
                                return `<button class="btn btn-outline-warning btn-sm btn-check-score mr-2">
                          <span class="icon text-gray-600"><i class="fa fas fa-edit"></i></span> </button>`
                            }
                        }
                    ],
                    fnServerData: this.getAllExam

                }
            }
        },
        getAllExam(sSource, aoData, fnCallback) {
            fetchClassExam(this.classId).then((response) => {
                let data = {}
                data.recordsTotal = response.totalElements
                data.recordsFiltered = response.totalElements
                data.data = response.content
                fnCallback(data)
                this.examScoreTableConfig = null
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
                if (this.examTableConfig === null) {
                    this.initExamTable()
                } else {
                    $('#' + this.examTableConfig.id).DataTable().draw()
                }
            }).catch((error) => {
                console.log("Error fecth class detail " + error)
                alert('Không tìm thấy thông tin lớp học')
            })
        },
        initExamScoreTable() {
            this.examScoreTableConfig = {
                id: 'examScoreTable',
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
                            sTitle: 'Điểm', mData: 'score',
                            mRender: function (data, type, full) {
                                let score = data === null ? '' : data
                                return '<input type="text" value="' + score + '" class="score-input">';
                            }
                        },
                        {
                            sTitle: 'Ngày sửa', mData: 'lastModifiedDate',
                            mRender: function (data, type, full) {
                                return data !== null ? moment(data).format('YYYY/MM/DD hh:mm:ss') : ''
                            }
                        },

                    ],
                    fnServerData: this.fetchClassExamScore
                }
            }

        },
        fetchClassExamScore(sSource, aoData, fnCallback) {
            fetchClassExamScore(this.examId).then((response) => {
                let data = {}
                data.recordsTotal = response.totalElements
                data.recordsFiltered = response.totalElements
                data.data = response.content
                fnCallback(data)
                this.attachInputEventListeners()
                this.updateExamScoreBarChart(response.content)
            }).catch((error) => {
                console.log("Error fecth class detail " + error)
                alert('Không tìm thấy thông tin' + error)
            })
        },
        editExamScore(e) {
            let currentRow = $(e.target.closest('table')).dataTable().api().row(e.target.closest('tr')).data()
            this.examId = currentRow.id
            this.selectedExam = currentRow
            if (this.examScoreTableConfig === null) {
                this.initExamScoreTable()
            } else {
                $('#' + this.examScoreTableConfig.id).DataTable().draw()
            }
        },
        submitResult() {
            let result = [];
            console.log($)
            let rows = $('#' + this.examScoreTableConfig.id).DataTable().rows().nodes();
            rows.each((index, row) => {
                let rowData = $('#' + this.examScoreTableConfig.id).DataTable().row(row).data()
                let studentId = rowData.id
                let score = rowData.score

                result.push({
                    id: studentId,
                    score: score
                });
            });
            saveExamScoreResult(result).then((response) => {
                console.log("Save exam score result successfully");
                alert("Đã lưu")
            }).catch((error) => {
                console.log(error)
                alert("", "Lưu thất bại!")
            })
            if (this.examScoreTableConfig === null) {
                    this.initExamScoreTable()
                } else {
                    $('#' + this.examScoreTableConfig.id).DataTable().draw()
                }
        },
        attachInputEventListeners() {
            // const inputs = this.$el.querySelectorAll('.score-input');
            // inputs.forEach(input => {
            //     input.removeEventListener('input', this.handleInputChange);
            //     input.addEventListener('input', this.handleInputChange);
            // });
            this.$nextTick(() => {
                const inputs = document.querySelectorAll('.score-input');
                inputs.forEach(input => {
                    input.removeEventListener('input', this.handleInputChange);
                    input.addEventListener('input', this.handleInputChange);
                });
            });
        },
        handleInputChange(e) {
            const input = e.target;
            const newValue = input.value;
            const row = input.closest('tr');
            const rowIndex = $('#' + this.examScoreTableConfig.id).DataTable().row(row).index();
            const rowData = $('#' + this.examScoreTableConfig.id).DataTable().row(rowIndex).data();
            rowData.score = newValue;
        },
        updateRoute() {
            // Update the route with the new classId value
            if (this.classId) {
                this.$router.replace({ name: 'ExamScore', params: { classIdFromParent: this.classId } });
            } else {
                // If classId is empty, redirect to the route without classId parameter
                this.$router.replace({ name: 'ExamScore' });
            }
        },
        createNewExam() {
            this.newExam = {
                examName: '',
                classId: this.selectedClass.id
            };

            // Show the modal for adding a new exam
            $('#add-exam-modal').modal('show');
        },
        addNewExam() {
            createNewExam(this.newExam).then((response) => {
                $('#add-exam-modal').modal('hide');
                alert("Thêm đầu điểm thành công!");
                if (this.examTableConfig === null) {
                    this.initExamTable()
                } else {
                    $('#' + this.examTableConfig.id).DataTable().draw()
                }
            }).catch((error) => {
                console.error('Error adding new exam:', error);
                alert("Thêm đầu điểm thất bại!");
            });
        },
        updateExamScoreBarChart(examScoreData) {
            // Initialize count array for scores 1-10
            const scoreCounts = new Array(10).fill(0);

            // Count the occurrences of each score
            examScoreData.forEach(student => {
                if (student.score !== null && student.score >= 1 && student.score <= 10) {
                    const roundedScore = Math.round(student.score);
                    scoreCounts[roundedScore - 1]++;
                }
            });

            // Labels for the chart (scores 1-10)
            const labels = Array.from({ length: 10 }, (_, i) => i + 1);

            // Destroy existing chart if it exists
            if (this.examScoreChart) {
                this.examScoreChart.destroy();
            }

            // Get the canvas context
            const ctx = document.getElementById('examScoreChart').getContext('2d');

            // Initialize new chart instance as Bar chart
            this.examScoreChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Số lượng sinh viên',
                        data: scoreCounts,
                        backgroundColor: '#4CAF50', // Green color for bars
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1, // Adjust as needed
                            },
                        },
                    },
                },
            });
        },
        downloadListExamScore() {

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