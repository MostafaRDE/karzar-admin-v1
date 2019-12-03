<template>
    <div id="system">
        <router-view/>
    </div>
</template>

<script>
    export default {

        metaInfo: {
            titleTemplate: 'پنل مدیریت - %s'
        },

        watch: {
            $route (route) {
                if (route.matched[1].components.default.hasOwnProperty('breadcrumb'))
                    this.$store.commit('updateBreadcrumb', route.matched[1].components.default.breadcrumb());
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
