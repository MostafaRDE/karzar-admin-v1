<template>
    <div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
        <div class="d-flex">
            <div class="breadcrumb">

                <template v-for="item of $store.state.breadcrumb">

                    <router-link v-if="item.hasOwnProperty('to') && (!item.hasOwnProperty('disabled') || !item.disabled)" :to="item.to" class="breadcrumb-item"><i :class="`icon-${item.hasOwnProperty('icon') ? item.icon : ''} mr-2`"></i> {{ item.label }}</router-link>

                    <span v-if="!item.hasOwnProperty('to') || (item.hasOwnProperty('disabled') && item.disabled)" class="breadcrumb-item" :class="{'text-muted': item.hasOwnProperty('disabled') && item.disabled}"><i :class="`icon-${item.hasOwnProperty('icon') ? item.icon : ''} mr-2`"></i> {{ item.label }}</span>

                </template>
            </div>

            <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
        </div>

        <div class="header-elements d-none">
            <!--            <div class="breadcrumb justify-content-center">-->
            <!--                <a href="#" class="breadcrumb-elements-item">-->
            <!--                    Link-->
            <!--                </a>-->

            <!--                <div class="breadcrumb-elements-item dropdown p-0">-->
            <!--                    <a href="#" class="breadcrumb-elements-item dropdown-toggle" data-toggle="dropdown">-->
            <!--                        Dropdown-->
            <!--                    </a>-->

            <!--                    <div class="dropdown-menu">-->
            <!--                        <a href="#" class="dropdown-item">Action</a>-->
            <!--                        <a href="#" class="dropdown-item">Another action</a>-->
            <!--                        <a href="#" class="dropdown-item">One more action</a>-->
            <!--                        <div class="dropdown-divider"></div>-->
            <!--                        <a href="#" class="dropdown-item">Separate action</a>-->
            <!--                    </div>-->
            <!--                </div>-->
            <!--            </div>-->
        </div>
    </div>
</template>

<script>
    export default {
        name: 'MainBreadcrumb',
    }
</script>
