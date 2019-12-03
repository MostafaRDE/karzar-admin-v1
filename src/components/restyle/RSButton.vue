<template>
    <button :type="type">
        <slot/>
    </button>
</template>

<script>
    export default {
        name: "RSButton",

        props: {
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
