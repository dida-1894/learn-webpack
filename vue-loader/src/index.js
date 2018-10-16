import Vue from 'vue'
import App from './App.vue'

import './asset/image/3560.jpg'
import './asset/style/global.styl'

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  render : (h) => h(App)
}).$mount(root)
