<template>
    <div>

        <div class="card">
            <div class="card-header header-elements-inline">
                <h5 class="card-title">کاراکتر ها</h5>
                <div>
                    <rs-button class="mr-2" :color="filters.status === 'pending' ? 'primary' : 'light'" @click.native="changeTab('pending')">منتظر تایید</rs-button>
                    <rs-button class="mr-2" :color="filters.status === 'accepted' ? 'primary' : 'light'" @click.native="changeTab('accepted')">تایید شده</rs-button>
                    <rs-button class="mr-2" :color="filters.status === 'rejected' ? 'primary' : 'light'" @click.native="changeTab('rejected')">رد شده</rs-button>
                </div>
            </div>

            <template>

                <rs-loading v-if="loading" icon="spinner4"/>

                <template v-else-if="items.length">

                    <rs-table>
                        <template slot="head">
                            <th>ردیف</th>
                            <th>دارنده</th>
                            <th>نام کاراکتر</th>
                            <th>آی دی کاراکتر</th>
                            <th></th>
                        </template>

                        <template slot="body">
                            <tr v-for="(item, index) of items">
                                <td class="font-weight-normal">{{ index + 1 }}</td>
                                <td class="font-weight-normal">
                                    <router-link :to="{name: 'userShow', params: {id: item.user_id}}">{{ item.owner_name || item.email }}</router-link>
                                </td>
                                <td class="font-weight-normal" style="direction: ltr">{{ item.name }}</td>
                                <td class="font-weight-normal">{{ item.id }}</td>
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

                    <div class="card-body">
                        <rs-pagination :count="totalPages" v-model="currentPage" @change="updateListByPagination"/>
                    </div>

                </template>

                <div v-else class="card-body text-center">
                    <span>کاراکتری پیدا نشد</span>
                </div>

            </template>

            {{ /* Start status description modal */ }}
            <rs-form :submit="updateStatus" @errors="setFormErrors">
                <rs-modal :dialogStyle="{minWidth: '600px'}"
                          :title="`${modals.character.type === 'ADD' ? 'افزودن' : 'ویرایش'} توضیحات`"
                          v-model="modals.character.visibility">

                    <div class="col-sm-12">
                        <rs-input textarea placeholder="توضیحات" v-model="modals.character.fields.status_reason"/>
                    </div>

                    <template slot="footer">
                        <rs-button type="button" color="link" @click.native="modals.character.visibility = false">بستن
                        </rs-button>
                        <rs-button type="submit" bg="primary" :loading="modals.character.loading">{{
                            modals.character.type === 'ADD'
                            ?
                            'افزودن' : 'بروزرسانی'}}
                        </rs-button>
                    </template>

                </rs-modal>
            </rs-form>
            {{ /* End status description modal */ }}
        </div>
    </div>
</template>

<script>
    import {itemsPerPage, characters, updateCharacterStatus} from "../../../api";

    export default {
        name: "List",

        data: () => ({
            items: [],
            currentPage: 1,
            itemsPerPage,
            totalPages: 0,
            loading: false,

            statuses: [
                {key: 0, value: 'در انتظار تایید'},
                {key: 1, value: 'تایید'},
                {key: 2, value: 'رد شده'},
            ],

            modals: {
                character: {
                    type: 'ADD', // {'ADD' | 'EDIT'}

                    visibility: false,
                    loading: false,
                    formErrors: {},

                    id: -1,
                    index: -1,

                    fields: {
                        status_reason: '',
                    }
                },
            },
        }),

        computed: {
            filters() {
                return {
                    status: this.$route.params.status,
                }
            },
        },

        methods: {
            getItems() {
                this.loading = true

                characters(this.currentPage, this.itemsPerPage, this.filters.status.toUpperCase())
                    .then(response => {
                        this.items = response.data.result
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
                this.getItems()
            },

            changeTab(tab) {
                this.$router.push({name: '', params: {status: tab}})
            },

            // Get errors from "rs-form"-component and set in "formErrors"-data-variable
            setFormErrors (errors) {
                this.modals.transaction.formErrors = errors
            },

            // Customizing error-message for show in view (below inputs)
            getInputError (key) {
                return (this.modals.transaction.formErrors.hasOwnProperty(key)) ? this.modals.transaction.formErrors[key][0] : ''
            },

            // <editor-fold desc="Character">

            showUpdateModal (id, index) {
                this.modals.character.loading = false
                this.modals.character.formErrors = {}

                this.modals.character.fields.status_reason = this.items[index].status_reason

                this.modals.character.id = id
                this.modals.character.index = index
                this.modals.character.visibility = true
            },

            updateStatus (id = undefined, index = -1) {
                this.modals.character.loading = true

                updateCharacterStatus(id || this.modals.character.id, this.items[index > -1 ? index : this.modals.character.index].status, index > -1 ? this.items[index].status_reason : this.modals.character.fields.status_reason)
                    .then(response => {
                        this.$toast.success({
                            title: 'ویرایش وضعیت',
                            message: 'بروزرسانی با موفقیت انجام شد',
                        })
                        if (this.modals.character.visibility) {
                            this.modals.character.visibility = false

                            this.modals.character.loading = false
                            this.modals.character.formErrors = {}

                            this.modals.character.fields.status_reason = ''

                            this.modals.character.id = 0
                            this.modals.character.index = -1
                        }
                        this.getItems()
                    })
                    .catch(error => {
                        this.$toast.error({
                            title: 'ویرایش وضعیت',
                            message: 'بروزرسانی با شکست مواجه شد',
                        })
                    })
                    .finally(() => {
                        this.modals.character.loading = false
                    })
            },

            // </editor-fold>
        },

        mounted() {
            this.getItems()
        },

        watch: {
            $route() {
                this.getItems();
            }
        }
    }
</script>
