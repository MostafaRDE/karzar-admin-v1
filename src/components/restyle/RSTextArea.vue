<template>
    <div class="form-group"
         :class="{'form-group-feedback': icon !== '', 'form-group-feedback-left': icon !== '' && iconDirection === 'start', 'form-group-feedback-right': icon !== '' && iconDirection === 'end'}">
         <textarea class="form-control"
                   :class="[inputClass, {'text-disabled' : disabled}]"
                   :style="textareaStyle"
                   :disabled="disabled"
                   :placeholder="placeholder"
                   :maxlength="maxlength !== 0 ? maxlength : ''"
                   v-model="model"></textarea>
        <span v-if="error !== ''" class="text-error text-danger">{{ error }}</span>
    </div>
</template>

<script>
    export default {
        name: 'RSInput',

        model: {
            prop: 'value',
        },

        props: {
            disabled: {
                default: false,
                type: Boolean,
            },
            error: {
                default: '',
                type: String,
            },
            icon: {
                default: '',
                type: String,
            },
            iconColor: {
                default: 'muted',
                type: String,
            },
            iconDirection: {
                default: 'start',
                type: String,
            },
            inputClass: {},
            maxlength: {
                default: 0,
            },
            name: {
                default: '',
                type: String,
            },
            placeholder: {
                default: '',
                type: String,
            },
            rules: {
                default: null,
            },
            step: {},
            textareaStyle: {},
            type: {
                default: 'text',
                type: String,
            },
            value: {
                default: '',
                type: String,
            },
        },

        computed: {
            model: {
                get () {
                    return this.value
                },
                set (value) {
                    this.$emit('input', value)
                }
            }
        }
    }
</script>

<style scoped>
    .text-error {
        display: block;
        margin-top: 5px
    }
</style>
