<template>
    <div>
        <div>
            <div class="card">
                <div class="card-header header-elements-inline">
                    <h5 class="card-title">گزارشات مالی</h5>
                </div>

                <rs-table v-if="!loading">
                    <template slot="head">
                        <th>ردیف</th>
                        <th>نام</th>
                        <th>مقدار</th>
                        <th>درگاه</th>
                        <th>به چهت</th>
                        <th>پیوست</th>
                        <th>توضیحات وضعیت</th>
                        <th>وضعیت</th>
                    </template>

                    <template slot="body">
                        <tr v-for="(item, index) of list">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.name }}</td>
                            <td>
                                {{ item.amount }}$
                                <rs-badge-icon class="cursor-pointer ml-2 mr-2"
                                               color="primary"
                                               icon="pencil6"
                                               rounded
                                               @click.native="showUpdateAmountModal(item.id, index)"/>
                            </td>
                            <td>{{ item.gateway_name }}</td>
                            <td>{{ item.in_order_to }}</td>
                            <td>
                                <a href="">
                                    <img :src="`${env.VUE_APP_API_URL}uploads?id=${item.attachment_media_id}`"
                                                alt="" style="height: 30px"/>
                                </a>
                            </td>
                            <td>{{ item.status_description }}</td>
                            <td>
                                <div class="d-flex align-items-center">
                                    <rs-drop-down class="flex-grow-1" :source="statuses" v-model="item.status" @input="updateStatus(item.id, index)"/>
                                    <rs-badge-icon class="cursor-pointer ml-2 mr-2"
                                                   color="primary"
                                                   icon="bubble-lines4"
                                                   rounded
                                                   @click.native="showUpdateModal(item.id, index)"/>
                                </div>
                            </td>
                        </tr>
                    </template>
                </rs-table>

                <rs-loading v-if="loading" icon="spinner4"/>

                <div class="card-body">
                    <rs-pagination :count="totalPages" v-model="currentPage" @change="updateListByPagination"/>
                </div>
            </div>

            {{ /* Start status description modal */ }}
            <rs-form :submit="updateStatus" @errors="setFormErrors">
                <rs-modal :dialogStyle="{minWidth: '600px'}"
                          :title="`${modals.transaction.type === 'ADD' ? 'افزودن' : 'ویرایش'} نقشه`"
                          v-model="modals.transaction.visibility">

                    <div class="col-sm-12">
                        <rs-input textarea placeholder="توضیحات" v-model="modals.transaction.fields.status_description"/>
                    </div>

                    <template slot="footer">
                        <rs-button type="button" color="link" @click.native="modals.transaction.visibility = false">بستن
                        </rs-button>
                        <rs-button type="submit" bg="primary" :loading="modals.transaction.loading">{{
                            modals.transaction.type === 'ADD'
                            ?
                            'افزودن' : 'بروزرسانی'}}
                        </rs-button>
                    </template>

                </rs-modal>
            </rs-form>
            {{ /* End status description modal */ }}

            {{ /* Start amount modal */ }}
            <rs-form :submit="updateAmount" @errors="setFormErrors">
                <rs-modal :dialogStyle="{minWidth: '600px'}"
                          title="ویرایش موچودی"
                          v-model="modals.transactionAmount.visibility">

                    <div class="col-sm-12">
                        <rs-input placeholder="موجودی" type="number" v-model="modals.transactionAmount.fields.amount"/>
                    </div>

                    <template slot="footer">
                        <rs-button type="button" color="link" @click.native="modals.transactionAmount.visibility = false">بستن
                        </rs-button>
                        <rs-button type="submit" bg="primary" :loading="modals.transactionAmount.loading">بروزرسانی</rs-button>
                    </template>

                </rs-modal>
            </rs-form>
            {{ /* End amount modal */ }}
        </div>
    </div>
</template>

