<template>
    <div class="page-header page-header-light">
        <div class="page-header-content header-elements-md-inline">
            <div class="page-title d-flex">
                <h4><i class="icon-arrow-right6 mr-2"></i> <span
                        class="font-weight-semibold">{{ getTitle }}</span></h4>
                <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
            </div>

            <div class="header-elements d-none">
                <!--                <a href="#" class="btn btn-labeled btn-labeled-right bg-pink-400">Button <b><i-->
                <!--                    class="icon-menu7"></i></b></a>-->
            </div>
        </div>

        <main-breadcrumb/>
    </div>
</template>

<script>
    export default {
        name: 'MainHeader',

        computed: {
            getTitle() {
                if (this.$route.matched[this.$route.matched.length - 1].components.default.hasOwnProperty('metaInfo'))
                    return this.$route.matched[this.$route.matched.length - 1].components.default.metaInfo.title
            }
        }
    }
</script>
