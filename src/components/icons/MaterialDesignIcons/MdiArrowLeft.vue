<template>
    <svg :style="`width:${width ? width : size};height:${height ? height : size}`" viewBox="0 0 24 24">
        <path :fill="fill" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
    </svg>
</template>

<script>
    export default {
        name: "MdiArrowLeft",

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