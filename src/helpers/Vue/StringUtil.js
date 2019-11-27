import Vue from 'vue'

Vue.mixin({
    methods: {
        copyText(str) {
            // Create new element
            let el = document.createElement('textarea');
            // Set value (string to be copied)
            el.value = str;
            // Set non-editable to avoid focus and move outside of view
            el.setAttribute('readonly', '');
            el.style = {position: 'absolute', left: '-9999px'};
            document.body.appendChild(el);
            // Select text inside element
            el.select();

            let result;
            try {
                // Copy text to clipboard
                document.execCommand('copy');

                result = true;
            } catch (e) {
                result = false;
            } finally {
                // Remove temporary element
                document.body.removeChild(el);
            }

            return result;

        },
        moneyFormat() {

        },

    },
});