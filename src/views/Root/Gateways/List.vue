<template>
    <div>
        <div>
            <div class="card">
                <div class="card-header header-elements-inline">
                    <h5 class="card-title">درگاه های ورودی</h5>
                    <rs-button @click.native="showAddModal">افزودن درگاه</rs-button>
                </div>

                <rs-table v-if="!loading">
                    <template slot="head">
                        <th>ردیف</th>
                        <th>نام</th>
                        <th>وضعیت فعال</th>
                        <th>وضعیت ورودی</th>
                        <th>وضعیت خروجی</th>
                        <th>کلید ورود 1</th>
                        <th>کلید ورود 2</th>
                        <th>کلید خروج 1</th>
                        <th>کلید خروج 2</th>
                        <th>تصویر</th>
                        <th></th>
                    </template>

                    <template slot="body">
                        <tr v-for="(item, index) of list">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.name }}</td>
                            <td>
                                <rs-switchery :active="item.is_active"/>
                            </td>
                            <td>
                                <rs-switchery :active="item.is_deposit"/>
                            </td>
                            <td>
                                <rs-switchery :active="item.is_withdrawal"/>
                            </td>
                            <td>{{ item.key_1_deposit.af }}</td>
                            <td>{{ item.key_2_deposit.af }}</td>
                            <td>{{ item.key_1_withdrawal.af }}</td>
                            <td>{{ item.key_2_withdrawal.af }}</td>
                            <td>
                                <img :src="`${env.VUE_APP_API_URL}uploads?id=${item.image.id}`" alt=""
                                     style="height: 50px"/>
                            </td>
                            <td>
                                <rs-badge-icon class="cursor-pointer mr-2"
                                               bg="teal-600"
                                               icon="pencil6"
                                               rounded
                                               @click.native="showUpdateModal(item.id, index)"/>
                            </td>
                        </tr>
                    </template>
                </rs-table>

                <rs-loading v-if="loading" icon="spinner4"/>

                <div class="card-body">
                    <rs-pagination :count="totalPages" v-model="currentPage" @change="updateListByPagination"/>
                </div>
            </div>

            {{ /* Start map modal */ }}
            <rs-form :submit="storeGateway" @errors="setFormErrors">
                <rs-modal :dialogStyle="{minWidth: '600px'}"
                          :title="`${modals.gateway.type === 'ADD' ? 'افزودن' : 'ویرایش'} نقشه`"
                          v-model="modals.gateway.visibility">

                    <div class="d-flex">
                        <div class="flex-grow-1">
                            <label>لوگو درگاه</label>
                            <rs-input type="file"
                                      placeholder="عکس نقشه"
                                      name="image"
                                      :error="getInputError('image')"
                                      @change.native="changeImage"/>
                        </div>
                        <div class="ml-2 d-flex align-items-center" style="width: 70px">
                            <img ref="mapImage"
                                 :src="modals.gateway.imageURL || modals.gateway.defaultImage"
                                 alt="" class="w-100"/>
                        </div>
                    </div>

                    <div class="col-sm-12">
                        <rs-input placeholder="عنوان"
                                  v-model="modals.gateway.fields.name"/>
                    </div>

                    <div class="col-sm-12 border-bottom pb-3 px-0 mx-2 mb-3" style="width: calc(100% - 20px)">
                        <div class="row">
                            <div class="col-sm-4">
                                <div class="d-flex justify-content-between">
                                    <span>وضعیت فعال</span>
                                    <rs-switchery v-model="modals.gateway.fields.is_active"/>
                                </div>
                            </div>

                            <div class="col-sm-4">
                                <div class="d-flex justify-content-between">
                                    <span>وضعیت ورودی</span>
                                    <rs-switchery v-model="modals.gateway.fields.is_deposit"/>
                                </div>
                            </div>

                            <div class="col-sm-4">
                                <div class="d-flex justify-content-between">
                                    <span>وضعیت خروجی</span>
                                    <rs-switchery v-model="modals.gateway.fields.is_withdrawal"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-12">
                        <rs-input placeholder="کلید ورودی 1 (en)"
                                  v-model="modals.gateway.fields.key1Deposit.en"/>
                    </div>

                    <div class="col-sm-12">
                        <rs-input placeholder="کلید ورودی 1 (af)"
                                  v-model="modals.gateway.fields.key1Deposit.af"/>
                    </div>

                    <div class="col-sm-12">
                        <rs-input placeholder="کلید ورودی 2 (en)"
                                  v-model="modals.gateway.fields.key2Deposit.en"/>
                    </div>

                    <div class="col-sm-12">
                        <rs-input placeholder="کلید ورودی 2 (af)"
                                  v-model="modals.gateway.fields.key2Deposit.af"/>
                    </div>

                    <div class="col-sm-12">
                        <rs-input placeholder="کلید خروجی 1 (en)"
                                  v-model="modals.gateway.fields.key1Withdrawal.en"/>
                    </div>

                    <div class="col-sm-12">
                        <rs-input placeholder="کلید خروجی 1 (af)"
                                  v-model="modals.gateway.fields.key1Withdrawal.af"/>
                    </div>

                    <div class="col-sm-12">
                        <rs-input placeholder="کلید خروجی 2 (en)"
                                  v-model="modals.gateway.fields.key2Withdrawal.en"/>
                    </div>

                    <div class="col-sm-12">
                        <rs-input placeholder="کلید خروجی 2 (af)"
                                  v-model="modals.gateway.fields.key2Withdrawal.af"/>
                    </div>

                    <template slot="footer">
                        <rs-button type="button" color="link" @click.native="modals.gateway.visibility = false">بستن
                        </rs-button>
                        <rs-button type="submit" bg="primary" :loading="modals.gateway.loading">{{ modals.gateway.type === 'ADD'
                            ?
                            'افزودن' : 'بروزرسانی'}}
                        </rs-button>
                    </template>

                </rs-modal>
            </rs-form>
            {{ /* End map modal */ }}
        </div>
    </div>
