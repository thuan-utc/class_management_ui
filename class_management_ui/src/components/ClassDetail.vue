<template>
    <div class="container-fluid">
        <div class="fade-in">
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex justify-content-between align-items-center">
                    <h6 class="m-0 font-weight-bold text-primary">Chi tiết lớp học</h6>
                    <!-- <button class="btn btn-warning btn-sm" type="button" @click="backToList()">
                        Quay lại
                    </button> -->
                </div>
                <div class="card-body">
                    <div class="form-group row">
                        <label for="className" class="col-sm-2 col-form-label">Tên lớp:</label>
                        <div class="col-sm-3">
                            <input id="className" class="form-control" type="text" v-model="selectedClass.className">
                        </div>

                        <label for="createdDate" class="col-sm-2 col-form-label">Ngày tạo:</label>
                        <div class="col-sm-3">
                            <input id="createdDate" class="form-control" type="date"
                                v-model="selectedClass.createdDate">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="subjectName" class="col-sm-2 col-form-label">Tên môn:</label>
                        <div class="col-sm-3">
                            <input id="subjectName" class="form-control" type="text"
                                v-model="selectedClass.subjectName">
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
                    <button class="btn btn-success btn-sm" type="button">
                        Tải lên
                    </button>
                </div>
                <div class="card-body">

                </div>
            </div>

            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex justify-content-between align-items-center">
                    <h6 class="m-0 font-weight-bold text-primary">Lịch học</h6>
                </div>
                <div class="card-body">
                    <div class="form-group row">
                        <label for="className" class="col-sm-2 col-form-label">Tên lớp:</label>
                        <div class="col-sm-3">
                            <input id="className" class="form-control" type="text" v-model="selectedClass.className">
                        </div>

                        <label for="createdDate" class="col-sm-2 col-form-label">Ngày tạo:</label>
                        <div class="col-sm-3">
                            <input id="createdDate" class="form-control" type="date"
                                v-model="selectedClass.createdDate">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="subjectName" class="col-sm-2 col-form-label">Tên môn:</label>
                        <div class="col-sm-3">
                            <input id="subjectName" class="form-control" type="text"
                                v-model="selectedClass.subjectName">
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
                    <h6 class="m-0 font-weight-bold text-primary">Danh sách tài liệu</h6>
                </div>
                <div class="card-body">

                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'class-detail',
    data() {
        return {
            selectedClass: {
                id: null,
                className: '',
                subjectName: '',
                note: '',
                createdDate: null,
                listStudent: '',
                listSchedule: '',
                listDocument: ''
            }
        }
    }
}
</script>
