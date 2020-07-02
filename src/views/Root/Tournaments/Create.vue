<template>
    <rs-form :submit="submitForm" @errors="setFormErrors($event)">
        <rs-alert v-if="!objectIsEmpty(signInError)" color="danger" hasArrow right type="bg">
            {{ signInError.message }}
        </rs-alert>

        <div class="card">
            <div class="card-header header-elements-inline">
                <h5 class="card-title">اطلاعات پایه</h5>
            </div>

            <div class="card-body">
                <div class="row">
                    {{ /* Start titles */ }}
                    <div class="col-sm-12">
                        <rs-input placeholder="عنوان (en)"
                                  name="titleEN"
                                  :error="getInputError('titleEN')"
                                  :rules="fields.rules.title.en"
                                  v-model="fields.title.en"/>
                    </div>
                    <div class="col-sm-12">
                        <rs-input placeholder="عنوان (fa)"
                                  name="titleFA"
                                  :error="getInputError('titleFA')"
                                  :rules="fields.rules.title.fa"
                                  v-model="fields.title.fa"/>
                    </div>
                    {{ /* End titles */ }}

                    {{ /* Start descriptions */ }}
                    <div class="col-sm-12">
                        <rs-input placeholder="توضیحات (en)"
                                  textarea
                                  name="descriptionEn"
                                  :error="getInputError('descriptionEn')"
                                  v-model="fields.description.en"/>
                    </div>
                    <div class="col-sm-12">
                        <rs-input placeholder="توضیحات (fa)"
                                  textarea
                                  name="descriptionFA"
                                  :error="getInputError('descriptionFA')"
                                  v-model="fields.description.fa"/>
                    </div>
                    {{ /* End descriptions */ }}

                    <div class="col-sm-6">
                        <rs-input type="number"
                                  placeholder="ظرفیت هر تیم"
                                  name="teamCapacity"
                                  :error="getInputError('teamCapacity')"
                                  v-model="fields.teamCapacity"
                                  :rules="fields.rules.teamCapacity"/>
                    </div>
                    <div class="col-sm-6">
                        <rs-input type="number"
                                  placeholder="ظرفیت کل"
                                  name="capacity"
                                  :error="getInputError('capacity')"
                                  v-model="fields.capacity"
                                  :rules="fields.rules.capacity"/>
                    </div>
                    <div class="col-sm-6">
                        <rs-input placeholder="جایزه"
                                  name="reward"
                                  :error="getInputError('reward')"
                                  v-model="fields.reward"
                                  :rules="fields.rules.reward"/>
                    </div>
                    <div class="col-sm-6">
                        <rs-input type="number"
                                  placeholder="فی"
                                  name="fee"
                                  :error="getInputError('fee')"
                                  v-model="fields.fee"
                                  :rules="fields.rules.fee"/>
                    </div>
                    <div class="col-sm-6">
                        <rs-input placeholder="تاریخ شروع"
                                  id="date-input"
                                  name="startDate"
                                  :error="getInputError('startDate')"
                                  :value="fields.startDate | moment('jYYYY/jMM/jDD HH:mm:ss')"
                                  :rules="fields.rules.startDate"/>

                        <date-picker locale="fa"
                                     format="YYYY-MM-DD HH:mm:ss"
                                     type="datetime"
                                     element="date-input"
                                     v-model="fields.startDate"/>
                    </div>
                    <div class="col-sm-6">
                        <rs-drop-down :source="maps"
                                      name="mapId"
                                      :rules="fields.rules.mapId"
                                      :error="getInputError('mapId')"
                                      v-model="fields.mapId"/>
                    </div>

                    <div class="col-12">
                        <rs-button type="submit" :loading="creating">ثبت</rs-button>
                    </div>
                </div>
            </div>
        </div>

    </rs-form>
</template>

<script>
    import { createTournament, maps } from '../../../api'

    export default {
        name: 'Create',

        metaInfo: {
            title: 'افزودن تورنومنت'
        },

        breadcrumb: () => ([
            { label: 'پیشخوان', to: '/', icon: 'home4' },
            { label: 'تورنومنت ها', to: '/users', icon: 'medal-star' },
            { label: 'افزودن تورنومنت', to: '/users/create', icon: 'medal-star' },
        ]),

        data: () => ({
            // Loader creating button status
            creating: false,

            // Server error message after submit data
            signInError: {},

            // Form errors that back from "rs-form"-component
            formErrors: {},

            maps: [],
            mapsLoading: false,

            // Fields of page
            fields: {
                title: {
                    en: '',
                    fa: '',
                },
                description: {
                    en: '',
                    fa: '',
                },
                capacity: '',
                teamCapacity: '',
                reward: '',
                fee: '',
                startDate: '',
                youtubeLink: '',
                mapId: 0,

                // Rules of inputs of page
                rules: {
                    title: {
                        en: 'required|string',
                        fa: 'required|string',
                    },
                    capacity: 'required|string:digits|min:1',
                    teamCapacity: 'required|string:digits|min:1',
                    reward: 'required|string',
                    fee: 'required|string:digits|min:0',
                    startDate: 'required',
                    youtubeLink: 'required',
                    mapId: 'required|min:1',
                }
            },
        }),

        methods: {
            getMaps() {
                this.mapsLoading = true;

                maps()
                    .then(response => {
                        this.maps.push({
                            key: 0,
                            value: 'Select map',
                        })
                        response.data.result.forEach(map => {
                             this.maps.push({
                                key: map.id,
                                value: map.name,
                            })
                        })
                    })
                    .catch(error => {

                    })
                    .finally(() => {
                        this.mapsLoading = false;
                    })
            },

            // Get errors from "rs-form"-component and set in "formErrors"-data-variable
            setFormErrors (errors) {
                this.formErrors = errors
            },

            // Customizing error-message for show in view (below inputs)
            getInputError (key) {
                return (this.formErrors.hasOwnProperty(key)) ? this.formErrors[key][0] : ''
            },

            // Submit form after form validation (If is successful)
            submitForm () {
                // Clear form errors
                this.setFormErrors({});
                // Remove message server error
                this.signInError = {};
                // Set "true" flag's loading in submit button & show it
                this.creating = true;

                // Call "login" api method
                createTournament(this.fields.title, this.fields.description, this.fields.capacity, this.fields.startDate, this.fields.reward, this.fields.fee, 0, this.fields.youtubeLink, this.fields.teamCapacity, this.fields.mapId)
                // If api is successful
                    .then(response => {
                        // Show toast successful
                        this.$toast.success({
                            title: 'افزودن کاربر',
                            message: 'کاربر جدید با موفقیت ثبت شد.',
                        });

                        // Goto users-list page
                        this.$router.push({name: 'tournamentsList'})
                    })
                    // Else if api is failed
                    .catch(error => {
                        // Show message server error
                        this.signInError = {
                            code: error.response.status,
                            message: error.response.data.msg,
                        };

                        // Show toast failed
                        this.$toast.error({
                            title: 'افزودن کاربر',
                            message: 'ثبت کاربر با شکست مواجه شد.',
                        })
                    })
                    // Default actions after api execute
                    .finally(() => {
                        // Set "false" flag's loading in submit button & hide it
                        this.creating = false
                    })
            }
        },

        mounted () {
            this.getMaps()
        }
    }
</script>