</template>

<script>
    import {
        itemsPerPage,
        gateways,
        storeGateway,
        updateGateway
    } from '../../../api'

    export default {
        name: 'List',

        metaInfo: {
            title: 'درگاه های ورودی'
        },

        breadcrumb: () => ([
            { label: 'پیشخوان', to: '/', icon: 'home4' },
            { label: 'درگاه های ورودی', to: '/gateways', icon: 'wallet' },
        ]),

        data: () => ({
            env: process.env,

            currentPage: 1,
            itemsPerPage,
            loading: false,

            list: [],
            totalPages: 0,

            modals: {
                gateway: {
                    type: 'ADD', // {'ADD' | 'EDIT'}

                    visibility: false,
                    loading: false,
                    formErrors: {},

                    id: -1,
                    index: -1,

                    imageURL: null,
                    defaultImage: require('../../../../public/images/samples/img-world-map.jpg'),

                    fields: {
                        image: null,
                        name: '',
                        is_active: false,
                        is_deposit: false,
                        is_withdrawal: false,
                        key1Deposit: {
                            af: '',
                            en: '',
                        },
                        key2Deposit: {
                            af: '',
                            en: '',
                        },
                        key1Withdrawal: {
                            af: '',
                            en: '',
                        },
                        key2Withdrawal: {
                            af: '',
                            en: '',
                        },
                    }
                },
            }
        }),

        methods: {
            getAll () {
                this.loading = true

                gateways()
                    .then(response => {
                        this.list = response.data.result
                        let totalPages = response.data.total / this.itemsPerPage
                        this.totalPages = (totalPages % 1 !== 0) ? Math.floor(totalPages) + 1 : totalPages
                    })
                    .catch(error => {
                        this.$toast.error({
                            title: 'خطا',
                            message: 'خطا در بارگیری درگاه ها',
                        })
                    })
                    .finally(() => {
                        this.loading = false
                    })
            },

            updateListByPagination () {
                this.getAll()
            },

            // <editor-fold desc="Map">

            showAddModal () {
                this.modals.gateway.type = 'ADD'

                this.modals.gateway.loading = false
                this.modals.gateway.formErrors = {}
                this.modals.gateway.imageURL = null

                this.modals.gateway.fields.image = null
                this.modals.gateway.fields.name = ''
                this.modals.gateway.fields.is_active = false
                this.modals.gateway.fields.is_deposit = false
                this.modals.gateway.fields.is_withdrawal = false
                this.modals.gateway.fields.key1Deposit.af = ''
                this.modals.gateway.fields.key1Deposit.en = ''
                this.modals.gateway.fields.key2Deposit.af = ''
                this.modals.gateway.fields.key2Deposit.en = ''
                this.modals.gateway.fields.key1Withdrawal.af = ''
                this.modals.gateway.fields.key1Withdrawal.en = ''
                this.modals.gateway.fields.key2Withdrawal.af = ''
                this.modals.gateway.fields.key2Withdrawal.en = ''

                this.modals.gateway.id = -1
                this.modals.gateway.index = -1
                this.modals.gateway.visibility = true
            },

            showUpdateModal (id, index) {
                this.modals.gateway.type = 'EDIT'

                this.modals.gateway.loading = false
                this.modals.gateway.formErrors = {}
                this.modals.gateway.imageURL = null

                if (this.list[index].image !== null) {
                    this.modals.gateway.imageURL = `${process.env.VUE_APP_API_URL}uploads?id=${this.list[index].image.id}`
                }
                this.modals.gateway.fields.image = null
                this.modals.gateway.fields.name = this.list[index].name
                this.modals.gateway.fields.is_active = this.list[index].is_active
                this.modals.gateway.fields.is_deposit = this.list[index].is_deposit
                this.modals.gateway.fields.is_withdrawal = this.list[index].is_withdrawal
                this.modals.gateway.fields.key1Deposit.af = this.list[index].key_1_deposit.af || ''
                this.modals.gateway.fields.key1Deposit.en = this.list[index].key_1_deposit.en || ''
                this.modals.gateway.fields.key2Deposit.af = this.list[index].key_2_deposit.af || ''
                this.modals.gateway.fields.key2Deposit.en = this.list[index].key_2_deposit.en || ''
                this.modals.gateway.fields.key1Withdrawal.af = this.list[index].key_1_withdrawal.af || ''
                this.modals.gateway.fields.key1Withdrawal.en = this.list[index].key_1_withdrawal.en || ''
                this.modals.gateway.fields.key2Withdrawal.af = this.list[index].key_2_withdrawal.af || ''
                this.modals.gateway.fields.key2Withdrawal.en = this.list[index].key_2_withdrawal.en || ''

                this.modals.gateway.id = id
                this.modals.gateway.index = index
                this.modals.gateway.visibility = true
            },

            changeImage (e) {
                this.modals.gateway.fields.image = e.target.files[0]
                this.modals.gateway.imageURL = URL.createObjectURL(e.target.files[0])
            },

            // Get errors from "rs-form"-component and set in "formErrors"-data-variable
            setFormErrors (errors) {
                this.modals.gateway.formErrors = errors
            },

            // Customizing error-message for show in view (below inputs)
            getInputError (key) {
                return (this.modals.gateway.formErrors.hasOwnProperty(key)) ? this.modals.gateway.formErrors[key][0] : ''
            },

            storeGateway () {
                this.modals.gateway.loading = true

                switch (this.modals.gateway.type) {
                    case 'ADD':
                        storeGateway(this.modals.gateway.fields.name, this.modals.gateway.fields.is_active, this.modals.gateway.fields.is_deposit, this.modals.gateway.fields.is_withdrawal, JSON.stringify(this.modals.gateway.fields.key1Deposit), JSON.stringify(this.modals.gateway.fields.key2Deposit), JSON.stringify(this.modals.gateway.fields.key1Withdrawal), JSON.stringify(this.modals.gateway.fields.key2Withdrawal), this.modals.gateway.fields.image)
                            .then(response => {
                                this.$toast.success({
                                    title: 'افزودن درگاه',
                                    message: 'افزودن با موفقیت انجام شد',
                                })
                                this.modals.gateway.visibility = false
                                this.getAll()
                            })
                            .catch(error => {
                                this.$toast.error({
                                    title: 'افزودن درگاه',
                                    message: 'افزودن با شکست مواجه شد',
                                })
                            })
                            .finally(() => {
                                this.modals.gateway.loading = false
                            })
                        break

                    case 'EDIT':
                        updateGateway(this.modals.gateway.id, this.modals.gateway.fields.name, this.modals.gateway.fields.is_active, this.modals.gateway.fields.is_deposit, this.modals.gateway.fields.is_withdrawal, JSON.stringify(this.modals.gateway.fields.key1Deposit), JSON.stringify(this.modals.gateway.fields.key2Deposit), JSON.stringify(this.modals.gateway.fields.key1Withdrawal), JSON.stringify(this.modals.gateway.fields.key2Withdrawal), this.modals.gateway.fields.image)
                            .then(response => {
                                this.$toast.success({
                                    title: 'ویرایش درگاه',
                                    message: 'بروزرسانی با موفقیت انجام شد',
                                })
                                this.modals.gateway.visibility = false
                                this.getAll()
                            })
                            .catch(error => {
                                this.$toast.error({
                                    title: 'ویرایش درگاه',
                                    message: 'بروزرسانی با شکست مواجه شد',
                                })
                            })
                            .finally(() => {
                                this.modals.gateway.loading = false
                            })
                        break
                }
            },

            // </editor-fold>
        },

        mounted () {
            this.getAll()
        }
    }
</script>
