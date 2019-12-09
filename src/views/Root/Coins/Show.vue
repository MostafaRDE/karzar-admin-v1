<template>
    <div class="card">
        <div class="card-header header-elements-inline pb-0">
            <div class="d-flex flex-wrap">
                <rs-button icon="user-block" class="mb-3 mr-3" color="danger">رد کردن کاربر</rs-button>
                <rs-button icon="vcard" class="mb-3 mr-3">ویرایش کاربر</rs-button>
                <rs-button icon="comments" color="success" class="mb-3 mr-3">ثبت توضیحات</rs-button>
                <rs-button icon="shield-notice" color="warning" class="mb-3 mr-3">غیر فعال سازی ورود دو مرحله ای
                </rs-button>
                <rs-button icon="sync" color="primary" class="mb-3 mr-3">تاریخچه معاملات</rs-button>
                <rs-button icon="credit-card" color="primary" class="mb-3 mr-3">واریز و برداشت</rs-button>
                <rs-button icon="cash4" color="primary" class="mb-3 mr-3">تاریخچه کمیسیون دریافتی</rs-button>
                <rs-button icon="enter2" color="primary" class="mb-3 mr-3">تاریخچه لاگین</rs-button>
                <rs-button icon="key" color="primary" class="mb-3 mr-3">گزارشات تغییر رمز کاربران</rs-button>
                <rs-button icon="user-tie" color="primary" class="mb-3 mr-3">لاگ همکاران</rs-button>
                <rs-button icon="wallet" color="primary" class="mb-3 mr-3">کیف پول</rs-button>
            </div>
        </div>

        <hr class="my-0"/>

        <div class="card-body">
            <h3>اطلاعات پایه</h3>
            <div class="row mb-2">
                <div class="col-sm-3 d-flex align-items-center">
                    <span>کد ملی</span>
                </div>
                <div class="col-sm-3 d-flex align-items-center justify-content-end">
                    <rs-switchery class="mb-0 ml-2"/>
                    <span style="line-height: 1">0925173088</span>
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
                <div class="col-sm-3 d-flex align-items-center justify-content-end">
                    <rs-switchery class="mb-0 ml-2"/>
                    <span style="line-height: 1">09383359523</span>
                    <rs-button-icon class="ml-2" icon="copy3" rounded></rs-button-icon>
                </div>
                <div class="col-sm-3 d-flex align-items-center">
                    <span>شماره ثابت</span>
                </div>
                <div class="col-sm-3 d-flex align-items-center justify-content-end">
                    <rs-switchery class="mb-0 ml-2"/>
                    <span style="line-height: 1">05134286785</span>
                    <rs-button-icon class="ml-2" icon="copy3" rounded></rs-button-icon>
                </div>
            </div>
        </div>

        <hr class="my-0"/>

        <div class="card-body">
            <h3>حساب های بانکی</h3>

            <div class="row">
                <div class="col-sm-3">

                    {{ /* Start add-bank-card-button */ }}
                    <button type="button"
                            class="btn btn-block bg-transparent h-100"
                            :style="{border: 'solid 1px #0003', borderRadius: '10px'}"
                            @click="addBankCardModalVisibility = true">
                        <i class="plus-bg mr-2"
                           style="background-color: #e2f2fe; width: 22px; height: 22px; display: inline-block; line-height: 24px">
                            <span style="color: #40a7ff; font-style: normal">+</span>
                        </i>
                        <span class="font-size-lg">افزودن حساب بانکی</span>
                    </button>
                    {{ /* End add-bank-card-button */ }}

                    {{ /* Start add-bank-card modal */ }}
                    <rs-form v-model="addBankCardModalVisibility"
                             :submit="submitAddBankCardForm"
                             @errors="setFormErrorsAddBankCard($event)">
                        <rs-modal :dialogStyle="{minWidth: '400px'}"
                                  v-model="addBankCardModalVisibility"
                                  title="افزودن کارت">
                            <rs-input placeholder="شماره کارت"
                                      maxlength="16"
                                      name="cardNumber"
                                      :rules="fieldsAddBankCard.rules.cardNumber"
                                      :error="getInputErrorAddBankCard('cardNumber')"
                                      v-model="fieldsAddBankCard.cardNumber"/>
                            <rs-input placeholder="شماره شبا"
                                      class="mb-0"
                                      maxlength="24"
                                      name="shebaNumber"
                                      :rules="fieldsAddBankCard.rules.shebaNumber"
                                      :error="getInputErrorAddBankCard('shebaNumber')"
                                      v-model="fieldsAddBankCard.shebaNumber"/>

                            <template slot="footer">
                                <rs-button type="button" color="link"
                                           @click.native="addBankCardModalVisibility = false">بستن
                                </rs-button>
                                <rs-button type="submit" bg="primary"
                                           @click.native="addBankCardModalVisibility = false">افزودن کارت
                                </rs-button>
                            </template>
                        </rs-modal>
                    </rs-form>
                    {{ /* End add-bank-card modal */ }}
                </div>

                {{ /* Start bank-cards loop */ }}
                <div class="col-sm-3" v-for="bankCard of bankCards">
                    <bank-card :bankId="bankCard.bankId"
                               :cardNumber="bankCard.cardNumber"
                               :shebaNumber="bankCard.shebaNumber"
                               :ownerAccountName="bankCard.ownerAccountName"/>
                </div>
                {{ /* End bank-cards loop */ }}
            </div>
        </div>

        <hr class="my-0"/>

        <div class="card-body">
            <h3>تصاویر کاربر</h3>

            <div class="row">
                <div class="col-sm-3" v-for="image of images">
                    <a class="d-flex rounded overflow-hidden position-relative" @mouseenter="image.isHover = true" @mouseleave="image.isHover = false">
                        <img :src="image.src" alt="" class="w-100"/>
                        <transition name="fade">
                            <span v-if="image.isHover" class="position-absolute bottom-0 left-0 right-0 top-0 p-2 text-white d-flex justify-content-center align-items-center" style="background: #0009">
                                <span class="cursor-pointer mr-3 p-2 rounded-circle"
                                      style="background: #000A; line-height: 1">
                                    <i class="icon-trash"></i>
                                </span>
                                <span class="cursor-pointer mr-3 p-2 rounded-circle"
                                      style="background: #000A; line-height: 1">
                                    <i class="icon-pencil6"></i>
                                </span>
                            </span>
                        </transition>
                    </a>
                </div>
            </div>
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
            addBankCardModalVisibility: false,
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
            ],

            images: [
                { src: require('../../../../public/images/samples/book_old_pen_table_vase_rose_red_76972_1920x1080.jpg'), isHover: false },
                { src: require('../../../../public/images/samples/book_sphere_magic_sorcery_46753_1920x1080.jpg'), isHover: false },
                { src: require('../../../../public/images/samples/books_vintage_paper_cards_notebook_retro_74362_1920x1080.jpg'), isHover: false },
            ],

            // Loader login button status
            progressingAddBankCard: false,

            // Server error message after submit data
            signInError: {},

            // Form errors that back from "rs-form"-component
            formErrorsAddBankCard: {},

            // Fields of Add Bank Card
            fieldsAddBankCard: {
                cardNumber: '',
                shebaNumber: '',

                rules: {
                    cardNumber: 'required|string:digits|size:16',
                    shebaNumber: 'required|string:digits|size:24',
                }
            }
        }),

        methods: {
            // Get errors from "rs-form"-component and set in "formErrors"-data-variable
            setFormErrorsAddBankCard (errors) {
                this.formErrorsAddBankCard = errors
            },

            // Customizing error-message for show in view (below inputs)
            getInputErrorAddBankCard (key) {
                return (this.formErrorsAddBankCard.hasOwnProperty(key)) ? this.formErrorsAddBankCard[key][0] : ''
            },

            // Submit form after form validation (If is successful)
            submitAddBankCardForm () {

            }
        }
    }
</script>
