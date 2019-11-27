<template>
    <svg :style="`width:${size};height:${size}`" viewBox="0 0 24 24">
        <path :fill="fill" d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z" />
    </svg>
</template>

<script>
    export default {
        name: "MdiFullscreen",

        props: {
            fill: {
                default: '#fff',
                type: String,
                required: false,
            },
            size: {
                default: '24px',
                type: String,
                required: false,
            }
        },
    }
</script>