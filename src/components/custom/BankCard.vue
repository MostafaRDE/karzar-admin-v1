<template>
    <div class="partial-card px-3 py-3" :style="{backgroundColor, color: textColor}">
        <div class="shape"></div>
        <div class="data">
            <div class="mb-3">
                <div>
                    <span>بانک {{ bankName }}</span>
                </div>
            </div>
            <div class="text-right" style="direction: ltr">
                <span style="line-height: 1; font-size: 16px">{{ cardNumber }}</span>
                <span class="cursor-pointer">
                    <i class="icon-copy3 mr-2"></i>
                </span>
            </div>
            <div class="text-right d-flex align-items-center" style="direction: ltr">
                <span style="line-height: 1; font-size: 16px">IR-{{ shebaNumber }}</span>
                <span class="cursor-pointer">
                    <i class="icon-copy3 mr-2"></i>
                </span>
            </div>
            <div class="mt-3 d-flex justify-content-between">
                <div>
                    <span class="cursor-pointer">
                        <i class="icon-trash mr-3"></i>
                    </span>
                    <span class="cursor-pointer">
                        <i class="icon-pencil6 mr-3"></i>
                    </span>
                </div>
                <div class="d-flex align-items-center">
                    <span>{{ ownerAccountName }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'BankCard',

        props: ['bankId', 'cardNumber', 'shebaNumber', 'ownerAccountName'],

        data: () => ({
            backgroundColor: '',
            bankName: '',
            textColor: '',
        }),

        mounted () {
            switch (this.bankId) {
                case 'MELLAT':
                    this.backgroundColor = '#f34453';
                    this.bankName = 'ملت';
                    this.textColor = '#fff';
                    break;
                case 'SADERAT':
                    this.backgroundColor = '#4e4ad5';
                    this.bankName = 'صادرات';
                    this.textColor = '#fff';
                    break;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .partial-card {
        border-radius: 10px;

        .shape {
            position: absolute;
            top: 0;
            right: 0;
            height: 100%;
            width: 60% !important;
            background-color: hsla(0, 0%, 93.7%, .08);
            border-radius: 226em 23em 23em 0/254em 20em 20em 0;
            -webkit-border-radius: 226em 23em 23em 0/254em 20em 20em 0;
            -moz-border-radius: 226em 23em 23em 0/254em 20em 20em 0;
        }

        .data {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
    }
</style>
