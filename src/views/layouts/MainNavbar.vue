<template>
    <div class="navbar navbar-expand-md navbar-dark bg-indigo navbar-static fixed-top">
        <div class="navbar-brand">
            <router-link to="/" class="d-inline-block">
                <img src="@/assets/logo-header.png" alt="">
            </router-link>
        </div>

        <div class="d-md-none">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-mobile">
                <i class="icon-tree5"></i>
            </button>
            <button class="navbar-toggler sidebar-mobile-main-toggle" type="button" @click="toggleNavbarMobile">
                <i class="icon-paragraph-justify3"></i>
            </button>
        </div>

        <div class="collapse navbar-collapse" id="navbar-mobile">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a href="#" class="navbar-nav-link sidebar-control sidebar-main-toggle d-none d-md-block" @click="toggleNavbar">
                        <i class="icon-paragraph-justify3"></i>
                    </a>
                </li>
            </ul>

            <ul class="navbar-nav ml-auto">

                <li class="nav-item dropdown dropdown-user">
                    <router-link  :to="{name: 'profileChangePassword'}" class="navbar-nav-link dropdown-toggle" data-toggle="dropdown">
                        <img src="@/assets/global_assets/images/image.png" class="rounded-circle" alt="">
                        <span>{{ $store.state.user.name }}</span>
                    </router-link>

                    <div class="dropdown-menu dropdown-menu-right">
                        <a href="#" class="dropdown-item"><i class="icon-key"></i> تغییر گذرواژه</a>
                        <a href="javascript:void(0)" class="dropdown-item" @click="logout"><i class="icon-switch2"></i>
                            خروج</a>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'MainNavbar',

        methods: {
            logout() {
                window.deleteCooke('AUTH_TOKEN')
                this.$router.push({name: 'login'})
            },
            toggleNavbar() {
                document.body.classList.toggle('sidebar-xs')
            },
            toggleNavbarMobile() {
                document.body.classList.toggle('sidebar-mobile-main')
            }
        }
    }
</script>
