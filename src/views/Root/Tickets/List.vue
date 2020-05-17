<template>
    <div>
        <!-- Basic card -->
        <div class="card">
            <div class="card-body">
                <div>
                    <div class="row">
                        <div class="col-sm mb-0">
                            <rs-input class="mb-0" placeholder="شماره همراه" v-model="filters.mobileNumber"/>
                        </div>
                        <div class="col-sm mb-0">
                            <rs-input class="mb-0" placeholder="شماره تیکت" v-model="filters.ticketId"/>
                        </div>
                        <div class="col-sm mb-0">
                            <rs-drop-down class="mb-0" :source="statuses" v-model="filters.status"/>
                        </div>
                        <div class="col-sm-1 mb-0">
                            <rs-button color="primary" class="w-100" :filtering="filtering" @click.native="getItems">جستجو</rs-button>
                        </div>
                    </div>
                    <div class="d-flex">
                        <dashboard-navigation :source="navigation" v-model="selectedNavigation"/>
                        <rs-button color="light" icon="tree7" class="mr-2 mt-3" style="height: fit-content"
                                   @click.native="$router.push({name: 'ticketsCategories'})">دسته بندی ها
                        </rs-button>
                    </div>
                </div>
            </div>
        </div>
        <div>

        </div>
        <div>
            <div class="card">
                <div class="card-header header-elements-inline">
                    <h5 class="card-title">تیکت ها</h5>
                </div>

                <div v-if="loading" class="card-body text-center">
                    <rs-loading icon="spinner4"/>
                </div>

                <div v-if="!items.length && !loading" class="card-body text-center">
                    <span>چیزی پیدا نشد</span>
                </div>

                <rs-table v-if="items.length && !loading">
                    <template slot="head">
                        <th>ردیف</th>
                        <th>شماره</th>
                        <th>عنوان</th>
                        <th>دسته بندی</th>
                        <th>نام کاربر</th>
                        <th>وضعیت</th>
                        <th></th>
                    </template>

                    <template slot="body">
                        <tr v-for="(item, index) of items">
                            <td class="font-weight-normal">{{ index + 1 }}</td>
                            <td class="select-text font-weight-normal">#{{ item.id }}</td>
                            <td class="select-text font-weight-normal">{{ item.subject }}</td>
                            <td>
                                <rs-badge color="primary" pill class="font-size-sm">{{ item.cat_name }}</rs-badge>
                            </td>
                            <td class="select-text text-weight-normal">
                                <a href="javascript:void(0)" class="font-weight-bold" @click="$router.push({name: 'userShow', params: {id: item.user_id}})">{{ item.user_name }}</a>
                            </td>
                            <td>
                                <rs-badge :color="statusColor(item.status)" pill class="font-size-sm">{{ status(item.status) }}</rs-badge>
                            </td>
                            <td>
                                <rs-badge-icon class="cursor-pointer mr-2"
                                               color="primary"
                                               icon="bubbles3"
                                               rounded
                                               @click.native="$router.push({name: 'ticketChat', params: {id: item.id}})"/>
                                <rs-badge-icon v-if="item.status !== 'CLOSE'"
                                               class="cursor-pointer mr-2"
                                               bg="success"
                                               icon="checkmark3"
                                               rounded
                                               :loading="changeStatusClosing.indexOf(item.id) > -1"
                                               @click.native="changeStatus(index, item.id, 'CLOSE')"/>
                                <rs-badge-icon v-if="item.status !== 'CLOSE' && item.status !== 'PROCESSING'"
                                               class="cursor-pointer mr-2"
                                               color="warning"
                                               icon="cog"
                                               rounded
                                               :loading="changeStatusProcessing.indexOf(item.id) > -1"
                                               @click.native="changeStatus(index, item.id, 'PROCESSING')"/>
                            </td>
                        </tr>
                    </template>
                </rs-table>

                <div v-if="items.length && !loading" class="card-body">
                    <rs-pagination :count="totalPages" v-model="currentPage" @change="updateListByPagination"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {itemsPerPage, tickets, ticketChangeStatus} from '../../../api'

    export default {
        name: 'List',

        metaInfo: {
            title: 'تیکت ها'
        },

        breadcrumb: () => ([
            { label: 'پیشخوان', to: '/', icon: 'home4' },
            { label: 'تیکت ها', to: { name: 'ticketsList' }, icon: 'bubbles3' },
        ]),

        data () {
            let vm = this
            return {
                change: false,
                itemsPerPage,
                currentPage: 1,
                totalPages: 0,

                loading: false,
                items: [],

                changeStatusProcessing: [],
                changeStatusClosing: [],
                changeStatusDeleting: [],

                statuses: [
                    {key: null, value: 'انتخاب نشده'},
                    {key: 'NEW', value: 'جدید'},
                    {key: 'OPEN', value: 'باز'},
                    {key: 'ANSWER_USER', value: 'پاسخ کاربر'},
                    {key: 'ANSWER_ADMIN', value: 'پاسخ کارشناس'},
                    {key: 'PROCESSING', value: 'در حال پردازش'},
                    {key: 'CLOSE', value: 'بسته شده'},
                ],
                filtering:false,
                filters: {
                    category: '',
                    ticketId: '',
                    mobileNumber: '',
                    status: null,
                },

                selectedNavigation: 0,
                navigation: [
                    {
                        bg: 'purple',
                        icon: 'headset',
                        label: 'پشتیبانی',
                        // count: 0,
                        // countColor: 'primary',
                        action () {
                            vm.filters.category = '18'
                            vm.filters.status = null
                            vm.currentPage = 1
                            vm.getItems()
                        },
                    },
                    {
                        color: 'success',
                        icon: 'calculator2',
                        label: 'بخش مالی',
                        // count: 0,
                        // countBg: 'dark',
                        action () {
                            vm.filters.category = '19'
                            vm.filters.status = null
                            vm.currentPage = 1
                            vm.getItems()
                        },
                    },
                    {
                        bg: 'pink',
                        color: '',
                        icon: 'gear',
                        label: 'بخش فنی',
                        // count: 0,
                        // countBg: 'dark',
                        action () {
                            vm.filters.category = '20'
                            vm.filters.status = null
                            vm.currentPage = 1
                            vm.getItems()
                        },
                    },
                    {
                        bg: 'orange',
                        color: '',
                        icon: 'user-tie',
                        label: 'مدیریت',
                        // count: 0,
                        // countBg: 'dark',
                        action () {
                            vm.filters.category = '21'
                            vm.filters.status = null
                            vm.currentPage = 1
                            vm.getItems()
                        },
                    },
                    {
                        bg: 'orange',
                        color: '',
                        icon: 'collaboration',
                        label: 'همکاری',
                        // count: 0,
                        // countBg: 'dark',
                        action () {
                            vm.filters.category = '22'
                            vm.filters.status = null
                            vm.currentPage = 1
                            vm.getItems()
                        },
                    },
                    {
                        color: 'warning',
                        icon: 'gear',
                        label: 'در حال پردازش',
                        // count: 0,
                        // countBg: 'dark',
                        action () {
                            vm.filters.category = ''
                            vm.filters.status = 'PROCESSING'
                            vm.currentPage = 1
                            vm.getItems()
                        },
                    },
                    {
                        color: '',
                        icon: 'loop3',
                        label: 'تازه سازی',
                        action () {
                            vm.getItems()
                        },
                    },
                ],
            }
        },

        methods: {
            getItems() {
                if (!this.loading) {
                    this.loading = true
                    tickets(this.currentPage, this.itemsPerPage, this.filters.status, this.filters.category, this.filters.ticketId, this.filters.mobileNumber)
                        .then(response => {
                            this.items = response.data.result
                            let totalPages = response.data.total / this.itemsPerPage
                            this.totalPages = (totalPages % 1 !== 0) ? Math.floor(totalPages) + 1 : totalPages
                        })
                        .catch(error => {

                        })
                        .finally(() => {
                            this.loading = false
                        })
                }
            },

            changeStatus(index, id, status) {
                switch (status) {
                    case 'CLOSE':
                        if (this.changeStatusClosing.indexOf(id) > -1)
                            return
                        else
                            this.changeStatusClosing.push(id)
                        break;

                    case 'PROCESSING':
                        if (this.changeStatusProcessing.indexOf(id) > -1)
                            return
                        else
                            this.changeStatusProcessing.push(id)
                        break;
                }
                ticketChangeStatus(id, status)
                    .then(response => {
                        this.$toast.success({
                            title: 'وضعیت تیکت',
                            message: 'با موفقیت بروز شد',
                        })
                    })
                    .catch(error => {
                        this.$toast.error({
                            title: 'وضعیت تیکت',
                            message: error.response.data.msg,
                        })
                    })
                    .finally(() => {
                        let i = -1
                        switch (status) {
                            case 'CLOSE':
                                i = this.changeStatusClosing.indexOf(id)
                                this.items[index].status = 'CLOSE'
                                this.changeStatusClosing.splice(i, 1)
                                break

                            case 'PROCESSING':
                                i = this.changeStatusProcessing.indexOf(id)
                                this.items[index].status = 'PROCESSING'
                                this.changeStatusProcessing.splice(i, 1)
                                break
                        }
                    })
            },

            updateListByPagination () {
                this.getItems()
            },

            status(status) {
                switch (status) {
                    case 'NEW':
                        return 'جدید'

                    case 'OPEN':
                        return 'باز'

                    case 'ANSWER_ADMIN':
                        return 'پاسخ کارشناس'

                    case 'ANSWER_USER':
                        return 'پاسخ کاربر'

                    case 'PROCESSING':
                        return 'در حال پردازش'

                    case 'CLOSE':
                        return 'بسته شده'
                }
            },

            statusColor(status) {
                switch (status) {
                    case 'NEW':
                        return 'dark'

                    case 'OPEN':
                        return 'info'

                    case 'ANSWER_ADMIN':
                    case 'CLOSE':
                        return 'success'

                    case 'ANSWER_USER':
                    case 'PROCESSING':
                        return 'warning'
                }
            },
        },

        mounted () {
            this.getItems()
        }
    }
</script>
