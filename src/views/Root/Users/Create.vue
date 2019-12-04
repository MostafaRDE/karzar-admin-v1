<template>
    <rs-form :submit="submitForm" @errors="">

        <div class="card">
            <div class="card-header header-elements-inline">
                <h5 class="card-title">اطلاعات پایه</h5>
            </div>

            <div class="card-body">
                <div class="row">
                    <div class="col-sm-6">
                        <rs-input placeholder="کد ملی"/>
                    </div>
                    <div class="col-sm-6">
                        <rs-input placeholder="شماره شناسنامه"/>
                    </div>
                    <div class="col-sm-4">
                        <rs-input placeholder="نام"/>
                    </div>
                    <div class="col-sm-4">
                        <rs-input placeholder="نام خانوادگی"/>
                    </div>
                    <div class="col-sm-4">
                        <rs-input placeholder="نام پدر"/>
                    </div>
                    <div class="col-sm-6">
                        <rs-input placeholder="شماره موبایل"/>
                    </div>
                    <div class="col-sm-6">
                        <rs-input placeholder="شماره ثابت"/>
                    </div>
                    <div class="col-sm-6">
                        <rs-input type="email" placeholder="ایمیل"/>
                    </div>
                    <div class="col-sm-6">
                        <rs-input type="email" placeholder="ایمیل"/>
                    </div>

                    <div class="col-12">
                        <rs-button type="submit">ثبت</rs-button>
                    </div>
                </div>
            </div>
        </div>

    </rs-form>
</template>

<script>
    export default {
        name: 'Create',

        metaInfo: {
            title: 'افزودن کاربر'
        },

        breadcrumb: () => ([
            { label: 'پیشخوان', to: '/', icon: 'home4' },
            { label: 'کاربران', to: '/users', icon: 'users4' },
            { label: 'افزودن کاربر', to: '/users/create', icon: 'users4' },
        ]),

        methods: {
            submitForm () {

            }
        }
    }
</script>
