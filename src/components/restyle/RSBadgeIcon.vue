<template>
    <span class="badge badge-icon" :class="classList"><i :class="`icon-${icon}`"></i></span>
</template>

<script>
    export default {
        name: 'RSBadgeIcon',

        props: {
            bg: {
                default: '',
                type: String,
            },
            color: {
                default: 'primary',
                type: String,
            },
            icon: {
                default: '',
                type: String,
            },
            rounded: {
                default: false,
                type: Boolean,
            }
        },

        computed: {
            classList() {
                return [
                    this.bg !== '' ? `bg-${this.bg}` : '',
                    this.bg === '' ? `badge-${this.color}` : '',
                    this.rounded ? `rounded-circle` : '',
                ]
            }
        }
    }
</script>
