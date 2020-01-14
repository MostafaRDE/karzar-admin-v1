<template>
    <div>
        <div>
            <div class="card">
                <div class="card-header header-elements-inline">
                    <h5 class="card-title">نقشه ها</h5>
                    <rs-button @click.native="showMapAddModal">افزودن نقشه</rs-button>
                </div>

                <rs-table v-if="!loading">
                    <template slot="head">
                        <th>ردیف</th>
                        <th>نام</th>
                        <th>تصویر</th>
                        <th></th>
                    </template>

                    <template slot="body">
                        <tr v-for="(map, index) of maps">
                            <td>{{ index + 1 }}</td>
                            <td>{{ map.name.en }}</td>
                            <td>
                                <img :src="`${process.env.VUE_APP_API_URL}uploads?id=${map.image.id}&thumb=128`" alt=""
                                     style="height: 50px"/>
                            </td>
                            <td>
                                <rs-badge-icon class="cursor-pointer mr-2"
                                               bg="teal-600"
                                               icon="pencil6"
                                               rounded
                                               @click.native="showMapUpdateModal(map.id, index)"/>
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
            <rs-form :submit="storeMap" @errors="setFormErrors">
                <rs-modal :dialogStyle="{minWidth: '600px'}"
                          :title="`${modals.map.type === 'ADD' ? 'افزودن' : 'ویرایش'} نقشه`"
                          v-model="modals.map.visibility">

                    <div class="d-flex">
                        <div class="flex-grow-1">
                            <label>عکس نقشه</label>
                            <rs-input type="file"
                                      placeholder="عکس نقشه"
                                      name="mapImage"
                                      :error="getInputError('mapImage')"
                                      @change.native="changeMapImage"/>
                        </div>
                        <div class="ml-2 d-flex align-items-center" style="width: 70px">
                            <img ref="mapImage"
                                 :src="modals.map.mapImageURL || modals.map.mapDefaultImage"
                                 alt="" class="w-100"/>
                        </div>
                    </div>

                    {{ /* Start names */ }}
                    <div class="col-sm-12">
                        <rs-input placeholder="عنوان (en)"
                                  v-model="modals.map.fields.name.en"/>
                    </div>
                    <div class="col-sm-12">
                        <rs-input placeholder="عنوان (af)"
                                  v-model="modals.map.fields.name.af"/>
                    </div>
                    {{ /* End names */ }}

                    <template slot="footer">
                        <rs-button type="button" color="link" @click.native="modals.map.visibility = false">بستن
                        </rs-button>
                        <rs-button type="submit" bg="primary" :loading="modals.map.loading">{{ modals.map.type === 'ADD'
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
        maps,
        addMap,
        updateMap
    } from '../../../../api'

    export default {
        name: 'List',

        metaInfo: {
            title: 'تورنومنت - نقشه ها'
        },

        breadcrumb: () => ([
            { label: 'پیشخوان', to: '/', icon: 'home4' },
            { label: 'تورنومنت ها', to: '/tournaments', icon: 'medal-star' },
            { label: 'نقشه ها', to: '/tournaments/maps', icon: 'map5' },
        ]),

        data: () => ({
            currentPage: 1,
            itemsPerPage,
            loading: false,

            maps: [],
            totalPages: 0,

            modals: {
                map: {
                    type: 'ADD', // {'ADD' | 'EDIT'}

                    visibility: false,
                    loading: false,
                    formErrors: {},

                    mapId: -1,
                    index: -1,

                    mapImageURL: null,
                    mapDefaultImage: require('./../../../../../public/images/samples/img-world-map.jpg'),

                    fields: {
                        image: null,
                        name: {
                            af: '',
                            en: '',
                        }
                    }
                },
            }
        }),

        methods: {
            getMaps () {
                this.loading = true

                maps()
                    .then(response => {
                        this.maps = response.data.result
                        let totalPages = response.data.total / this.itemsPerPage
                        this.totalPages = (totalPages % 1 !== 0) ? Math.floor(totalPages) + 1 : totalPages
                    })
                    .catch(error => {
                        this.$toast.error({
                            title: 'خطا',
                            message: 'خطا در بارگیری نقشه ها',
                        })
                    })
                    .finally(() => {
                        this.loading = false
                    })
            },

            updateListByPagination () {
                this.getMaps()
            },

            // <editor-fold desc="Map">

            showMapAddModal () {
                this.modals.map.type = 'ADD'

                this.modals.map.loading = false
                this.modals.map.formErrors = {}
                this.modals.map.mapImageURL = null

                this.modals.map.fields.image = null
                this.modals.map.fields.name.af = ''
                this.modals.map.fields.name.en = ''

                this.modals.map.mapId = -1
                this.modals.map.index = -1
                this.modals.map.visibility = true
            },

            showMapUpdateModal (mapId, index) {
                this.modals.map.type = 'EDIT'

                this.modals.map.loading = false
                this.modals.map.formErrors = {}
                this.modals.map.fields.image = null

                if (this.maps[index].image !== null) {
                    this.modals.map.mapImageURL = `${process.env.VUE_APP_API_URL}uploads?id=${this.maps[index].image.id}`
                }
                this.modals.map.fields.name.af = this.maps[index].name.af
                this.modals.map.fields.name.en = this.maps[index].name.en

                this.modals.map.mapId = mapId
                this.modals.map.index = index
                this.modals.map.visibility = true
            },

            changeMapImage (e) {
                this.modals.map.fields.image = e.target.files[0]
                this.modals.map.mapImageURL = URL.createObjectURL(e.target.files[0])
            },

            // Get errors from "rs-form"-component and set in "formErrors"-data-variable
            setFormErrors (errors) {
                this.modals.map.formErrors = errors
            },

            // Customizing error-message for show in view (below inputs)
            getInputError (key) {
                return (this.modals.map.formErrors.hasOwnProperty(key)) ? this.modals.map.formErrors[key][0] : ''
            },

            storeMap () {
                this.modals.map.loading = true

                switch (this.modals.map.type) {
                    case 'ADD':
                        addMap(JSON.stringify(this.modals.map.fields.name), this.modals.map.fields.image)
                            .then(response => {
                                this.$toast.success({
                                    title: 'افزودن نقشه',
                                    message: 'افزودن با موفقیت انجام شد',
                                })
                                this.getMaps()
                            })
                            .catch(error => {
                                this.$toast.error({
                                    title: 'افزودن نقشه',
                                    message: 'افزودن با شکست مواجه شد',
                                })
                            })
                            .finally(() => {
                                this.modals.map.loading = false
                            })
                        break

                    case 'EDIT':
                        updateMap(this.modals.map.mapId, JSON.stringify(this.modals.map.fields.name), this.modals.map.fields.image)
                            .then(response => {
                                this.$toast.success({
                                    title: 'ویرایش نقشه',
                                    message: 'بروزرسانی با موفقیت انجام شد',
                                })
                                this.modals.map.visibility = false
                                this.getMaps()
                            })
                            .catch(error => {
                                this.$toast.error({
                                    title: 'ویرایش نقشه',
                                    message: 'بروزرسانی با شکست مواجه شد',
                                })
                            })
                            .finally(() => {
                                this.modals.map.loading = false
                            })
                        break
                }
            },

            // </editor-fold>
        },

        mounted () {
            this.getMaps()
        }
    }
</script>
