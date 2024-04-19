<template>
    <!-- Footer -->
    <footer class="sticky-footer bg-white">
        <div class="container my-auto">
            <div class="copyright text-center my-auto">
                <span>Copyright &copy; Nguyen Duc Thuan - CNTT2 - K61 - UTC</span>
            </div>
        </div>
    </footer>
    <!-- End of Footer -->
</template>
<script>
export default {
    name: 'footer-bar'
}
</script>

<style scoped>
.sticky-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: white;
    text-align: center;
    padding: 10px 0; /* Adjust padding as needed */
    border-top: 1px solid #ddd; /* Optional: Add a border at the top of the footer */
}
</style>
