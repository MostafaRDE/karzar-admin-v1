<template>
    <svg :style="`width:${size};height:${size}`" viewBox="0 0 24 24">
        <path :fill="fill" d="M14,14H19V16H16V19H14V14M5,14H10V19H8V16H5V14M8,5H10V10H5V8H8V5M19,8V10H14V5H16V8H19Z" />
    </svg>
</template>

<script>
    export default {
        name: "MdiFullscreenExit",

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