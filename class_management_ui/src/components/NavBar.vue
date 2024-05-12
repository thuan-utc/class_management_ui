<template>
    <!-- Sidebar -->
    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar"
        :class="{ toggled: sidebarToggled }">

        <!-- Sidebar - Brand -->
        <a class="sidebar-brand d-flex align-items-center justify-content-center" href="/dashboard">
            <div class="sidebar-brand-icon">
                <i class="fas fa-school"></i>
            </div>
            <div class="sidebar-brand-text mx-3">My class</div>
        </a>

        <!-- Divider -->
        <hr class="sidebar-divider my-0">

        <!-- Nav Item - Dashboard -->
        <li class="nav-item active">
            <a class="nav-link" href="/dashboard">
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span>Tổng quan</span></a>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider">

        <!-- Heading -->
        <div class="sidebar-heading">
            Lớp học
        </div>

        <!-- Nav Item - Pages Collapse Menu -->
        <li class="nav-item">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                aria-expanded="true" aria-controls="collapseTwo">
                <i class="fas fa-fw fa-chalkboard"></i>
                <!-- fa-fw -> fix width -->
                <span>Quản lý lớp học</span>
                <!-- <router-link to="/all-classrooms" style="color: white;"><span>Lớp học</span></router-link> -->
            </a>
            <div id="collapseTwo" class="collapse" aria-labelledby="collapseTwo" data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <a class="collapse-item" href="#"><router-link to="/all-classroom" style="color: black;">
                            <span>Tất cả lớp học</span></router-link></a>
                    <a class="collapse-item" href="#"><router-link to="/classroom-schedule" style="color: black;">
                            <span>Lịch dạy</span></router-link></a>
                    <a class="collapse-item" href="#"><router-link to="/classroom-schedule" style="color: black;">
                            <span>Lớp học trong ngày</span></router-link></a>
                </div>
            </div>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider">

        <!-- Heading -->
        <div class="sidebar-heading">
            Học sinh
        </div>

        <!-- Nav Item - Pages Collapse Menu -->
        <li class="nav-item">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
                aria-expanded="true" aria-controls="collapsePages">
                <i class="fas fa-fw fa-user-graduate"></i>
                <router-link to="/setting" style="color: white;"><span>Tất cả học sinh</span></router-link>
            </a>
        </li>

        <!-- Nav Item - Charts -->
        <!-- <li class="nav-item">
            <a class="nav-link" href="charts.html">
                <i class="fas fa-fw fa-chart-area"></i>
                <span>Charts</span></a>
        </li> -->

        <!-- Nav Item - Tables -->
        <!-- <li class="nav-item">
            <a class="nav-link" href="tables.html">
                <i class="fas fa-fw fa-table"></i>
                <span>Tables</span></a>
        </li> -->

        <!-- Divider -->
        <hr class="sidebar-divider">

        <!-- Heading -->
        <div class="sidebar-heading">
            Quản lý học phí
        </div>

        <li class="nav-item">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
                aria-expanded="true" aria-controls="collapsePages">
                <i class="fas fa-fw fa-calculator"></i>
                <router-link to="/setting" style="color: white;"><span>Học phí</span></router-link>
            </a>
            <div id="collapsePages" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">Login Screens:</h6>
                    <a class="collapse-item" href="login.html">Login</a>
                    <a class="collapse-item" href="register.html">Register</a>
                    <a class="collapse-item" href="forgot-password.html">Forgot Password</a>
                    <div class="collapse-divider"></div>
                    <h6 class="collapse-header">Other Pages:</h6>
                    <a class="collapse-item" href="404.html">404 Page</a>
                    <a class="collapse-item" href="blank.html">Blank Page</a>
                </div>
            </div>
        </li>

        <hr class="sidebar-divider d-none d-md-block">


        <!-- Heading -->
        <div class="sidebar-heading">
            Quản lý tài liệu
        </div>

        <div class="nav-item">
            <!-- data-toggle="collapse" -->
            <a class="nav-link collapsed" href="#" data-target="#collapseSetting" aria-expanded="true"
                aria-controls="collapseSetting">
                <i class="fas fa-fw fa-book"></i>
                <router-link to="/setting" style="color: white;"><span>Tài liệu</span></router-link>
            </a>
        </div>


        <hr class="sidebar-divider d-none d-md-block">

        <div class="nav-item">
            <!-- data-toggle="collapse" -->
            <a class="nav-link collapsed" href="#" data-target="#collapseSetting" aria-expanded="true"
                aria-controls="collapseSetting">
                <i class="fas fa-fw fa-cog"></i>
                <router-link to="/setting" style="color: white;"><span>Cài đặt</span></router-link>
            </a>
        </div>

        <!-- Divider -->
        <hr class="sidebar-divider d-none d-md-block">

        <!-- Sidebar Toggler (Sidebar) -->
        <div class="text-center d-none d-md-inline">
            <button class="rounded-circle border-0" id="sidebarToggle" @click="toggleSidebar"></button>
        </div>

    </ul>
    <!-- End of Sidebar -->
</template>
<script>
export default {
    name: 'nav-bar',
    data() {
        return {
            sidebarToggled: false
        }
    },
    methods: {
        toggleSidebar() {
            this.sidebarToggled = !this.sidebarToggled;
        }
    },
    mounted() {

        // coreui.Sidebar._sidebarInterface(document.getElementById('sidebar'))
    }
}
</script>
<style scoped>
.nav-link::after {
    content: none !important;
}
</style>