<script>
    import {
        itemsPerPage,
        transactions, updateTransactionAmount,
        updateTransactionStatus
    } from '../../../../api'

    export default {
        name: 'List',

        metaInfo: {
            title: 'گزارشات مالی'
        },

        breadcrumb: () => ([
            { label: 'پیشخوان', to: '/', icon: 'home4' },
            { label: 'گزارشات مالی', to: '/transactions', icon: 'calculator2' },
        ]),

        data: () => ({
            env: process.env,

            currentPage: 1,
            itemsPerPage,
            loading: false,

            list: [],
            totalPages: 0,

            statuses: [
                {key: 0, value: 'در انتظار تایید'},
                {key: 1, value: 'تایید'},
                {key: 2, value: 'رد شده'},
            ],

            modals: {
                transaction: {
                    type: 'ADD', // {'ADD' | 'EDIT'}

                    visibility: false,
                    loading: false,
                    formErrors: {},

                    id: -1,
                    index: -1,

                    fields: {
                        status_description: '',
                    }
                },
                transactionAmount: {
                    visibility: false,
                    loading: false,
                    formErrors: {},

                    id: -1,
                    index: -1,

                    fields: {
                        amount: '',
                    }
                },
            }
        }),

        methods: {
            getAll () {
                this.loading = true

                transactions('INPUT')
                    .then(response => {
                        this.list = response.data.result
                        let totalPages = response.data.total / this.itemsPerPage
                        this.totalPages = (totalPages % 1 !== 0) ? Math.floor(totalPages) + 1 : totalPages
                    })
                    .catch(error => {
                        this.$toast.error({
                            title: 'خطا',
                            message: 'خطا در بارگیری گزارشات',
                        })
                    })
                    .finally(() => {
                        this.loading = false
                    })
            },

            updateListByPagination () {
                this.getAll()
            },

            // Get errors from "rs-form"-component and set in "formErrors"-data-variable
            setFormErrors (errors) {
                this.modals.transaction.formErrors = errors
            },

            // Customizing error-message for show in view (below inputs)
            getInputError (key) {
                return (this.modals.transaction.formErrors.hasOwnProperty(key)) ? this.modals.transaction.formErrors[key][0] : ''
            },

            // <editor-fold desc="Transaction">

            showUpdateModal (id, index) {
                this.modals.transaction.loading = false
                this.modals.transaction.formErrors = {}

                this.modals.transaction.fields.status_description = this.list[index].status_description

                this.modals.transaction.id = id
                this.modals.transaction.index = index
                this.modals.transaction.visibility = true
            },

            updateStatus (id = undefined, index = -1) {
                this.modals.transaction.loading = true

                updateTransactionStatus(id || this.modals.transaction.id, this.list[index > -1 ? index : this.modals.transaction.index].status, index > -1 ? this.list[index].status_description : this.modals.transaction.fields.status_description)
                    .then(response => {
                        this.$toast.success({
                            title: 'ویرایش گزارش',
                            message: 'بروزرسانی با موفقیت انجام شد',
                        })
                        this.modals.transaction.visibility = false
                        this.getAll()
                    })
                    .catch(error => {
                        this.$toast.error({
                            title: 'ویرایش گزارش',
                            message: 'بروزرسانی با شکست مواجه شد',
                        })
                    })
                    .finally(() => {
                        this.modals.transaction.loading = false
                    })
            },

            // </editor-fold>

            // <editor-fold desc="Transaction">

            showUpdateAmountModal (id, index) {
                this.modals.transactionAmount.loading = false
                this.modals.transactionAmount.formErrors = {}

                this.modals.transactionAmount.fields.amount = this.list[index].amount

                this.modals.transactionAmount.id = id
                this.modals.transactionAmount.index = index
                this.modals.transactionAmount.visibility = true
            },

            updateAmount() {
                this.modals.transactionAmount.loading = true

                updateTransactionAmount(this.modals.transactionAmount.id, this.modals.transactionAmount.fields.amount)
                    .then(response => {
                        this.$toast.success({
                            title: 'ویرایش موجودی گزارش',
                            message: 'بروزرسانی با موفقیت انجام شد',
                        })
                        this.modals.transactionAmount.visibility = false
                        this.getAll()
                    })
                    .catch(error => {
                        this.$toast.error({
                            title: 'ویرایش موجودی گزارش',
                            message: 'بروزرسانی با شکست مواجه شد',
                        })
                    })
                    .finally(() => {
                        this.modals.transactionAmount.loading = false
                    })
            },

            // </editor-fold>

            type(type) {
                switch (type) {
                    case 'INPUT':
                        return 'ورودی';

                    case 'OUTPUT':
                        return 'خروجی';

                    default:
                        return 'مشخص نشده';
                }
            },

            getKey1(description) {
                try {
                    let keys = JSON.parse(description)
                    if (keys.hasOwnProperty('key1')) {
                        switch (keys.key1.type) {
                            case 'string':
                                return keys.key1.value
                            case 'image':
                                return keys.key1.value
                        }
                    } else {
                        return ''
                    }
                } catch (e) {
                    return ''
                }
            },

            getKey2(description) {
                try {
                    let keys = JSON.parse(description)
                    if (keys.hasOwnProperty('key2')) {
                        switch (keys.key2.type) {
                            case 'string':
                                return keys.key2.value
                            case 'image':
                                return keys.key2.value
                        }
                    } else {
                        return ''
                    }
                } catch (e) {
                    return ''
                }
            },
        },

        mounted () {
            this.getAll()
        }
    }
</script>
