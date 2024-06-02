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

        <li class="nav-item">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
                aria-expanded="true" aria-controls="collapsePages">
                <i class="fas fa-fw fa-chalkboard"></i>
                <router-link to="/student-classroom" style="color: white;"><span>Lớp học của tôi</span></router-link>
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
    name: 'student-nav-bar',
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