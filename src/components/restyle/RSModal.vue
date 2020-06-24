<template>
    <transition name="fade">

        <div v-if="model"
             class="modal fade show d-flex align-items-center"
             style="padding-right: 17px; background: #0008"
             @click.self="model = false">

            <div class="modal-dialog" :style="dialogStyle">
                <div class="modal-content">

                    {{ /* -- Header -- */ }}
                    <div v-if="!$slots.hasOwnProperty('header')" class="modal-header">
                        <h5 class="modal-title">{{ title }}</h5>
                        <button type="button"
                                class="close"
                                data-dismiss="modal" @click="model = false">×
                        </button>
                    </div>
                    <div v-else class="modal-header">
                        <slot name="header"/>
                    </div>

                    {{ /* -- Body -- */ }}
                    <div class="modal-body">
                        <slot/>
                    </div>

                    {{ /* -- Footer -- */ }}
                    <div v-if="!$slots.hasOwnProperty('footer')" class="modal-footer">
                        <rs-button type="button" color="link" @click.native="model = false">بستن</rs-button>
                    </div>
                    <div v-else class="modal-footer">
                        <slot name="footer"/>
                    </div>

                </div>
            </div>

        </div>

    </transition>
</template>

<script>
    export default {
        name: 'RSModal',

        model: {
            prop: 'visibility',
            event: 'visibility',
        },

        props: {
            dialogStyle: {
                default: () => ({}),
                type: [Object, String],
            },
            title: {
                default: '',
                type: String,
            },
            visibility: {
                default: false,
                type: Boolean,
            }
        },

        computed: {
            model: {
                get () {
                    return this.visibility
                },
                set (visibility) {
                    this.$emit('visibility', visibility)
                }
            }
        }
    }
</script>
