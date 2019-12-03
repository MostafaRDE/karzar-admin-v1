<template>
    <!-- Page content -->
    <div class="page-content" :style="{height: '100vh'}">

        <!-- Main content -->
        <div class="content-wrapper">

            <!-- Content area -->
            <div class="content d-flex justify-content-center align-items-center">

                <!-- Login form -->
                <rs-form class="login-form" @errors="setFormErrors($event)" :submit="submit">

                    <rs-alert v-if="!objectIsEmpty(signInError)" color="danger" hasArrow right type="bg">
                        {{ signInError.message }}
                    </rs-alert>

                    <div class="card mb-0">
                        <div class="card-body">
                            <div class="text-center mb-3">
                                <i class="icon-reading icon-2x text-slate-300 border-slate-300 border-3 rounded-round p-3 mb-3 mt-1"></i>
                                <h5 class="mb-0">ورود به پنل مدیریت</h5>
                                <span class="d-block text-muted">اطلاعات کاربری خود را وارد کنید</span>
                            </div>

                            <rs-input placeholder="نام کاربری"
                                      icon="user"
                                      name="username"
                                      :error="getInputError('username')"
                                      :rules="fields.rules.username"
                                      v-model="fields.username"/>

                            <rs-input placeholder="گذرواژه"
                                      icon="lock2"
                                      name="password"
                                      :error="getInputError('password')"
                                      :rules="fields.rules.password"
                                      v-model="fields.password"/>

                            <rs-input placeholder="کد ورود دومرحله ای گوگل"
                                      icon="safe"
                                      maxlength="6"
                                      name="g2f"
                                      :error="getInputError('g2f')"
                                      :rules="fields.rules.g2f"
                                      v-model="fields.g2f"/>

                            <div class="form-group mb-0">
                                <button type="submit" class="btn bg-teal-400 btn-block" :disabled="logging">
                                    <rs-loading v-if="logging" icon="spinner10" class="mr-2"/>
                                    ورود
                                    <i v-if="!logging" class="icon-circle-left2 ml-2"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </rs-form>
                <!-- /login form -->

            </div>
            <!-- /content area -->

        </div>
        <!-- /main content -->

    </div>
    <!-- /page content -->
</template>

<script>
    import auth from '../../modules/objects/auth.js'
    import { login } from '../../api'

    export default {
        name: 'Login',

        data: () => ({
            // Loader login button status
            logging: false,

            // Server error message after submit data
            signInError: {},

            // Form errors that back from "rs-form"-component
            formErrors: {},

            // Fields of page
            fields: {
                username: '',
                password: '',
                g2f: '',

                // Rules of inputs of page
                rules: {
                    username: 'required|string',
                    password: 'required|string',
                    g2f: 'required|string|size:6',
                }
            }
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
            submit () {
                // Clear form errors
                this.setFormErrors({})
                // Remove message server error
                this.signInError = {}
                // Set "true" flag's loading in submit button & show it
                this.logging = true

                // Call "login" api method
                login(this.fields.username, this.fields.password).then(response => {
                    setCookie(auth.AUTH_TOKEN, response.data['access_token'])
                    this.$router.push({name: 'dashboard'})
                }).catch(error => {
                    console.log(error)
                    // Show message server error
                    this.signInError = {
                        code: error.response.status,
                        message: error.response.data.msg,
                    };
                }).finally(() => {
                    // Set "false" flag's loading in submit button & hide it
                    this.logging = false
                })
            }
        },
    }
</script>
