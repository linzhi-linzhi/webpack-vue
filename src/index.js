import "core-js/stable"
import "regenerator-runtime/runtime"

import {createApp } from 'vue'
import App from './App.vue'

import '@/index.less'

console.log(process.env.NODE_ENV)
console.log(process.env.MY_TYPE)


createApp(App).mount('#app')
