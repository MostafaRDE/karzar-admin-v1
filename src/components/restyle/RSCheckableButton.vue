<template>
    <button :type="type"
            :class="[`btn`, color !== '' ? `btn-${color}` : '', bg !== '' ? `bg-${bg}` : '', {'active' : model}]"
            @click="updateCheck">
        <slot/>
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
