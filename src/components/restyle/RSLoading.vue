<template>
    <i :class="`icon-${icon} spinner`"></i>
</template>

<script>
    export default {
        name: 'RSLoading',

        props: ['icon']
    }
</script>

<style scoped>
    i {
        transform: scaleX(-1);
    }
</style>
