<template>
    <i :class="`icon-${icon} spinner`" :style="{width}"></i>
</template>

<script>
    export default {
        name: 'RSLoading',

        props: ['icon', 'width']
    }
</script>

<style scoped>
    i {
        transform: scaleX(-1);
    }
</style>
