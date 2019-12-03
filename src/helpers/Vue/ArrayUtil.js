import Vue from 'vue'

Vue.mixin({
    methods: {
        arrayRemove(array, value) {
            return array.filter(function (element) {
                return element !== value;
            });
        },
        range(start, end) {
            return Array(end - start + 1).fill(undefined, undefined, undefined).map((_, idx) => start + idx)
        }
    }
});
