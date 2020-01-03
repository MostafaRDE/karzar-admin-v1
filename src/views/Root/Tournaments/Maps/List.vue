<template>
    <div>
        <div>
            <div class="card">
                <div class="card-header header-elements-inline">
                    <h5 class="card-title">نقشه ها</h5>
                    <rs-button @click.native="modals.addMap.visibility = true">افزودن نقشه</rs-button>

                    {{ /* Start add map */ }}
                    <rs-modal :dialogStyle="{minWidth: '600px'}"
                              title="افزودن نقشه"
                              v-model="modals.addMap.visibility">

                        <rs-form>

                            <div class="d-flex">
                                <div class="flex-grow-1">
                                    <label>عکس نقشه</label>
                                    <rs-input type="file"
                                              placeholder="عکس نقشه"
                                              name="imageProfile"
                                              :error="getInputErrorWallet('imageProfile')"
                                              @change.native="changeProfileImage"/>
                                </div>
                                <div class="ml-2" style="width: 70px">
                                    <img ref="profileImage"
                                         :src="modals.edit.profileImageURL || modals.edit.profileDefaultImage"
                                         alt="" class="w-100"/>
                                </div>
                            </div>

                            {{ /* Start names */ }}
                            <div class="col-sm-12">
                                <rs-input placeholder="عنوان (en)"
                                          name="titleEN"
                                          :error="getInputError('titleEN')"
                                          v-model="modals.addMap.fields.name.en"/>
                            </div>
                            <div class="col-sm-12">
                                <rs-input placeholder="عنوان (af)"
                                          name="titleAF"
                                          :error="getInputError('titleAF')"
                                          v-model="modals.addMap.fields.name.af"/>
                            </div>
                            {{ /* End names */ }}

                        </rs-form>

                        <template slot="footer">
                            <rs-button type="button" color="link" @click.native="modals.addMap.visibility = false">بستن
                            </rs-button>
                            <rs-button type="submit" bg="primary" :loading="modals.addMap.loading">افزودن</rs-button>
                        </template>

                    </rs-modal>
                    {{ /* End add map */ }}
                </div>

                <rs-table>
                    <template slot="head">
                        <th>ردیف</th>
                        <th>نام</th>
                        <th>تصویر</th>
                        <th></th>
                    </template>

                    <template slot="body">
                        <tr v-for="(map, index) of maps">
                            <td>{{ index + 1 }}</td>
                            <td>{{ map.name }}</td>
                            <td>
                                <img :src="`http://localhost:8080/api/v1/uploads?id=${map.image.id}`" alt="" style="height: 50px"/>
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

                <div class="card-body">
                    <rs-pagination :count="totalPages" v-model="currentPage" @change="updateListByPagination"/>
                </div>
            </div>

            {{ /* Start change wallet amount */ }}
            <rs-modal :dialogStyle="{minWidth: '600px'}"
                      title="ویرایش نقشه"
                      v-model="modals.playerUpdate.visibility">

                <template slot="footer">
                    <rs-button type="button" color="link" @click.native="modals.playerUpdate.visibility = false">بستن
                    </rs-button>
                    <rs-button type="submit" bg="primary" :loading="modals.playerUpdate.loading">ویرایش</rs-button>
                </template>

            </rs-modal>
            {{ /* End change wallet amount */ }}
        </div>
    </div>
</template>

<script>
    import {
        itemsPerPage,
        maps
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
                addMap: {
                    visibility: false,
                    loading: false,
                    formErrors: {},

                    mapImageURL: null,
                    mapDefaultImage: require('./../../../../public/images/samples/circle-profile.svg'),

                    fields: {
                        image: null,
                        name: {
                            en: '',
                            af: '',
                        }
                    }
                },
                playerUpdate: {
                    visibility: false,
                    loading: false,
                    mapId: 0,
                    index: -1,
                    formErrors: {},

                    fields: {
                        image: null,
                        name: {
                            en: '',
                            af: '',
                        }
                    }
                },
            }
        }),

        methods: {
            getMaps() {
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

            // <editor-fold desc="Map Update">

            showMapUpdateModal(mapId, index) {
                this.modals.playerUpdate.mapId = mapId
                this.modals.playerUpdate.index = index
                this.modals.playerUpdate.visibility = true
            }

            // </editor-fold>
        },

        mounted () {
            this.getMaps()
        }
    }
</script>
