<template>
    <span class="badge" :class="classList"><slot/></span>
</template>

<script>
    export default {
        name: 'RSBadge',

        props: {
            bg: {
                default: '',
                type: String,
            },
            color: {
                default: 'primary',
                type: String,
            },
            pill: {
                default: false,
                type: Boolean,
            }
        },

        data() {
            return {
                classList: [
                    this.bg !== '' ? `bg-${this.bg}` : '',
                    this.bg === '' ? `badge-${this.color}` : '',
                    this.pill ? `badge-pill` : '',
                ]
            }
        }
    }
</script>
