<template>
    <div>
        <!-- Basic card -->
        <div class="card">
            <div class="card-body">
                <div>
                    <rs-input placeholder="جستجو براساس کد ملی، نام و نام خانوادگی، شماره همراه، شماره ثابت، کارت بانکی، شماره شبا و سفارشات درگیر"/>
                    <div class="d-flex">
                        <dashboard-navigation :source="navigation"
                                              v-model="selectedNavigation"/>
                        <rs-button color="light" icon="user-plus" @click.native="$router.push({name: 'userCreate'})">افزودن کاربر</rs-button>
                    </div>
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
                نکات
                </div>

                <rs-table>
                    <template slot="head">
                        <th>نام و نام خانوادگی</th>
                        <th>شماره همراه</th>
                        <th>وضعیت احراز هویت</th>
                        <th>سطح کاربر</th>
                        <th>تایید کاربر</th>
                        <th>بلاک کردن کاربر</th>
                        <th>جزییات</th>
                    </template>

                    <template slot="body">
                        <tr>
                            <td class="select-text">مصطفی رستم دخت عفتی</td>
                            <td class="select-text">09383359523</td>
                            <td>
                                <rs-badge color="success" pill>تایید شده</rs-badge>
                            </td>
                            <td>
                                <rs-badge pill>تریدر</rs-badge>
                            </td>
                            <td>
                                <rs-badge-icon class="cursor-pointer"
                                               color="success"
                                               icon="user-check"
                                               rounded
                                               @click.native=""/>
                            </td>
                            <td>
                                <rs-badge-icon class="cursor-pointer"
                                               bg="pink-400"
                                               icon="user-cancel"
                                               rounded
                                               @click.native=""/>
                            </td>
                            <td>
                                <rs-badge-icon class="cursor-pointer"
                                               color="light"
                                               icon="menu"
                                               rounded
                                               @click.native=""/>
                            </td>
                        </tr>
                    </template>
                </rs-table>

                <div class="card-body">
                    <rs-pagination :count="20" v-model="currentPage"/>
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
            currentPage: 1,
            selectedNavigation: 0,
            navigation: [
                {
                    color: 'primary',
                    icon: 'users',
                    label: 'کل کاربران',
                    action () {
                    },
                },
                {
                    color: 'success',
                    icon: 'user-check',
                    label: 'کاربران تایید شده',
                    action () {
                    },
                },
                {
                    bg: 'pink',
                    color: '',
                    icon: 'user-cancel',
                    label: 'کاربران رد شده',
                    action () {
                    },
                },
            ],
        })
    }
</script>
