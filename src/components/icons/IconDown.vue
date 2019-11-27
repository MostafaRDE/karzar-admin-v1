<template>
    <svg :style="`width:${width ? width : size};height:${height ? height : size}`" viewBox="0 0 6 3">
        <path :fill="fill" d="M0 0h6L3 3z"></path>
    </svg>
</template>

<script>
    export default {
        name: "IconDown",

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