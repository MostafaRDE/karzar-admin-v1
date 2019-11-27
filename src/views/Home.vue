<template>
    <div>

        <!-- Main navbar -->
        <main-navbar/>
        <!-- /main navbar -->

        <!-- Page content -->
        <div class="page-content">

            <!-- Main sidebar -->
            <main-sidebar/>
            <!-- /main sidebar -->

            <!-- Main content -->
            <div class="content-wrapper">

                <!-- Page header -->
                <main-header/>
                <!-- /page header -->

                <!-- Content area -->
                <div class="content">

                    <router-view/>

                </div>
                <!-- /content area -->

                <!-- Footer -->
                <main-footer/>

                <!-- /main content -->

            </div>
            <!-- /page content -->

        </div>

    </div>
</template>

<script>
    export default {
        name: 'home',

        mounted () {
            document.body.className += ` navbar-top`
        }
    }
</script>
