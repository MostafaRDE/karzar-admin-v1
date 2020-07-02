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
                                <img :src="`${env.VUE_APP_API_URL}uploads?id=${item.image_media_id}&thumb=128`"
                                     alt=""
                                     style="height: 50px"/>
                            </td>
                            <td>{{ item.title.fa }}</td>
                            <td>{{ item.text.fa }}</td>
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
                                               @click.native="deleteItem(item.id, index)"/>
                                <rs-loading v-if="deletingIndex === index" icon="spinner4"/>
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

                    <div class="row">
                        <div class="col-sm-12">
                            <div class="d-flex">
                                <div class="flex-grow-1">
                                    <label>عکس شاخص</label>
                                    <rs-input type="file"
                                              placeholder="عکس نقشه"
                                              name="image"
                                              :error="getInputError('image')"
                                              @change.native="changeImage"/>
                                </div>
                                <div class="ml-2 d-flex align-items-center" style="width: 70px">
                                    <img ref="mapImage"
                                         :src="modals.tutorial.imageURL || modals.tutorial.defaultImage"
                                         alt="" class="w-100"/>
                                </div>
                            </div>

                            {{ /* Start titles */ }}
                            <div class="col-sm-12 mt-3">
                                <rs-input placeholder="عنوان (en)"
                                          v-model="modals.tutorial.fields.title.en"/>
                            </div>
                            <div class="col-sm-12">
                                <rs-input placeholder="عنوان (fa)"
                                          v-model="modals.tutorial.fields.title.fa"/>
                            </div>
                            {{ /* End titles */ }}

                            {{ /* Start descriptions */ }}
                            <div class="col-sm-12">
                                <rs-input textarea placeholder="توضیحات (en)"
                                          v-model="modals.tutorial.fields.text.en"/>
                            </div>
                            <div class="col-sm-12">
                                <rs-input textarea placeholder="توضیحات (fa)"
                                          v-model="modals.tutorial.fields.text.fa"/>
                            </div>
                            {{ /* End descriptions */ }}

                            <div class="col-sm-12">
                                <rs-input placeholder="لینک یوتیوب"
                                          v-model="modals.tutorial.fields.youtube_link"/>
                            </div>

                        </div>
                    </div>

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
        deleteTutorial,
        itemsPerPage, storeTutorial,
        tutorials, updateTutorial,
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
            env: process.env,

            currentPage: 1,
            itemsPerPage,
            loading: false,
            deletingIndex: -1,

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
                        title: { fa: '', en: '' },
                        text: { fa: '', en: '' },
                        youtube_link: '',
                    }
                },
            }
        }),

        methods: {
            getAll () {
                this.loading = true

                tutorials()
                    .then(response => {
                        this.list = response.data.result
                        let totalPages = response.data.total / this.itemsPerPage
                        this.totalPages = (totalPages % 1 !== 0) ? Math.floor(totalPages) + 1 : totalPages
                    })
                    .catch(error => {
                        this.$toast.error({
                            title: 'خطا',
                            message: 'خطا در بارگیری آموزش ها',
                        })
                    })
                    .finally(() => {
                        this.loading = false
                    })
            },

            updateListByPagination () {
                this.getAll()
            },

            changeImage (e) {
                this.modals.tutorial.fields.image = e.target.files[0]
                this.modals.tutorial.imageURL = URL.createObjectURL(e.target.files[0])
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
                this.modals.tutorial.fields.title = { fa: '', en: '' }
                this.modals.tutorial.fields.text = { fa: '', en: '' }
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
                this.modals.tutorial.fields.title = this.list[index].title
                this.modals.tutorial.fields.text = this.list[index].text
                this.modals.tutorial.fields.youtube_link = this.list[index].youtube_link

                this.modals.tutorial.id = id
                this.modals.tutorial.index = index
                this.modals.tutorial.visibility = true
            },

            store () {
                this.modals.tutorial.loading = true

                if (this.modals.tutorial.type === 'ADD') {
                    storeTutorial(
                        JSON.stringify(this.modals.tutorial.fields.title),
                        JSON.stringify(this.modals.tutorial.fields.text),
                        this.modals.tutorial.fields.youtube_link,
                        this.modals.tutorial.fields.image
                    )
                        .then(response => {
                            this.$toast.success({
                                title: 'افزودن آموزش',
                                message: 'آموزش با موفقیت اضافه شد',
                            })
                            this.modals.tutorial.visibility = false
                            this.getAll()
                        })
                        .catch(error => {
                            this.$toast.error({
                                title: 'افزودن آموزش',
                                message: error.response.data.msg,
                            })
                        })
                        .finally(() => {
                            this.modals.tutorial.loading = false
                        })
                } else {
                    updateTutorial(
                        this.modals.tutorial.id,
                        JSON.stringify(this.modals.tutorial.fields.title),
                        JSON.stringify(this.modals.tutorial.fields.text),
                        this.modals.tutorial.fields.youtube_link,
                        this.modals.tutorial.fields.image
                    )
                        .then(response => {
                            this.$toast.success({
                                title: 'ویرایش آموزش',
                                message: 'آموزش با موفقیت بروزرسانی شد',
                            })
                            this.modals.tutorial.visibility = false
                            this.getAll()
                        })
                        .catch(error => {
                            this.$toast.error({
                                title: 'ویرایش آموزش',
                                message: error.response.data.msg,
                            })
                        })
                        .finally(() => {
                            this.modals.tutorial.loading = false
                        })
                }
            },

            // </editor-fold>

            deleteItem (id, index) {
                this.deletingIndex = index

                deleteTutorial(id)
                    .then(response => {
                        this.$toast.success({
                            title: 'حذف آموزش',
                            message: 'آموزش با موفقیت حذف شد',
                        })
                        this.getAll()
                    })
                    .catch(error => {
                        this.$toast.error({
                            title: 'حذف آموزش',
                            message: 'حذف آموزش با شکست مواجه شد',
                        })
                    })
                    .finally(() => {
                        this.deletingIndex = -1
                    })
            },
        },

        mounted () {
            this.getAll()
        }
    }
</script>
