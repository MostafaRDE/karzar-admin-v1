import Vue from 'vue'

Vue.mixin({
    methods: {
        createQRCodeWithGoogleApi(data, width = 150, height = 150, type = 'qr', choe = 'UTF-8') {
            return `https://chart.googleapis.com/chart?chs=${width}x${height}&cht=${type}&chl=${data}&choe=${choe}`
        }
    }
});