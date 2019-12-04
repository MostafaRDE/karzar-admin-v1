<template>
    <button :type="type"
            :class="[`btn`, color !== '' ? `btn-${color}` : '', bg !== '' ? `bg-${bg}` : '']">
        <i v-if="icon !== '' && iconPosition === 'start'" class="mr-2" :class="[`icon-${icon}`]"></i>
        <slot/>
        <i v-if="icon !== '' && iconPosition === 'end'" class="ml-2" :class="[`icon-${icon}`]"></i>
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
        }
    }
</script>
