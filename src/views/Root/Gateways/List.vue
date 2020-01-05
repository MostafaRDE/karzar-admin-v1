<template>
    <div>
        <div>
            <div class="card">
                <div class="card-header header-elements-inline">
                    <h5 class="card-title">درگاه ها</h5>
                    <rs-button @click.native="showAddModal">افزودن درگاه</rs-button>
                </div>

                <rs-table v-if="!loading">
                    <template slot="head">
                        <th>ردیف</th>
                        <th>نام</th>
                        <th>کلید 1</th>
                        <th>کلید 2</th>
                        <th>تصویر</th>
                        <th></th>
                    </template>

                    <template slot="body">
                        <tr v-for="(item, index) of list">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.name }}</td>
                            <td>{{ item.key_1.af }}</td>
                            <td>{{ item.key_2.af }}</td>
                            <td>
                                <img :src="`http://localhost:8080/api/v1/uploads?id=${item.image.id}`" alt=""
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

                    <div class="col-sm-12">
                        <rs-input placeholder="کلید 1 (en)"
                                  v-model="modals.gateway.fields.key1.en"/>
                    </div>
                    <div class="col-sm-12">
                        <rs-input placeholder="کلید 1 (af)"
                                  v-model="modals.gateway.fields.key1.af"/>
                    </div>

                    <div class="col-sm-12">
                        <rs-input placeholder="کلید 2 (en)"
                                  v-model="modals.gateway.fields.key2.en"/>
                    </div>
                    <div class="col-sm-12">
                        <rs-input placeholder="کلید 12 (af)"
                                  v-model="modals.gateway.fields.key2.af"/>
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
            title: 'درگاه ها'
        },

        breadcrumb: () => ([
            { label: 'پیشخوان', to: '/', icon: 'home4' },
            { label: 'درگاه ها', to: '/gateways', icon: 'wallet' },
        ]),

        data: () => ({
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
                    defaultImage: require('./../../../../public/images/samples/img-world-map.jpg'),

                    fields: {
                        image: null,
                        name: '',
                        key1: {
                            af: '',
                            en: '',
                        },
                        key2: {
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
                this.modals.gateway.fields.key1.af = ''
                this.modals.gateway.fields.key1.en = ''
                this.modals.gateway.fields.key2.af = ''
                this.modals.gateway.fields.key2.en = ''

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
                    this.modals.gateway.imageURL = `http://localhost:8080/api/v1/uploads?id=${this.list[index].image.id}`
                }
                this.modals.gateway.fields.image = null
                this.modals.gateway.fields.name = this.list[index].name
                this.modals.gateway.fields.key1.af = this.list[index].key_1.af || ''
                this.modals.gateway.fields.key1.en = this.list[index].key_1.en || ''
                this.modals.gateway.fields.key2.af = this.list[index].key_2.af || ''
                this.modals.gateway.fields.key2.en = this.list[index].key_2.en || ''

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
                        storeGateway(this.modals.gateway.fields.name, JSON.stringify(this.modals.gateway.fields.key1), JSON.stringify(this.modals.gateway.fields.key2), this.modals.gateway.fields.image)
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
                        updateGateway(this.modals.gateway.id, this.modals.gateway.fields.name, JSON.stringify(this.modals.gateway.fields.key1), JSON.stringify(this.modals.gateway.fields.key2), this.modals.gateway.fields.image)
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
