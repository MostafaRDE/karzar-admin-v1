<template>
    <button :type="type"
            :class="[`btn`, color !== '' ? `btn-${color}` : '', bg !== '' ? `bg-${bg}` : '', {'btn-loading disabled': loading}]" :disabled="disabled || loading">
        <i v-if="loading && loadingIconPosition === 'start'" class="mr-2 spinner" :class="[`icon-${loadingIcon}`]"></i>
        <i v-if="icon !== '' && iconPosition === 'start'" class="mr-2" :class="[`icon-${icon}`]"></i>
        <slot/>
        <i v-if="icon !== '' && iconPosition === 'end'" class="ml-2" :class="[`icon-${icon}`]"></i>
        <i v-if="loading && loadingIconPosition === 'end'" class="ml-2 spinner" :class="[`icon-${loadingIcon}`]"></i>
    </button>
</template>

<script>
    export default {
        name: "RSButton",

        props: {
            bg: {
                default: '',
                type: String,
            },
            color: {
                default: 'primary',
                type: String,
            },
            disabled: {
                default: false,
                type: Boolean,
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
            loadingIcon: {
                default: 'spinner4',
                type: String,
            },
            loadingIconPosition: {
                default: 'start',
                type: String,
            },
            type: {
                default: 'button',
                type: String,
            },
        }
    }
</script>
