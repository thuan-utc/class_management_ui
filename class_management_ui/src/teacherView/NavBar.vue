<template>
    <!-- Sidebar -->
    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar"
        :class="{ toggled: sidebarToggled }">

        <!-- Sidebar - Brand -->
        <a class="sidebar-brand d-flex align-items-center justify-content-center" href="/dashboard">
            <div class="sidebar-brand-icon">
                <i class="fas fa-school"></i>
            </div>
            <div class="sidebar-brand-text mx-3">Lớp học</div>
        </a>

        <!-- Divider -->
        <hr class="sidebar-divider my-0">

        <!-- Nav Item - Dashboard -->
        <li class="nav-item">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
                aria-expanded="true" aria-controls="collapsePages">
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <router-link to="/dashboard" style="color: white;"><span>Tổng quan</span></router-link>
            </a>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider">

        <!-- Heading -->
        <div class="sidebar-heading">
            Lớp học
        </div>

        <li class="nav-item">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
                aria-expanded="true" aria-controls="collapsePages">
                <i class="fas fa-fw fa-chalkboard"></i>
                <router-link to="/all-classroom" style="color: white;"><span>Quản lý lớp học</span></router-link>
            </a>
        </li>

        <li class="nav-item">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
                aria-expanded="true" aria-controls="collapsePages">
                <i class="fas fa-user-check"></i>
                <router-link to="/class-attendance" style="color: white;"><span>Quản lý điểm danh</span></router-link>
            </a>
        </li>

        <li class="nav-item">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
                aria-expanded="true" aria-controls="collapsePages">
                <i class="fas fa-star"></i>
                <router-link to="/exam-score" style="color: white;"><span>Quản lý điểm</span></router-link>
            </a>
        </li>


        <!-- Divider -->
        <hr class="sidebar-divider">

        <!-- Heading -->
        <div class="sidebar-heading">
            Học phí
        </div>

        <li class="nav-item">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
                aria-expanded="true" aria-controls="collapsePages">
                <i class="fas fa-fw fa-calculator"></i>
                <router-link to="/tutor-fee" style="color: white;"><span>Tính học phí</span></router-link>
            </a>
        </li>

        <li class="nav-item">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
                aria-expanded="true" aria-controls="collapsePages">
                <i class="fas fa-fw fa-user-graduate"></i>
                <router-link to="/student-not-submitted-fee" style="color: white;"><span>Thanh toán học phí</span></router-link>
            </a>
        </li>

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