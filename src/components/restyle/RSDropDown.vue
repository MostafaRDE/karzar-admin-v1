<template>
    <select class="form-control form-control-uniform">
        <option v-for="option of source" :value="option.value">{{ option.label }}</option>
    </select>
</template>

<script>
    export default {
        name: 'RSDropDown',

        props: {
            selected: {
                default: 0,
            },
            source: {},
        }
    }
</script>
