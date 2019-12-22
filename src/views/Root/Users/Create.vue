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
                    <div class="col-sm-12">
                        <rs-input placeholder="نام"
                                  name="name"
                                  :error="getInputError('name')"
                                  v-model="fields.name"
                                  :rules="fields.rules.name"/>
                    </div>
                    <div class="col-sm-6">
                        <rs-input placeholder="ایمیل"
                                  type="email"
                                  name="email"
                                  :error="getInputError('email')"
                                  v-model="fields.email"
                                  :rules="fields.rules.email"/>
                    </div>
                    <div class="col-sm-6">
                        <rs-input placeholder="شماره واتس اپ"
                                  type="tel"
                                  maxlength="15"
                                  name="whatsappNumber"
                                  :error="getInputError('whatsappNumber')"
                                  v-model="fields.whatsappNumber"
                                  :rules="fields.rules.whatsappNumber"/>
                    </div>
                    <div class="col-sm-6">
                        <rs-input placeholder="گذرواژه"
                                  type="password"
                                  name="password"
                                  :error="getInputError('password')"
                                  v-model="fields.password"
                                  :rules="fields.rules.password"/>
                    </div>
                    <div class="col-sm-6">
                        <rs-input placeholder="گذرواژه"
                                  type="password"
                                  name="retype-password"
                                  :error="getInputError('retype-password')"
                                  v-model="fields.retypePassword"
                                  :rules="fields.rules.retypePassword"/>
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
                name: '',
                email: '',
                whatsappNumber: '',
                password: '',
                retypePassword: '',

                // Rules of inputs of page
                rules: {
                    name: 'required|string',
                    email: 'required|email',
                    whatsappNumber: 'string:digits|max:15',
                    password: 'required|password',
                    retypePassword: 'required|confirm_password',
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
                create(this.fields.name, this.fields.whatsappNumber, this.fields.email, this.fields.password)
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
