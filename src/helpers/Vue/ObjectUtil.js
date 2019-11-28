import Vue from 'vue'

Vue.mixin({
    methods: {
        objectIsEmpty(object) {
            return Object.entries(object).length === 0
        },
        sortingObjectResults(object, prop, sortType = 'asc') {
            object.sort(function(a, b) {
                if (sortType === 'asc') {
                    return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
                } else if (sortType === 'desc') {
                    return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
                }
            });
        },
    },
});
