<template>
    <div>
        <!-- Basic card -->
        <div class="card">
            <div class="card-body">
                <div>
                    <rs-input placeholder="جستجو براساس نام و سیمبل"/>
                    <div class="d-flex">
                        <rs-button color="light" icon="coin-dollar" @click.native="$router.push({name: 'coinCreate'})">افزودن کوین</rs-button>
                    </div>
                </div>
            </div>
        </div>
        <div>

        </div>
        <div>
            <div class="card">
                <div class="card-header header-elements-inline">
                    <h5 class="card-title">کوین ها</h5>
                </div>

                <div class="card-body">
                    نکات
                </div>

                <rs-table>
                    <template slot="head">
                        <th>ردیف</th>
                        <th>نام جفت</th>
                        <th>وضعیت ترید</th>
                        <th>مقدار معامله امروز</th>
                        <th>مقدار سفارشات باز</th>
                        <th>آخرین قیمت</th>
                        <th></th>
                    </template>

                    <template slot="body">
                        <tr>
                            <td class="select-text">1</td>
                            <td class="select-text">BTC/IRT</td>
                            <td class="select-text">
                                <rs-badge color="success" pill>فعال</rs-badge>
                            </td>
                            <td class="select-text">3,000,000$</td>
                            <td>500,000$</td>
                            <td>7,564.23$</td>
                            <td>
                                <rs-badge-icon class="cursor-pointer mr-2"
                                               color="light"
                                               icon="menu"
                                               rounded
                                               @click.native="$router.push({name: 'coinShow', params: {id: 1}})"/>
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
            title: 'کوین ها'
        },

        breadcrumb: () => ([
            {label: 'پیشخوان', to: '/', icon: 'home4'},
            {label: 'کوین ها', to: '/', icon: 'coins'},
        ]),

        data: () => ({
            change: false,
            currentPage: 1,
        })
    }
</script>
