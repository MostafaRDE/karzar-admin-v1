<template>
    <svg :style="`width:${width ? width : size};height:${height ? height : size}`" viewBox="0 0 32 32">
        <path :fill="fill" d="M26.694 3.429H20.44A4.583 4.583 0 0 0 16 0a4.583 4.583 0 0 0-4.439 3.429H5.306A3.06 3.06 0 0 0 2.25 6.476v22.476A3.06 3.06 0 0 0 5.306 32h21.388a3.06 3.06 0 0 0 3.056-3.048V6.476a3.06 3.06 0 0 0-3.056-3.047zM16 3.429c.84 0 1.528.685 1.528 1.523A1.53 1.53 0 0 1 16 6.476a1.53 1.53 0 0 1-1.528-1.524A1.53 1.53 0 0 1 16 3.43zm10.885 25.714H5.115V6.286h2.864v5.143h16.042V6.286h2.864v22.857z"></path>
    </svg>
</template>

<script>
    export default {
        name: "IconClose",

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