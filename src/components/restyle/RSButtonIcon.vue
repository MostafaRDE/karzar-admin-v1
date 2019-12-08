<template>
    <button :type="type" class="btn alpha-pink text-pink-800 btn-icon" :class="classList">
        <i :class="`icon-${icon}`"></i>
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
        }
    }
</script>
