"use strict";

import Vue from 'vue';
import axios from "axios";

const token = localStorage.getItem("access_token");
// Full config:  https://github.com/axios/axios#request-config
axios.defaults.baseURL = process.env.SERVER_URL || process.env.apiUrl || '';
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
// axios.defaults.headers.common['App-api-key'] = `Bearer ${process.env.SERVER_API_KEY}`;
// axios.defaults.headers.post['Content-Type'] = 'application/json';


let config = {
    // baseURL: process.env.baseURL || process.env.apiUrl || ""
    // timeout: 60 * 1000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control
    // origin: '*, *',
    // headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    //     'Authorization': `Bearer ${token}`
    // },
};

const _axios = axios.create(config);

// _axios.interceptors.request.use(
//     function (config) {
//         // Do something before request is sent
//         return config;
//     },
//     function (error) {
//         // Do something with request error
//         return Promise.reject(error);
//     }
// );
//
// // Add a response interceptor
_axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response.status && error.response.status === 401) {
            window.location.assign('/login');
        }
        return Promise.reject(error);
    }
);

Plugin.install = function (Vue, options) {
    Vue.axios = _axios;
    window.axios = _axios;
    Object.defineProperties(Vue.prototype, {
        axios: {
            get() {
                return _axios;
            }
        },
        $axios: {
            get() {
                return _axios;
            }
        },
    });
};

Vue.use(Plugin)

export default Plugin;
