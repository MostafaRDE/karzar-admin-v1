<template>
    <!-- Page content -->
    <div class="page-content" :style="{height: '100vh'}">

        <!-- Main content -->
        <div class="content-wrapper">

            <!-- Content area -->
            <div class="content d-flex justify-content-center align-items-center">

                <!-- Login form -->
                <rs-form class="login-form" @errors="setFormErrors($event)" :submit="submit">
                    <div class="card mb-0">
                        <div class="card-body">
                            <div class="text-center mb-3">
                                <i class="icon-reading icon-2x text-slate-300 border-slate-300 border-3 rounded-round p-3 mb-3 mt-1"></i>
                                <h5 class="mb-0">ورود به پنل مدیریت</h5>
                                <span class="d-block text-muted">اطلاعات کاربری خود را وارد کنید</span>
                            </div>

                            <rs-input-material placeholder="نام کاربری"
                                               icon="user"
                                               name="username"
                                               :error="getInputError('username')"
                                               :rules="fields.rules.username"/>

                            <rs-input-material placeholder="گذرواژه"
                                               icon="lock2"
                                               name="password"
                                               :error="getInputError('password')"
                                               :rules="fields.rules.password"/>

                            <div class="form-group">
                                <button type="submit" class="btn btn-primary btn-block">ورود <i
                                    class="icon-circle-left2 ml-2"></i></button>
                            </div>

                            <div class="text-center">
                                <router-link :to="{name: 'resetPassword'}">گذرواژه خود را وارد فراموش کرده اید؟
                                </router-link>
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

        // Rules of inputs of page
        rules: {
          username: 'required|string',
          password: 'required|string',
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
      submit() {
        // Clear form errors
        this.setFormErrors({});
        // Remove message server error
        this.signInError = {};
        // Set "true" flag's loading in submit button & show it
        // this.logging = true;
      }
    }
  }
</script>
