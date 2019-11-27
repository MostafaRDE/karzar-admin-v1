import Vue from 'vue'

Vue.mixin({
    methods: {
        autoGrowTextarea(element) {
            element.target.style.height = "5px";
            element.target.style.height = `${element.target.scrollHeight}px`
        },
    }
});