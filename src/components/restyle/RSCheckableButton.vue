<template>
    <button :type="type"
            :class="[`btn`, color !== '' ? `btn-${color}` : '', bg !== '' ? `bg-${bg}` : '', {'active' : model}]"
            @click="updateCheck">
        <i v-if="icon !== '' && iconPosition === 'start'" class="mr-2" :class="[`icon-${icon}`]"></i>
        <slot/>
        <i v-if="icon !== '' && iconPosition === 'end'" class="ml-2" :class="[`icon-${icon}`]"></i>
    </button>
</template>

<script>
    export default {
        name: "RSCheckableButton",

        model: {
            prop: 'checked',
            event: 'change',
        },

        props: {
            bg: {
                default: '',
                type: String,
            },
            checked: {
                default: false,
                type: Boolean,
            },
            color: {
                default: 'primary',
                type: String,
            },
            icon: {
                default: '',
                type: String,
            },
            iconPosition: {
                default: 'start',
                type: String,
            },
            loading: {
                default: false,
                type: Boolean,
            },
            type: {
                default: 'button',
                type: String,
            },
        },

        computed: {
            model : {
                get() {
                    return this.checked
                },
                set(checked) {
                    this.$emit('change', checked)
                }
            }
        },

        methods: {
            updateCheck() {
                this.model = !this.model
            }
        }
    }
</script>
