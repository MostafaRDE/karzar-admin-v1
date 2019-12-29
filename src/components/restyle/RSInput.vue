<template>
    <div class="form-group"
         :class="{'form-group-feedback': icon !== '', 'form-group-feedback-left': icon !== '' && iconDirection === 'start', 'form-group-feedback-right': icon !== '' && iconDirection === 'end'}">
        <input v-if="!textarea" :type="type" class="form-control" :maxlength="maxlength !== 0 ? maxlength : ''" :placeholder="placeholder" v-model="model"/>
        <textarea v-if="textarea" class="form-control" :maxlength="maxlength !== 0 ? maxlength : ''" :placeholder="placeholder" v-model="model"></textarea>
        <div class="form-control-feedback" v-if="icon !== ''">
            <i :class="`icon-${icon} text-${iconColor}`"></i>
        </div>
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
            textarea: {
                default: false,
                type: Boolean,
            },
            type: {
                default: 'text',
                type: String,
            },
            value: {
                default: '',
                type: [String, Object, Array],
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
