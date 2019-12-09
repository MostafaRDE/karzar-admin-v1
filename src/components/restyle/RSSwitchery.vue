<template>
    <div class="form-check form-check-switchery form-check-switchery">
        <label class="form-check-label">
            <input v-show="false" type="checkbox" class="form-check-input-switchery" v-model="model"/>
            <span class="switchery switchery-default" :style="styleList"><small :style="iconStyleList"></small></span>
        </label>
    </div>
</template>

<script>
    export default {
        name: 'RSSwitchery',

        model: {
            prop: 'active',
            event: 'change',
        },

        props: {
            active: {
                default: false,
                type: Boolean,
            },
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
            styleList() {
                return {
                    backgroundColor: this.active ? '#64BD63' : '#fff',
                    borderColor: this.active ? '#64BD63' : '#DFDFDF',
                    boxShadow: this.active ? '#64BD63 0 0 0 10px inset' : '#DFDFDF 0 0 0 0 inset',
                    transition: this.active ? 'border 0.4s ease 0s, box-shadow 0.4s ease 0s, background-color 1.2s ease 0s' : 'border 0.4s ease 0s, box-shadow 0.4s ease 0s',
                }
            },
            iconStyleList() {
                return {
                    backgroundColor: this.active ? '#fff' : '',
                    left: this.active ? '18px' : '0',
                    transition: 'background-color 0.4s ease 0s, left 0.2s ease 0s',
                }
            }
        },
    }
</script>

<style scoped>

</style>
