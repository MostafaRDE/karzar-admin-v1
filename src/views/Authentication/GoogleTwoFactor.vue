<template>
    <!-- Page content -->
    <div class="page-content" :style="{height: '100vh'}">

        <!-- Main content -->
        <div class="content-wrapper">

            <!-- Content area -->
            <div class="content d-flex justify-content-center align-items-center">

                <!-- Login form -->
                <rs-form class="login-form">
                    <div class="card mb-0">
                        <div class="card-body">
                            <div class="text-center mb-3">
                                <i class="icon-safe icon-2x text-warning-300 border-warning-300 border-3 rounded-round p-3 mb-3 mt-1"></i>
                                <h5 class="mb-0">ورود دو مرحله ای گوگل</h5>
                                <span class="d-block text-muted">لطفا کد گوگل خود را وارد کنید</span>
                            </div>

                            <div class="form-group form-group-feedback form-group-feedback-left">
                                <input type="text" class="form-control" placeholder="کد گوگل" v-model="fields.googleCode"/>
                                <div class="form-control-feedback">
                                    <i class="icon-user text-muted"></i>
                                </div>
                            </div>

                            <div class="form-group">
                                <button type="submit" class="btn btn-primary btn-block">تایید <i class="icon-circle-left2 ml-2"></i></button>
                            </div>

                            <div class="text-center">
                                <a>گوشی خود را گم کرده اید؟</a>
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
            fields: {
                googleCode: '',

                rules: {
                    googleCode: 'required|string:digits|size:6',
                }
            }
        }),
    }
</script>
