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
        },
        sortingCategoriesMode(array, parentKeyEmptyValue = null, parentKey = 'parent_id') {
            let getChildren = function (id) {
                let children = array.filter(child => child[parentKey] === id);

                if (children !== [])
                    for (let i = 0; i < children.length; i++)
                        children[i].children = getChildren(children[i].id);
                else
                    return children;
            }

            let parents = array.filter(child => child[parentKey] === parentKeyEmptyValue)
            for (let i = 0; i < parents.length; i++)
                parents[i].children = getChildren(parents[i].id)

            return parents;
        }
    }
});
