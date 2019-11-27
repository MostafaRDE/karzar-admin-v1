<template>
    <svg :style="`width:${width ? width : size};height:${height ? height : size}`" viewBox="0 0 30.155 31.566">
        <g transform="translate(-31.385 -138.956)">
            <path d="M1616.757,31.318l-14.369,14.369,14.369,14.369" transform="translate(-1569.589 109.052)" fill="none"
                  :stroke="fill" stroke-linecap="round" stroke-width="2"/>
            <path d="M32.8,155h26.74" transform="translate(1 -0.3)" fill="none" :stroke="fill" stroke-linecap="round"
                  stroke-width="2"/>
        </g>
    </svg>
</template>

<script>
    export default {
        name: "IconArrowLeft",

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