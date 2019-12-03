<template>
    <div class="btn-toolbar justify-content-center">
        {{ /* Previous Button */ }}
        <rs-button v-if="model !== 0"
                   class="legitRipple mr-2"
                   :bg="bg"
                   :color="color"
                   @click.native="model -= 1">
            <i class="mi-navigate-next"></i>
        </rs-button>

        <div class="btn-group">

            {{ /* Start Buttons */ }}
            <rs-button v-for="n in count"
                       v-if="n < 4"
                       class="legitRipple"
                       :bg="bg"
                       :color="selected !== n - 1 ? color : activeColor"
                       @click.native="updatePagination(n)">
                {{ n }}
            </rs-button>

            {{ /* Middle Buttons */ }}
            <template v-if="count > 6">
                <template v-if="selected < 2">
                    <rs-button class="legitRipple" :bg="bg" :color="color">...</rs-button>
                </template>
                <template v-else-if="selected > count - 3">
                    <rs-button class="legitRipple" :bg="bg" :color="color">...</rs-button>
                </template>
                <template v-else-if="count - 3 <= 5">
                    <rs-button v-for="n in range(4, count - 3)"
                               class="legitRipple"
                               :bg="bg"
                               :color="selected !== n - 1 ? color : activeColor"
                               @click.native="updatePagination(n)">
                        {{ n }}
                    </rs-button>
                </template>
                <template v-else-if="selected === 2">
                    <rs-button class="legitRipple"
                               :bg="bg"
                               :color="selected !== n - 1 ? color : activeColor"
                               @click.native="updatePagination(4)">
                        {{ 4 }}
                    </rs-button>
                    <rs-button class="legitRipple" :bg="bg" :color="color">...</rs-button>
                </template>
                <template v-else-if="selected === count - 3">
                    <rs-button class="legitRipple" :bg="bg" :color="color">...</rs-button>
                    <rs-button class="legitRipple"
                               :bg="bg"
                               :color="selected !== n - 1 ? color : activeColor"
                               @click.native="updatePagination(6)">
                        {{ count - 3 }}
                    </rs-button>
                </template>
            </template>

            {{ /* End Buttons */ }}
            <template v-if="count > 3">
                <rs-button v-for="n in range( count - (count >= 6 ? 2 : (count === 5 ? 1 : 0)), count)"
                           class="legitRipple"
                           :bg="bg"
                           :color="selected !== n - 1 ? color : activeColor"
                           @click.native="updatePagination(n)">
                    {{ n }}
                </rs-button>
            </template>

        </div>

        {{ /* Next Button */ }}
        <rs-button v-if="model < count - 1"
                   class="legitRipple ml-2"
                   :bg="bg"
                   :color="color"
                   @click.native="model += 1">
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
            selected: {
                default: 0,
            }
        },

        computed: {
            model: {
                get () {
                    return this.selected
                },
                set (selected) {
                    this.$emit('change', selected)
                }
            }
        },

        methods: {
            updatePagination (n) {
                this.model = n - 1
            }
        }
    }
</script>
