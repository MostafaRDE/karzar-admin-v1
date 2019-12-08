<template>
    <div class="card">
        <div class="card-header header-elements-inline">
            <div>
                <rs-button icon="user-block" class="mr-3" color="danger">رد کردن کاربر</rs-button>
                <rs-button icon="vcard" class="mr-3">ویرایش کاربر</rs-button>
                <rs-button icon="comments" color="success" class="mr-3">ثبت توضیحات</rs-button>
                <rs-button icon="shield-notice" color="warning" class="mr-3">غیر فعال سازی ورود دو مرحله ای</rs-button>
            </div>
        </div>

        <hr class="my-0"/>

        <div class="card-body">
            <h3>اطلاعات پایه</h3>
            <div class="row mb-2">
                <div class="col-sm-3 d-flex align-items-center">
                    <span>کد ملی</span>
                </div>
                <div class="col-sm-3 text-right">
                    <span>0925173088</span>
                    <rs-button-icon class="ml-2" icon="copy3" rounded></rs-button-icon>
                </div>
                <div class="col-sm-3 d-flex align-items-center">
                    <span>شماره شناسنامه</span>
                </div>
                <div class="col-sm-3 text-right">
                    <span>0925173088</span>
                    <rs-button-icon class="ml-2" icon="copy3" rounded></rs-button-icon>
                </div>
            </div>
            <div class="row mb-2">
                <div class="col-sm-3 d-flex align-items-center">
                    <span>نام</span>
                </div>
                <div class="col-sm-3 text-right">
                    <span>مصطفی</span>
                    <rs-button-icon class="ml-2" icon="copy3" rounded></rs-button-icon>
                </div>
                <div class="col-sm-3 d-flex align-items-center">
                    <span>نام خانوادگی</span>
                </div>
                <div class="col-sm-3 text-right">
                    <span>رستم دخت عفتی</span>
                    <rs-button-icon class="ml-2" icon="copy3" rounded></rs-button-icon>
                </div>
            </div>
            <div class="row mb-2">
                <div class="col-sm-3 d-flex align-items-center">
                    <span>نام پدر</span>
                </div>
                <div class="col-sm-3 text-right">
                    <span>علی اکبر</span>
                    <rs-button-icon class="ml-2" icon="copy3" rounded></rs-button-icon>
                </div>
                <div class="col-sm-3 d-flex align-items-center">
                    <span>تاریخ تولد</span>
                </div>
                <div class="col-sm-3 text-right">
                    <span>1378/02/18</span>
                    <rs-button-icon class="ml-2" icon="copy3" rounded></rs-button-icon>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-3 d-flex align-items-center">
                    <span>شماره موبایل</span>
                </div>
                <div class="col-sm-3 text-right">
                    <span>09383359523</span>
                    <rs-button-icon class="ml-2" icon="copy3" rounded></rs-button-icon>
                </div>
                <div class="col-sm-3 d-flex align-items-center">
                    <span>شماره ثابت</span>
                </div>
                <div class="col-sm-3 text-right">
                    <span>05134286785</span>
                    <rs-button-icon class="ml-2" icon="copy3" rounded></rs-button-icon>
                </div>
            </div>
        </div>

        <hr class="my-0"/>

        <div class="card-body">
            <h3>حساب های بانکی</h3>
            <div class="row">
                <div class="col-sm-3">
                    <button type="button" class="btn btn-block bg-transparent h-100"
                            :style="{border: 'solid 1px #0003', borderRadius: '10px'}">
                        <i class="plus-bg mr-2" style="background-color: #e2f2fe; width: 22px; height: 22px; display: inline-block; line-height: 24px">
                            <span style="color: #40a7ff; font-style: normal">+</span>
                        </i>
                        <span class="font-size-lg">افزودن حساب بانکی</span>
                    </button>
                </div>
                <div class="col-sm-3" v-for="bankCard of bankCards">
                    <bank-card :bankId="bankCard.bankId"
                               :cardNumber="bankCard.cardNumber"
                               :shebaNumber="bankCard.shebaNumber"
                               :ownerAccountName="bankCard.ownerAccountName"/>
                </div>
            </div>
        </div>

        <hr class="my-0"/>

        <div class="card-body">
            <h3>تاریخچه معاملات</h3>

        </div>
    </div>
</template>

<script>
    export default {
        name: 'Show',

        metaInfo: {
            title: 'جزئیات'
        },

        breadcrumb: () => ([
            { label: 'پیشخوان', to: '/', icon: 'home4' },
            { label: 'کاربران', to: '/users', icon: 'users4' },
            { label: 'جزئیات', to: '', icon: 'user' },
        ]),

        data: () => ({
            bankCards: [
                {
                    bankId: 'MELLAT',
                    cardNumber: '6104 3374 6326 6914',
                    shebaNumber: '610120010000005030340172',
                    ownerAccountName: 'مصطفی رستم دخت عفتی'
                },
                {
                    bankId: 'SADERAT',
                    cardNumber: '6104 3374 6326 6914',
                    shebaNumber: '610120010000005030340172',
                    ownerAccountName: 'مصطفی رستم دخت عفتی'
                },
            ]
        }),
    }
</script>
