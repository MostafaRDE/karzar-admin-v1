<template>
    <button :type="type" class="btn alpha-pink text-pink-800 btn-icon" :class="classList">
        <i v-if="!$slots.hasOwnProperty('default')" :class="`icon-${icon}`"></i>
        <slot v-else name="icon"/>
    </button>
</template>

<script>
    export default {
        name: 'RSButtonIcon',

        props: {
            icon: {
                default: 'link',
                type: String,
            },
            rounded: {
                default: false,
                type: Boolean,
            },
            type: {
                default: 'button',
                type: String,
            },
        },

        data() {
            return {
                classList: [
                    {
                        'rounded-round': this.rounded
                    }
                ]
            }
        },

        mounted () {
            console.log(this.$slots)
        }
    }
</script>
