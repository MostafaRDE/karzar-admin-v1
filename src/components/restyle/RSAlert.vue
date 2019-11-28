<template>
    <div class="alert alert-dismissible" :class="[{'text-white': solid, 'alert-rounded': rounded, 'alert-arrow-right': hasArrow && left, 'alert-arrow-left': hasArrow && right, 'alert-styled-right': left, 'alert-styled-left': right}, `${type}-${color}`]">
        <button v-if="closable" type="button" class="close" data-dismiss="alert"><span>×</span></button>
        <span v-if="title !== ''" class="font-weight-semibold">{{ title }}</span> <slot/>
    </div>
</template>

<script>
    export default {
        name: 'RSAlert',

        props: {
            closable: {
                default: false,
                type: Boolean,
            },
            color: {
                default: 'primary',
                type: String,
            },
            hasArrow: {
                default: false,
                type: Boolean,
            },
            left: {
                default: false,
                type: Boolean,
            },
            right: {
                default: false,
                type: Boolean,
            },
            rounded: {
                default: false,
                type: Boolean,
            },
            solid: {
                default: false,
                type: Boolean,
            },
            title: {
                default: '',
                type: String,
            },
            type: {
                default: 'alert',
                type: String,
            },
        }
    }
</script>

<style scoped>

</style>
