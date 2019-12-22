import Vue from 'vue'
import CxltToastr from 'cxlt-vue2-toastr'
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'

// Add plugin to vue
Vue.use(CxltToastr, {
    position: 'top left',
    showDuration: 2000
});
