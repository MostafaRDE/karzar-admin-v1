<template>
    <div>
        <div>
            <div class="card">
                <div class="card-header header-elements-inline">
                    <h5 class="card-title">ارتباط با ما</h5>
                </div>

                <rs-table v-if="!loading">
                    <template slot="head">
                        <th>ردیف</th>
                        <th>نام</th>
                        <th>ایمیل</th>
                        <th>پیام</th>
                    </template>

                    <template slot="body">
                        <tr v-for="(item, index) of items">
                            <td class="select-text">{{ index + 1 }}</td>
                            <td class="select-text">{{ item.name }}</td>
                            <td class="select-text">{{ item.email }}</td>
                            <td class="select-text">{{ item.message }}</td>
                        </tr>
                    </template>
                </rs-table>

                <rs-loading v-if="loading" icon="spinner4"/>

                <div class="card-body">
                    <rs-pagination :count="totalPages" v-model="currentPage" @change="updateListByPagination"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        itemsPerPage,
        contactUs,
    } from '../../../api'

    const moment = require('moment')

    export default {
        name: 'List',

        metaInfo: {
            title: 'ارتباط با ما'
        },

        breadcrumb: () => ([
            { label: 'پیشخوان', to: '/', icon: 'home4' },
            { label: 'کاربران', to: '/', icon: 'users4' },
        ]),

        data() {
            let vm = this;

            return {
                currentPage: 1,
                itemsPerPage,
                totalPages: 0,
                loading: false,

                items: [],
            }
        },

        methods: {
            getItems () {
                this.loading = true;

                contactUs(this.currentPage, this.itemsPerPage).then(response => {
                    let totalPages = response.data.total / this.itemsPerPage
                    this.totalPages = (totalPages % 1 !== 0) ? Math.floor(totalPages) + 1 : totalPages
                    this.items = response.data.result
                }).catch(error => {
                    this.$toast.error({
                        title: 'خطا',
                        message: 'خطا در دریافت کاربران',
                    })
                }).finally(() => {
                    this.loading = false;
                })
            },

            updateListByPagination() {
                this.getItems()
            },
        },

        mounted () {
            this.getItems()
        }
    }
</script>
