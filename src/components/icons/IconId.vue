<template>
    <svg :style="`width:${width ? width : size};height:${height ? height : size}`" viewBox="0 0 30 30">
        <path :fill="fill" d="M2.5 3.75h25c1.313 0 2.5 1.188 2.5 2.5v17.5c0 1.313-1.188 2.5-2.5 2.5h-25c-1.313 0-2.5-1.188-2.5-2.5V6.25c0-1.313 1.188-2.5 2.5-2.5zm15 3.75v1.25h10V7.5h-10zm0 2.5v1.25h10V10h-10zm0 2.5v1.25h8.75V12.5H17.5zM10 17.387c-2.5 0-7.5 1.363-7.5 3.863v1.25h15v-1.25c0-2.5-5-3.863-7.5-3.863zM10 7.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5z"></path>
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