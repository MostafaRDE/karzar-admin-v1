<template>
    <div class="table-responsive">
        <table class="table">
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
        name: 'RSTable'
    }
</script>
