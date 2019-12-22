<template>
    <div>
        <select class="form-control form-control-uniform" v-model="model">
            <option v-for="option of source" :value="option.key">{{ option.value }}</option>
        </select>
        <span v-if="error !== ''" class="text-error text-danger">{{ error }}</span>
    </div>
</template>

<script>
    export default {
        name: 'RSDropDown',

        model: {
            prop: 'selected',
        },

        props: {
            error: {
                default: '',
                type: String,
            },
            name: {
                default: '',
                type: String,
            },
            rules: {
                default: null,
            },
            selected: {
                default: 0,
            },
            source: {},
        },

        computed: {
            model: {
                get () {
                    return this.selected
                },
                set (selected) {
                    this.$emit('input', selected)
                }
            }
        },
    }
</script>
