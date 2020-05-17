<template>
    <rs-form :submit="submitForm">
        <!-- Basic card -->
        <div class="card">
            <div class="card-header header-elements-inline">
                <h5 class="card-title">{{ ticket.subject }}
                    - <router-link :to="{name: 'userShow', params: {id: ticket.us_id}}"><rs-badge>{{ ticket.name }}</rs-badge></router-link>
                    - <router-link :to="{name: 'userShow', params: {id: ticket.us_id}}"><rs-badge>{{ ticket.fullname }}</rs-badge></router-link>
                    - <router-link :to="{name: 'userShow', params: {id: ticket.us_id}}"><rs-badge>{{ ticket.us_mobile }}</rs-badge></router-link>
                    - <router-link :to="{name: 'userShow', params: {id: ticket.us_id}}"><rs-badge :color="ticket.is_confirm ? 'success' : 'danger'">{{ ticket.is_confirm ? 'تایید شده' : 'تایید نشده' }}</rs-badge></router-link>
                </h5>
                <div class="d-flex align-items-center">
                    <div class="mr-2 d-flex align-items-center">
                        <rs-badge-icon v-if="ticket.status !== 'CLOSE'"
                                       class="cursor-pointer mr-2"
                                       bg="success"
                                       icon="checkmark3"
                                       rounded
                                       :loading="changeStatusClosing"
                                       @click.native="changeStatus('CLOSE')"/>
                        <rs-loading v-if="changeStatusClosing" icon="spinner4"/>
                    </div>
                    <div class="d-flex align-items-center">
                        <rs-badge-icon v-if="ticket.status !== 'CLOSE' && ticket.status !== 'PROCESSING'"
                                       class="cursor-pointer mr-2"
                                       color="warning"
                                       icon="cog"
                                       rounded
                                       :loading="changeStatusProcessing"
                                       @click.native="changeStatus('PROCESSING')"/>
                        <rs-loading v-if="changeStatusProcessing" icon="spinner4"/>
                    </div>
                    <div><a href="javascript:void(0)" class="ml-3" @click="$router.go(-1)"><span>بازگشت</span></a></div>
                    <div><a href="javascript:void(0)" class="ml-3" @click="getItems"><span>تازه سازی</span></a></div>
                </div>
            </div>

            <div :style="`max-height: calc(100vh - 435px); height: calc(100vh - 435px)`">
                <div class="d-flex flex-column-reverse h-100" style="overflow-y: scroll">
                    <div v-if="!items.length && loading" class="d-flex justify-content-center">
                        <rs-loading icon="spinner4"/>
                    </div>
                    <div v-if="!items.length && !loading" class="d-flex justify-content-center">
                        <span>گفتگویی وجود ندارد</span>
                    </div>
                    <div v-if="items.length && !loading"
                         v-for="(item) of items"
                         class="d-flex" :class="item.answer_mode === 'USER' ? 'page--ticket--chat--user justify-content-start' : 'page--ticket--chat--support justify-content-end'">
                        <div style="width: fit-content; max-width: 75%;">

                            <template>
                                <p v-if="item.type === 'TEXT'">{{ item.message }}</p>
                                <p v-else-if="item.type === 'IMAGE'">
                                    <a target="_blank" :href="env.VUE_APP_CDN_URL_TICKETS + item.message"><img :src="env.VUE_APP_CDN_URL_TICKETS + item.message" alt="" style="width: 250px"/></a>
                                </p>
                                <p v-else>
                                    <a :href="env.VUE_APP_CDN_URL_TICKETS + item.message">
                                        دانلود پیوست
                                    </a>
                                </p>
                            </template>

                            <div class="mt-10">
                                <span>{{ item.created_at | moment('jYYYY/jMM/jDD HH:mm:ss') }}</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <hr class="mb-0">

            <div class="card-body d-flex align-items-end">
                <rs-textarea class="flex-grow-1 mb-0" textareaStyle="min-height: 100px" placeholder="پیام..." v-model="fields.message"/>
                <label class="btn alpha-pink text-pink-800 btn-icon mb-0 ml-3">
                    <transition name="fade">
                        <span v-if="fields.file" class="bg-danger position-absolute rounded-circle right-0 top-0" style="width: 7px; height: 7px; transform: translateX(-50%) translateY(-50%)"></span>
                    </transition>
                    <i class="icon-link"></i>
                    <input type="file" class="d-none" @change="fields.file = $event.target.files[0]"/>
                </label>
                <rs-button-icon type="submit" class="ml-3" icon="arrow-left16" :loading="uploadingFile || sendingMessage"/>
            </div>
        </div>
    </rs-form>
</template>

