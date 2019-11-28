<template>
    <div class="form-group"
         :class="{'form-group-feedback': icon !== null, 'form-group-feedback-left': iconDirection === 'start', 'form-group-feedback-right': iconDirection === 'end'}">
        <input type="text" class="form-control" :placeholder="placeholder" v-model="model"/>
        <div class="form-control-feedback" v-if="icon !== ''">
            <i :class="`icon-${icon} text-${iconColor}`"></i>
        </div>
        <span v-if="error !== ''" class="text-error text-danger">{{ error }}</span>
    </div>
</template>

<script>
    export default {
        name: 'RSInputMaterial',

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
            value: {
                default: '',
                type: String,
            }
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
