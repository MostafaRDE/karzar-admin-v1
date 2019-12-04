<template>
    <div class="btn-toolbar justify-content-center">
        {{ /* Previous Button */ }}
        <rs-button class="legitRipple mr-2"
                   :bg="bg"
                   :color="color"
                   @click.native="model -= model !== 1 ? 1 : 0">
            <i class="mi-navigate-next"></i>
        </rs-button>

        <div class="btn-group">

            {{ /* Start Buttons */ }}
            <template v-for="button of buttons">
                <rs-button v-if="button.type === 1"
                           class="legitRipple"
                           :bg="bg"
                           :color="selected !== button.index ? color : activeColor"
                           @click.native="updatePagination(button.index)">
                    {{ button.index }}
                </rs-button>
                <rs-button v-if="button.type === 0"
                           class="legitRipple"
                           :bg="bg"
                           :color="color">...
                </rs-button>
            </template>

        </div>

        {{ /* Next Button */ }}
        <rs-button class="legitRipple ml-2"
                   :bg="bg"
                   :color="color"
                   @click.native="model += model < count ? 1 : 0">
            <i class="mi-navigate-before"></i>
        </rs-button>
    </div>
</template>

<script>
    export default {
        name: 'RSPagination',

        model: {
            prop: 'selected',
            event: 'change',
        },

        props: {
            activeColor: {
                default: 'primary',
                type: String,
            },
            bg: {
                default: '',
                type: String,
            },
            color: {
                default: 'light',
                type: String,
            },
            count: {
                default: 1,
            },
            ellipsisCount: {
                default: 3,
                type: Number,
            },
            selected: {
                default: 1,
            },
        },

        computed: {
            model: {
                get () {
                    return this.selected
                },
                set (selected) {
                    this.$emit('change', selected)
                }
            },

            buttons () {
                let buttons = []

                if (this.count <= this.ellipsisCount * 2 + 1) {
                    // Create buttons
                    for (let index = 1; index <= this.count; index++) {
                        buttons.push({ index, type: 1 })
                    }
                }
                // If the buttons more than this.ellipsisCount * 2 + 1, then
                else {
                    // Create first buttons
                    for (let i = 0; i < this.ellipsisCount; i++) {
                        buttons.push({ index: buttons.length + 1, type: 1 })
                    }

                    // Create variable has first show button on middle
                    let middleFirst = this.model - 1,
                        // Create variable has last show button on middle
                        middleEnd = this.model + 1,
                        // First button number of ellipsis ending buttons
                        end = this.count - (this.ellipsisCount - 1);

                    // If more than one button before set selected middle buttons, then add dots button at first middle buttons
                    if (middleFirst - this.ellipsisCount > 1) {
                        buttons.push({ type: 0 })
                    }

                    // <editor-fold desc="Middle buttons creator algorithm">
                    for (let i = 0; i < 3; i++) {
                        if (middleFirst >= 0 && middleFirst > this.ellipsisCount && middleFirst < end) {
                            buttons.push({ index: middleFirst, type: 1 })
                        }
                        middleFirst++
                    }
                    // </editor-fold>

                    // If more than one button after set selected middle buttons, then add dots button at last middle buttons
                    if (end - middleEnd > 1) {
                        buttons.push({ type: 0 })
                    }

                    // Create last buttons
                    for (let i = 0; i < this.ellipsisCount; i++) {
                        buttons.push({ index: this.count - (2 - i), type: 1 })
                    }
                }

                return buttons
            }
        },

        methods: {
            updatePagination (n) {
                this.model = n
            }
        }
    }
</script>
