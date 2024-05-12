<template>
    <!-- Begin Page Content -->
    <div class="container-fluid">

        <!-- Page Heading -->
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Tổng quan</h1>
            <!-- <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                    class="fas fa-download fa-sm text-white-50"></i> Generate Report</a> -->
        </div>

        <!-- Content Row -->
        <div class="row">

            <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-primary shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    Tổng số lớp học</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
                            </div>
                            <div class="col-auto">
                                <i class="fas fa-calendar fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-success shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                    Tổng số học sinh</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800">$215,000</div>
                            </div>
                            <div class="col-auto">
                                <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <!-- Content Row -->

        <!-- Class Overview Cards -->
        <div class="row">
            <div v-for="classroom in classrooms" :key="classroom.id" class="col-xl-4 col-md-6 mb-4">
                <!-- Class Overview Card -->
                <div class="card shadow h-100">
                    <div class="card-body">
                        <h5 class="card-title">{{ classroom.className }}</h5>
                        <p class="card-text">Students Enrolled: {{ classroom.students.length }}</p>
                        <!-- Additional class information can be displayed here -->
                    </div>
                </div>
            </div>
        </div>

        <!-- Student Enrollment Chart -->
        <div class="row">
            <div class="col-lg-6 mb-4">
                <!-- Student Enrollment Chart -->
                <!-- Use a charting library like Chart.js or Vue Chartkick to display the chart -->
                <!-- Chart component goes here -->
            </div>
        </div>

        <!-- Class Document Listings -->
        <div class="row">
            <div class="col-lg-6 mb-4">
                <!-- Class Document Listings -->
                <ul class="list-group">
                    <li v-for="document in documents" :key="document.id" class="list-group-item">{{
                        document.documentName }}</li>
                </ul>
            </div>
        </div>

        <!-- Class Schedule Calendar -->
        <div class="row">
            <div class="col-lg-12 mb-4">
                <!-- Class Schedule Calendar -->
                <!-- Use a calendar library like FullCalendar to display the calendar -->
                <!-- Calendar component goes here -->
            </div>
        </div>

        <!-- Recent Activities Feed -->
        <div class="row">
            <div class="col-lg-12 mb-4">
                <!-- Recent Activities Feed -->
                <ul class="list-group">
                    <li v-for="activity in recentActivities" :key="activity.id" class="list-group-item">{{
                        activity.message }}</li>
                </ul>
            </div>
        </div>

        <!-- Performance Metrics -->
        <div class="row">
            <div class="col-lg-6 mb-4">
                <!-- Performance Metrics -->
                <!-- Performance metrics component goes here -->
            </div>
        </div>

        <!-- Quick Links or Actions -->
        <div class="row">
            <div class="col-lg-6 mb-4">
                <!-- Quick Links or Actions -->
                <!-- Quick links/actions component goes here -->
            </div>
        </div>


    </div>
    <!-- /.container-fluid -->
</template>
<script>
</script>