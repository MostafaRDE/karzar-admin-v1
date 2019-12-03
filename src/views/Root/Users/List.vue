<template>
    <div>
        <!-- Basic card -->
        <div class="card">
            <div class="card-body">
                <div>
                    <rs-input placeholder="جستجو براساس کد ملی، نام و نام خانوادگی، شماره همراه، شماره ثابت، کارت بانکی، شماره شبا و سفارشات درگیر"/>
                    <dashboard-navigation :source="navigation"
                                          v-model="selectedNavigation"/>
                </div>
            </div>
        </div>
        <div>

        </div>
        <div>
            <div class="card">
                <div class="card-header header-elements-inline">
                    <h5 class="card-title">{{ navigation[selectedNavigation].label }}</h5>
                </div>

                <div class="card-body">
<!--                    Seed project includes the most basic components that can help you in development process - basic grid example, card, table and form layouts with standard components. Nothing extra. Easily turn on and off styles of different components in <code>_config.scss</code> file so that your CSS is always as clean as possible. Bootstrap components are always enabled though.-->
                نکات
                </div>

                <div class="table-responsive">
                    <table class="table">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>Eugene</td>
                            <td>Kopyov</td>
                            <td>@Kopyov</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Victoria</td>
                            <td>Baker</td>
                            <td>@Vicky</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>James</td>
                            <td>Alexander</td>
                            <td>@Alex</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Franklin</td>
                            <td>Morrison</td>
                            <td>@Frank</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div class="card-body">
                    <rs-pagination :count="9" v-model="currentPage"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "List",

        metaInfo: {
            title: 'کاربران'
        },

        breadcrumb: () => ([
            {label: 'پیشخوان', to: '/', icon: 'home4'},
            {label: 'کاربران', to: '/', icon: 'users4'},
        ]),

        data: () => ({
            currentPage: 0,
            selectedNavigation: 0,
            navigation: [
                {
                    color: 'primary',
                    label: 'کل کاربران',
                    action () {
                    },
                },
                {
                    color: 'success',
                    label: 'کاربران تایید شده',
                    action () {
                    },
                },
                {
                    bg: 'pink',
                    color: '',
                    label: 'کاربران رد شده',
                    action () {
                    },
                },
            ],
        })
    }
</script>
