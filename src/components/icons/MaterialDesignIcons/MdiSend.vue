<template>
    <svg :style="`width:${width ? width : size};height:${height ? height : size}`" viewBox="0 0 24 24">
        <path :fill="fill" d="M2,21L23,12L2,3V10L17,12L2,14V21Z"/>
    </svg>
</template>

<script>
    export default {
        name: "MdiSend",

        props: {
            fill: {
                default: '#fff',
                type: String,
                required: false,
            },
            height: {
                type: String,
                required: false,
            },
            width: {
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