<template>
    <svg :style="`width:${width ? width : size};height:${height ? height : size}`" viewBox="0 0 24 24">
        <path :fill="fill" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"/>
    </svg>
</template>

<script>
    export default {
        name: "MdiArrowRight",

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