<template>
    <svg :style="`width:${width ? width : size};height:${height ? height : size}`" viewBox="0 0 32 32">
        <ellipse :fill="fill" cx="16" cy="17.719" rx="4.5" ry="4.512"></ellipse>
        <path :fill="fill" d="M29.143 4.542h-6.286L20.571 2.25H11.43L9.143 4.542H2.857A2.86 2.86 0 0 0 0 7.406v19.48a2.86 2.86 0 0 0 2.857 2.864h26.286A2.86 2.86 0 0 0 32 26.885V7.406a2.86 2.86 0 0 0-2.857-2.864zM16 25.74c-4.418 0-8-3.592-8-8.021 0-4.43 3.582-8.021 8-8.021s8 3.591 8 8.02c0 4.43-3.582 8.022-8 8.022z"></path>
    </svg>
</template>

<script>
    export default {
        name: "IconPhoto",

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