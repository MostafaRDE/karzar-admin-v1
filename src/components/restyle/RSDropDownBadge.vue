<template>
    <div class="dropdown show">
        <span class="badge dropdown-toggle" :class="classList"><slot/></span>
        <div class="dropdown-menu dropdown-menu-right" x-placement="bottom-end" style="position: absolute; will-change: transform; top: 0; left: 0; transform: translate3d(278px, 3174px, 0px);">
            <a href="#" class="dropdown-item">
                <span class="badge badge-mark mr-2 border-danger"></span>

            </a>
            <a href="#" class="dropdown-item">
                <span class="badge badge-mark mr-2 border-info"></span>
                Normal priority
            </a>
            <a href="#" class="dropdown-item">
                <span class="badge badge-mark mr-2 border-primary"></span>
                Low priority
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'RSDropDownBadge',

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
