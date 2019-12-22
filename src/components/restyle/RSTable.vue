<template>
    <div class="table-responsive">
        <table class="table" :class="tableClassList">
            <thead>
            <tr>
                <slot name="head"/>
            </tr>
            </thead>
            <tbody>
                <slot name="body"/>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'RSTable',

        props: {
            hoverable: {
                default: false,
                type: Boolean,
            }
        },

        data() {
            return {
                tableClassList: [
                    {
                        'table-hover': this.hoverable,
                    }
                ]
            }
        }
    }
</script>
