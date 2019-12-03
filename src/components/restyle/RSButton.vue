<template>
    <button :type="type"
            :class="[`btn`, color !== '' ? `btn-${color}` : '', bg !== '' ? `bg-${bg}` : '']">
        <slot/>
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
