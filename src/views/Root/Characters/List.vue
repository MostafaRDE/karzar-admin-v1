<template>
    <div>

        <div class="card">
            <div class="card-header header-elements-inline">
                <h5 class="card-title">کاراکتر ها</h5>
            </div>

            <rs-table v-if="!loading">
                <template slot="head">
                    <th>ردیف</th>
                    <th>دارنده</th>
                    <th>نام کاراکتر</th>
                    <th>آی دی کاراکتر</th>
                    <th></th>
                </template>

                <template slot="body">
                    <tr>

                    </tr>
                </template>
            </rs-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "List",

        data: () => ({
            items: []
        }),

        methods: {
            getItems() {
                
            }
        },

        mounted() {
            this.getItems()
        }
    }
</script>
