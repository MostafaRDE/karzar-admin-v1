<template>
    <div id="system">
        <router-view/>
    </div>
</template>

<script>
    import objectsAuth from './modules/objects/auth.js'

    export default {

        metaInfo: {
            titleTemplate: 'پنل مدیریت - %s'
        },

        watch: {
            $route: {
                deep: true,
                handler(route) {
                    if (route.matched[route.matched.length - 1].components.default.hasOwnProperty('breadcrumb'))
                        this.$store.commit('updateBreadcrumb', route.matched[route.matched.length - 1].components.default.breadcrumb());
                },
            }
        },

        mounted () {
            console.log(process.env)

            if (window.userAuth()) {
                this.$store.commit('user/updateUserData', window.parseJwt(window.getCookie(objectsAuth.AUTH_TOKEN)))
            }
        }

    }
</script>

<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }

    .page-content {
        min-height: calc(100vh - 48px)
    }
</style>
