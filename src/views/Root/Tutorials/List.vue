<template>
    <div>
        <div>
            <div class="card">
                <div class="card-header header-elements-inline">
                    <h5 class="card-title">آموزش ها</h5>
                    <rs-button @click.native="showAddModal">افزودن آموزش</rs-button>
                </div>

                <rs-table v-if="!loading">
                    <template slot="head">
                        <th>ردیف</th>
                        <th>عکس</th>
                        <th>عنوان</th>
                        <th>توضیحات</th>
                        <th>لینک یوتیوب</th>
                        <th></th>
                    </template>

                    <template slot="body">
                        <tr v-for="(item, index) of list">
                            <td>{{ index + 1 }}</td>
                            <td>
                                <img :src="`${process.env.VUE_APP_API_URL}uploads?id=${map.image.id}&thumb=128`"
                                     alt=""
                                     style="height: 50px"/>
                            </td>
                            <td>{{ item.title.af }}</td>
                            <td>{{ item.text.af }}</td>
                            <td>{{ item.youtube_link }}</td>
                            <td>
                                <rs-badge-icon class="cursor-pointer ml-2 mr-2"
                                               icon="pencil6"
                                               rounded
                                               @click.native="showUpdateModal(item.id, index)"/>
                                <rs-badge-icon class="cursor-pointer ml-2 mr-2"
                                               color="danger"
                                               icon="trash"
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

            {{ /* Start amount modal */ }}
            <rs-form :submit="store" @errors="setFormErrors">
                <rs-modal :dialogStyle="{minWidth: '600px'}"
                          :title="`${modals.tutorial.type === 'ADD' ? 'افزودن' : 'ویرایش'} آموزش`"
                          v-model="modals.tutorial.visibility">


                    <template slot="footer">
                        <rs-button type="button" color="link" @click.native="modals.tutorial.visibility = false">بستن
                        </rs-button>
                        <rs-button type="submit" bg="primary" :loading="modals.tutorial.loading">
                            {{ modals.tutorial.type === 'ADD' ? 'افزودن' : 'بروزرسانی'}}
                        </rs-button>
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

    } from '../../../api'

    export default {
        name: 'List',

        metaInfo: {
            title: 'آموزش ها'
        },

        breadcrumb: () => ([
            { label: 'پیشخوان', to: '/', icon: 'home4' },
            { label: 'آموزش ها', to: '/tutorials', icon: 'book' },
        ]),

        data: () => ({
            currentPage: 1,
            itemsPerPage,
            loading: false,

            list: [],
            totalPages: 0,

            modals: {
                tutorial: {
                    type: 'ADD', // {'ADD' | 'EDIT'}

                    visibility: false,
                    loading: false,
                    formErrors: {},

                    imageURL: null,
                    defaultImage: require('./../../../../public/images/samples/img-world-map.jpg'),

                    id: -1,
                    index: -1,

                    fields: {
                        image: '',
                        title: {af: '', en: ''},
                        text: {af: '', en: ''},
                        youtube_link: '',
                    }
                },
            }
        }),

        methods: {
            getAll () {
                // this.loading = true

                // transactions()
                //     .then(response => {
                //         this.list = response.data.result
                //         let totalPages = response.data.total / this.itemsPerPage
                //         this.totalPages = (totalPages % 1 !== 0) ? Math.floor(totalPages) + 1 : totalPages
                //     })
                //     .catch(error => {
                //         this.$toast.error({
                //             title: 'خطا',
                //             message: 'خطا در بارگیری گزارشات',
                //         })
                //     })
                //     .finally(() => {
                //         this.loading = false
                //     })
            },

            updateListByPagination () {
                this.getAll()
            },

            // Get errors from "rs-form"-component and set in "formErrors"-data-variable
            setFormErrors (errors) {
                this.modals.tutorial.formErrors = errors
            },

            // Customizing error-message for show in view (below inputs)
            getInputError (key) {
                return (this.modals.tutorial.formErrors.hasOwnProperty(key)) ? this.modals.tutorial.formErrors[key][0] : ''
            },

            showAddModal () {
                this.modals.tutorial.type = 'ADD'

                this.modals.tutorial.loading = false
                this.modals.tutorial.formErrors = {}
                this.modals.tutorial.imageURL = null

                this.modals.tutorial.fields.image = null
                this.modals.tutorial.fields.title = {af:'', en: ''}
                this.modals.tutorial.fields.text = {af:'', en: ''}
                this.modals.tutorial.fields.youtube_link = ''

                this.modals.tutorial.id = -1
                this.modals.tutorial.index = -1
                this.modals.tutorial.visibility = true
            },

            // <editor-fold desc="Transaction">

            showUpdateModal (id, index) {
                this.modals.tutorial.loading = false
                this.modals.tutorial.formErrors = {}
                this.modals.tutorial.type = 'EDIT'
                this.modals.tutorial.fields.image = null

                if (this.list[index].image_media_id !== null) {
                    this.modals.tutorial.imageURL = `${process.env.VUE_APP_API_URL}uploads?id=${this.list[index].image_media_id}&thumb=128`
                }
                this.fields.title = this.list[index].title
                this.fields.text = this.list[index].text
                this.fields.youtube_link = this.list[index].youtube_link

                this.modals.tutorial.id = id
                this.modals.tutorial.index = index
                this.modals.tutorial.visibility = true
            },

            store() {

            },

            // </editor-fold>
        },

        mounted () {
            this.getAll()
        }
    }
</script>
