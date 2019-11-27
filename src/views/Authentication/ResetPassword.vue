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
                                <i class="icon-spinner11 icon-2x text-warning border-warning border-3 rounded-round p-3 mb-3 mt-1"></i>
                                <h5 class="mb-0">بازیابی گذرواژه</h5>
                                <span class="d-block text-muted">لینک بازیابی گذرواژه به ایل شما ارسال می شود</span>
                            </div>

                            <div class="form-group form-group-feedback form-group-feedback-left">
                                <input type="email" class="form-control" placeholder="ایمیل"/>
                                <div class="form-control-feedback">
                                    <i class="icon-user text-muted"></i>
                                </div>
                            </div>

                            <div class="form-group">
                                <button type="submit" class="btn btn-primary btn-block">ارسال لینک بازیابی گذرواژه <i class="icon-circle-left2 ml-2"></i></button>
                            </div>

                            <div class="text-center">
                                <a>ورود</a>
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
    name: 'Login'
  }
</script>
