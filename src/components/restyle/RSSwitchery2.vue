<template>
    <div class="rounded-circle cursor-pointer d-inline-flex justify-content-center align-items-center" :style="iconStyleList" @click="model = !model">
        <span v-if="icon" class="d-inline-flex justify-content-center align-items-center">
            <img :src="icon" alt="" style="width: 21px"/>
        </span>
        <span v-if="$slots['icon']" class="d-inline-flex justify-content-center align-items-center">
            <slot name="icon"/>
        </span>
    </div>
</template>

<script>
    export default {
        name: 'RSSwitchery2',

        model: {
            prop: 'active',
            event: 'change',
        },

        props: {
            active: {
                default: false,
                type: Boolean,
            },
            icon: {},
        },

        computed: {
            model: {
                get() {
                    return this.active
                },
                set(active) {
                    this.$emit('change', active)
                }
            },
            iconStyleList() {
                return {
                    padding: '3px',
                    backgroundColor: this.active ? '#068600' : '#860200',
                    left: this.active ? '18px' : '0',
                    transition: 'background-color 0.4s ease 0s, left 0.2s ease 0s',
                    display: 'block',
                }
            }
        },
    }
</script>
