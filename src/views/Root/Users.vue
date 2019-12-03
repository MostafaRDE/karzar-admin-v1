<template>
    <div>
        <!-- Basic card -->
        <div class="card mb-0">
            <div class="card-body">
                <div>
                    <rs-input/>
                    <dashboard-navigation :source="navigation"
                                          v-model="selectedNavigation"/>
                </div>
                <div>

                </div>
                <div>
                    <router-view/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Users",

        data: () => ({
            selectedNavigation: 0,
            navigation: [
                {
                    color: 'primary',
                    label: 'کل کاربران',
                    action() {
                    },
                },
                {
                    color: 'success',
                    label: 'کاربران تایید شده',
                    action() {
                    },
                },
                {
                    bg: 'pink',
                    color: '',
                    label: 'کاربران رد شده',
                    action() {
                    },
                },
            ]
        })
    }
</script>
