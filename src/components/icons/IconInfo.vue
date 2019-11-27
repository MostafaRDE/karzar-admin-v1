<template>
    <svg :style="`width:${width ? width : size};height:${height ? height : size}`" viewBox="0 0 12 12">
        <path :fill="fill" d="M5.417 3.083h1.166V4.25H5.417V3.083zm0 2.334h1.166v3.5H5.417v-3.5zM6 .167A5.835 5.835 0 0 0 .167 6 5.835 5.835 0 0 0 6 11.833 5.835 5.835 0 0 0 11.833 6 5.835 5.835 0 0 0 6 .167zm0 10.5A4.673 4.673 0 0 1 1.333 6 4.673 4.673 0 0 1 6 1.333 4.673 4.673 0 0 1 10.667 6 4.673 4.673 0 0 1 6 10.667z"></path>
    </svg>
</template>

<script>
    export default {
        name: "IconInfo",

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