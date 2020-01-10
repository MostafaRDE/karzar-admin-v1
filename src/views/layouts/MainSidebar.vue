<template>
    <div class="sidebar sidebar-light sidebar-main sidebar-fixed sidebar-expand-md">

        <!-- Sidebar mobile toggler -->
        <div class="sidebar-mobile-toggler text-center">
            <a href="#" class="sidebar-mobile-main-toggle">
                <i class="icon-arrow-left8"></i>
            </a>
            Navigation
            <a href="#" class="sidebar-mobile-expand">
                <i class="icon-screen-full"></i>
                <i class="icon-screen-normal"></i>
            </a>
        </div>
        <!-- /sidebar mobile toggler -->

        <!-- Sidebar content -->
        <div class="sidebar-content">

            <!-- User menu -->
            <div class="sidebar-user-material">
                <div class="sidebar-user-material-body">
                    <div class="card-body text-center">
                        <a href="#">
                            <img :src="$store.state.user.userImage"
                                 class="img-fluid rounded-circle shadow-1 mb-3" width="80" height="80" alt="">
                        </a>
                        <h6 class="mb-0 text-white text-shadow-dark">{{ $store.getters['user/fullName'] }}</h6>
                        <span class="font-size-sm text-white text-shadow-dark">{{ $store.getters['user/roleLabel'] }}</span>
                    </div>

                    <div class="sidebar-user-material-footer">
                        <a href="#user-nav"
                           class="d-flex justify-content-between align-items-center text-shadow-dark dropdown-toggle"
                           data-toggle="collapse"><span>پروفایل</span></a>
                    </div>
                </div>

                <div class="collapse" id="user-nav">
                    <ul class="nav nav-sidebar">
                        <li class="nav-item">
                            <a href="#" class="nav-link">
                                <i class="icon-cog5"></i>
                                <span>تنظیمات حساب</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link">
                                <i class="icon-switch2"></i>
                                <span>خروج</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- /user menu -->

            <!-- Main navigation -->
            <div class="card card-sidebar-mobile">
                <ul class="nav nav-sidebar" data-nav-type="accordion">

                    {{ /* Content */ }}
                    <li v-for="mainItem of sidebar" class="nav-item">
                        <router-link :to="mainItem.route" class="nav-link">
                            <i :class="`icon-${mainItem.icon}`"></i>
                            <span>{{ mainItem.title }}</span>
                        </router-link>
                    </li>

                </ul>
            </div>
            <!-- /main navigation -->

        </div>
        <!-- /sidebar content -->

    </div>
</template>

<script>
    import MainSidebarData from '../../utils/objects/MainSidebarData'

    export default {
        name: 'SideBar',

        data: () => ({
            MainSidebarData
        }),

        computed: {
            sidebar() {
                return this.MainSidebarData.filter(sidebar => {
                    if (sidebar.hasOwnProperty('roles')) {
                        return sidebar.roles.includes(this.$store.state.user.role)
                    } else {
                        return false
                    }
                })
            }
        }
    }
</script>