<script>
    import {
        itemsPerPage,
        ticketChangeStatus,
        ticketMessages,
        ticketUpdateFileMessage,
        ticketUpdateTextMessage
    } from '../../../api'

    export default {
        name: 'Chat',

        metaInfo: {
            title: 'چت تیکت'
        },

        breadcrumb: () => ([
            { label: 'پیشخوان', to: '/', icon: 'home4' },
            { label: 'تیکت ها', to: { name: 'ticketsList' }, icon: 'bubbles3' },
        ]),

        components: {
            'mdi-attachment': () => import('../../../components/icons/MaterialDesignIcons/MdiAttachment.vue'),
            'mdi-send': () => import('../../../components/icons/MaterialDesignIcons/MdiSend.vue'),
        },

        data: () => ({
            env: process.env,

            change: false,
            itemsPerPage,
            currentPage: 1,
            totalPages: 0,

            changeStatusClosing: false,
            changeStatusProcessing: false,

            loading: false,
            ticket: {
                name: 'نام دسته بندی',
                subject: 'موضوع',
                status: '',
            },
            items: [],

            uploadingFile: false,
            sendingMessage: false,
            fields: {
                file: null,
                message: '',
            }
        }),

        methods: {
            getItems() {
                if (!this.loading) {
                    this.loading = true
                    ticketMessages(this.$route.params.id)
                        .then(response => {
                            let totalPages = response.data.total / this.itemsPerPage
                            this.totalPages = (totalPages % 1 !== 0) ? Math.floor(totalPages) + 1 : totalPages
                            this.ticket = response.data.ticket
                            this.items = response.data.result
                        })
                        .catch(error => {

                        })
                        .finally(() => {
                            this.loading = false
                        })
                }
            },

            changeStatus(status) {
                switch (status) {
                    case 'CLOSE':
                        if (!this.changeStatusClosing)
                            this.changeStatusClosing = true
                        else
                            return
                        break

                    case 'PROCESSING':
                        if (!this.changeStatusProcessing)
                            this.changeStatusProcessing = true
                        else
                            return
                        break
                }

                ticketChangeStatus(this.$route.params.id, status)
                    .then(response => {
                        this.$toast.success({
                            title: 'وضعیت تیکت',
                            message: 'با موفقیت بروز شد',
                        })
                        this.ticket.status = status
                    })
                    .catch(error => {
                        this.$toast.error({
                            title: 'وضعیت تیکت',
                            message: error.response.data.msg,
                        })
                    })
                    .finally(() => {
                        switch (status) {
                            case 'CLOSE':
                                this.changeStatusClosing = false
                                this.ticket.status = 'CLOSE'
                                break

                            case 'PROCESSING':
                                this.changeStatusProcessing = false
                                this.ticket.status = 'PROCESSING'
                                break
                        }
                    })
            },

            uploadFile() {
                if (!this.uploadingFile) {
                    this.uploadingFile = true

                    ticketUpdateFileMessage(this.$route.params.id, this.fields.file)
                        .then(response => {
                            this.$toast.success({
                                title: 'آپلود پیوست',
                                message: 'با موفقیت ارسال شد',
                            })
                            this.fields.file = null
                            this.getItems()
                        })
                        .catch(error => {
                            this.$toast.error({
                                title: 'آپلود پیوست',
                                message: error.response && error.response.hasOwnProperty('data') ? error.response.data.msg : 'شکست خورد',
                            })
                        })
                        .finally(() => {
                            this.uploadingFile = false
                        })
                }
            },

            sendText() {
                if (!this.sendingMessage) {
                    this.sendingMessage = true

                    ticketUpdateTextMessage(this.$route.params.id, this.fields.message)
                        .then(response => {
                            this.$toast.success({
                                title: 'ارسال پیام',
                                message: 'با موفقیت ارسال شد',
                            })

                            if (this.fields.file)
                                this.uploadFile()
                            else
                                this.items.unshift({
                                    admin_name: this.$store.state.user.name,
                                    answer_admin: null,
                                    answer_mode: "ADMIN",
                                    created_at: moment.utc().format(),
                                    id: 0,
                                    message: this.fields.message,
                                    ticket_id: this.$route.params.id,
                                    type: "TEXT",
                                })
                            this.fields.message = ''
                            this.ticket.status = 'ADMIN'
                        })
                        .catch(error => {
                            this.$toast.error({
                                title: 'ارسال پیام',
                                message: error.response.data.msg,
                            })
                        })
                        .finally(() => {
                            this.sendingMessage = false
                        })
                }
            },

            submitForm() {
                if (!this.uploadingFile && !this.sendingMessage) {
                    if (this.fields.message && this.fields.message !== '')
                        this.sendText()
                }
            },
        },

        mounted () {
            this.getItems()
        }
    }
</script>

<style lang="scss">

    .page--ticket--chat-- {
        &support, &user {
            padding: 10px;

            > div {
                padding: 15px;
                -webkit-border-radius: 20px;
                -moz-border-radius: 20px;
                border-radius: 20px;
            }
        }
    }
    .page--ticket--chat--support div {
        background: #4DC876;
        text-align: left;
        color: #fff;
        -webkit-border-bottom-left-radius: 0;
        -moz-border-radius-bottomleft: 0;
        border-bottom-left-radius: 0;
    }
    .page--ticket--chat--user div {
        background: #379BF4;
        text-align: right;
        color: #fff;
        -webkit-border-bottom-right-radius: 0;
        -moz-border-radius-bottomright: 0;
        border-bottom-right-radius: 0;
    }
</style>
