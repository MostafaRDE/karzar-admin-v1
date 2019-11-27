import Vue from 'vue'

Vue.mixin({
    methods: {
        arrayRemove(array, value) {
            return array.filter(function (element) {
                return element !== value;
            });
        }
    }
});