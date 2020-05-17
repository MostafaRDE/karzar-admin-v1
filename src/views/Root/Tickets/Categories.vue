<template>
    <div>
        <!-- Basic card -->
        <div class="card">
            <rs-form :submit="updateCategory">
                <rs-modal v-model="modals.edit.visibility" title="ویرایش
                 دسته بندی">
                    <rs-input placeholder="نام"
                              v-model="modals.edit.fields.name"/>

                    <rs-input type="number"
                              placeholder="کد دسته"
                              step="1"
                              v-model="modals.edit.fields.parentId"/>

                    <rs-textarea
                            placeholder="توضیحات"
                            v-model="modals.edit.fields.description"/>

                    <template slot="footer">
                        <rs-button type="button" color="link" @click="modals.edit.visibility = false">بستن
                        </rs-button>
                        <rs-button type="submit" bg="primary" :loading="modals.edit.loading">حذف</rs-button>
                    </template>
                </rs-modal>
            </rs-form>

            <rs-modal v-model="modals.delete.visibility" title="حذف دسته بندی">
                <span>آیا می خواهید دسته بندی انتخاب شده را حذف نمایید؟</span>

                <template slot="footer">
                    <rs-button type="button" color="link" @click>بستن
                    </rs-button>
                    <rs-button type="submit" bg="primary" :loading="modals.delete.loading" @click.native="deleteCategory">حذف</rs-button>
                </template>
            </rs-modal>

            <div class="card-body">
                <rs-form :submit="saveCategory">
                    <rs-input placeholder="نام"
                              v-model="fields.name"/>

                    <rs-input type="number"
                              placeholder="کد دسته"
                              step="1"
                              v-model="fields.parentId"/>

                    <rs-textarea
                              placeholder="توضیحات"
                              v-model="fields.description"/>

                    <rs-button type="submit" color="primary" :loading="saving">ثبت</rs-button>
                </rs-form>
            </div>

            <hr/>

            <div class="card-body">
                <div class="d-flex align-items-center mb-4">
                    <h3 class="mb-0 mr-5">دسته بندی تیکت ها</h3>
                </div>

                <div v-if="loading" class="d-flex">
                    <rs-loading icon="spinner4"/>
                </div>

                <div v-if="!loading && !items.length" class="d-flex">
                    <span>چیزی یافت نشد</span>
                </div>

                <div v-if="!loading && items.length">
                    <rs-tree :items="items">
                        <ticket-category-tree-item v-for="(item, index) of items"
                                                   :key="`rs-tree-item-${index}`"
                                                   class="mb-2"
                                                   :item="item"
                                                   :actionUpdate="showUpdateCategoryModal"
                                                   :actionDelete="showDeleteCategoryModal"/>
                    </rs-tree>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { ticketCategories, ticketAddCategory, ticketUpdateCategory, ticketDeleteCategory } from '../../../api'

    export default {
        name: 'Categories',

        metaInfo: {
            title: 'دسته بندی تیکت ها'
        },

        breadcrumb: () => ([
            { label: 'پیشخوان', to: '/', icon: 'home4' },
            { label: 'تیکت ها', to: { name: 'ticketsList' }, icon: 'bubbles3' },
            { label: 'دسته بندی ها', to: { name: 'ticketsCategories' }, icon: 'tree7' },
        ]),

        data: () => ({
            loading: false,

            saving: false,
            fields: {
                name: '',
                parentId: '',
                description: '',
            },

            items: [],

            modals: {
                edit: {
                    visibility: false,
                    loading: false,
                    index: -1,

                    fields: {
                        name: '',
                        parentId: '',
                        description: '',
                    },
                },
                delete: {
                    visibility: false,
                    loading: false,
                    id: -1,
                },
            }
        }),

        methods: {
            getItems () {
                if (!this.loading) {
                    this.loading = true

                    ticketCategories()
                        .then(response => {
                            this.items = this.sortingCategoriesMode(response.data.result)
                        })
                        .catch(error => {})
                        .finally(() => {
                            this.loading = false
                        })
                }
            },

            saveCategory () {
                if (!this.saving) {
                    this.saving = true

                    ticketAddCategory(this.fields.name, this.fields.parentId, this.fields.description)
                        .then(response => {
                            this.$toast.success({
                                title: 'افزودن دسته بندی',
                                message: 'با موفقیت انجام شد',
                            })
                            this.fields.name = ''
                            this.fields.parentId = ''
                            this.fields.description = ''
                            this.getItems()
                        })
                        .catch(error => {
                            this.$toast.success({
                                title: 'افزودن دسته بندی',
                                message: error.response.data.msg,
                            })
                        })
                        .finally(() => {
                            this.saving = false
                        })
                }
            },

            showUpdateCategoryModal (item) {
                this.modals.edit.id = item.id

                this.modals.edit.fields.name = item.name
                this.modals.edit.fields.description = item.des
                this.modals.edit.fields.status = item.status

                this.modals.edit.visibility = true
            },
            updateCategory () {
                if (!this.modals.edit.loading) {
                    this.modals.edit.loading = true
                    ticketUpdateCategory(this.modals.edit.id, this.modals.edit.fields.name, this.modals.edit.fields.status, this.modals.edit.fields.description)
                        .then(response => {
                            this.modals.edit.visibility = false
                            this.$toast.success({
                                title: 'ویرایش دسته بندی',
                                message: 'با موفقیت انجام شد',
                            })

                            this.modals.edit.id = -1
                            this.modals.edit.fields.name = ''
                            this.modals.edit.fields.description = ''
                            this.modals.edit.fields.status = true
                        })
                        .catch(error => {
                            this.$toast.error({
                                title: 'ویرایش دسته بندی',
                                message: error.response.data.msg,
                            })
                        })
                        .finally(() => {
                            this.modals.edit.loading = false
                        })
                }
            },

            showDeleteCategoryModal (id) {
                this.modals.delete.id = id
                this.modals.delete.visibility = true
            },
            deleteCategory () {
                if (!this.modals.delete.loading) {
                    this.modals.delete.loading = true
                    ticketDeleteCategory(this.modals.delete.id)
                        .then(response => {
                            this.modals.delete.visibility = false
                            this.$toast.success({
                                title: 'حذف دسته بندی',
                                message: 'با موفقیت انجام شد',
                            })
                        })
                        .catch(error => {
                            this.$toast.error({
                                title: 'حذف دسته بندی',
                                message: error.response.data.msg,
                            })
                        })
                        .finally(() => {
                            this.modals.delete.loading = false
                        })
                }
            },
        },

        mounted () {
            this.getItems()
        }
    }
</script>
