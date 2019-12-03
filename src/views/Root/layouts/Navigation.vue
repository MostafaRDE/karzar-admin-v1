<template>
    <div>
        <rs-checkable-button v-for="(filter, index) of source"
                             :key="`filter-${index}`"
                             class="mr-3"
                             :bg="filter.hasOwnProperty('bg') ? filter.bg : ''"
                             :color="filter.color"
                             :checked="model === index"
                             @click.native="clickOnFilterButton(index)">
            {{ filter.label }}
        </rs-checkable-button>
    </div>
</template>

<script>
    export default {
        name: "Navigation",

        model: {
            prop: 'selected',
            event: 'change',
        },

        props: {
            selected: {
                default: -1,
                type: Number
            },
            source: {
                default: () => ([]),
                type: Array
            },
        },

        computed: {
            model: {
                get() {
                    return this.selected
                },
                set(selected) {
                    this.$emit('change', selected)
                }
            }
        },

        methods: {
            clickOnFilterButton(position) {
                this.model = position;
                this.source[position].action()
            }
        }
    }
</script>
