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
                    <div class="col-sm-6">
                        <rs-input placeholder="کد ملی"
                                  maxlength="10"
                                  name="nationalCode"
                                  :error="getInputError('nationalCode')"
                                  v-model="fields.nationalCode"
                                  :rules="fields.rules.nationalCode"/>
                    </div>
                    <div class="col-sm-6">
                        <rs-input placeholder="شماره شناسنامه"
                                  maxlength="10"
                                  name="idNumber"
                                  :error="getInputError('idNumber')"
                                  v-model="fields.idNumber"
                                  :rules="fields.rules.idNumber"/>
                    </div>
                    <div class="col-sm-4">
                        <rs-input placeholder="نام"
                                  name="name"
                                  :error="getInputError('name')"
                                  v-model="fields.name"
                                  :rules="fields.rules.name"/>
                    </div>
                    <div class="col-sm-4">
                        <rs-input placeholder="نام خانوادگی"
                                  name="surname"
                                  :error="getInputError('surname')"
                                  v-model="fields.surname"
                                  :rules="fields.rules.surname"/>
                    </div>
                    <div class="col-sm-4">
                        <rs-input placeholder="نام پدر"
                                  name="fatherName"
                                  :error="getInputError('fatherName')"
                                  v-model="fields.fatherName"
                                  :rules="fields.rules.fatherName"/>
                    </div>
                    <div class="col-sm-6">
                        <rs-input placeholder="شماره موبایل"
                                  maxlength="11"
                                  name="mobileNumber"
                                  :error="getInputError('mobileNumber')"
                                  v-model="fields.mobileNumber"
                                  :rules="fields.rules.mobileNumber"/>
                    </div>
                    <div class="col-sm-6">
                        <rs-input placeholder="شماره ثابت"
                                  maxlength="11"
                                  name="phoneNumber"
                                  :error="getInputError('phoneNumber')"
                                  v-model="fields.phoneNumber"
                                  :rules="fields.rules.phoneNumber"/>
                    </div>
                    <div class="col-sm-6">
                        <rs-input type="email"
                                  placeholder="ایمیل"
                                  name="email"
                                  :error="getInputError('email')"
                                  v-model="fields.email"
                                  :rules="fields.rules.email"/>
                    </div>
                    <div class="col-sm-6">
                        <rs-input type="birthDate"
                                  maxlength="10"
                                  placeholder="تاریخ تولد"
                                  id="birth-date-input"
                                  name="birthDate"
                                  :error="getInputError('birthDate')"
                                  v-model="fields.birthDate"
                                  :rules="fields.rules.birthDate"/>

                        <date-picker locale="fa"
                                     format="jYYYY/jMM/jDD"
                                     input-format="jYYYY/jMM/jDD"
                                     element="birth-date-input"
                                     v-model="fields.birthDate"/>
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
    import {create} from '../../../api'

    export default {
        name: 'Create',

        metaInfo: {
            title: 'افزودن کاربر'
        },

        breadcrumb: () => ([
            { label: 'پیشخوان', to: '/', icon: 'home4' },
            { label: 'کاربران', to: '/users', icon: 'users4' },
            { label: 'افزودن کاربر', to: '/users/create', icon: 'user-plus' },
        ]),

        data: () => ({
            // Loader creating button status
            creating: false,

            // Server error message after submit data
            signInError: {},

            // Form errors that back from "rs-form"-component
            formErrors: {},

            // Fields of page
            fields: {
                nationalCode: '',
                idNumber: '',
                name: '',
                surname: '',
                fatherName: '',
                mobileNumber: '',
                phoneNumber: '',
                email: '',
                birthDate: '',

                // Rules of inputs of page
                rules: {
                    nationalCode: 'string:digits|size:10',
                    idNumber: 'string:digits|max:10',
                    name: 'required|string',
                    surname: 'required|string',
                    fatherName: 'string',
                    mobileNumber: 'string:digits|max:15',
                    phoneNumber: 'string:digits|max:15',
                    email: 'required|email',
                    birthDate: 'min:8|max:10',
                }
            },
        }),

        methods: {
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
                create(this.fields.nationalCode, this.fields.idNumber, this.fields.name, this.fields.surname, this.fields.fatherName, this.fields.mobileNumber, this.fields.phoneNumber, this.fields.email, this.fields.birthDate)
                // If api is successful
                    .then(response => {
                        // Show toast successful
                        this.$toast.success({
                            title: 'افزودن کاربر',
                            message: 'کاربر جدید با موفقیت ثبت شد.',
                        });

                        // Goto users-list page
                        this.$router.push({name: 'usersList'})
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
        }
    }
</script>
