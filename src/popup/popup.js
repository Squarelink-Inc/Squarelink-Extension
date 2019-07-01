import Vue from 'vue'
import App from './App'
import Toasted from 'vue-toasted'
import store from '@/store'
import '@/style/main.sass'
import { VueLadda } from '@/components'

global.browser = require('webextension-polyfill');

Vue.prototype.$browser = global.browser;

Vue.component('ladda', VueLadda)

Vue.use(Toasted, {
  theme: 'bubble',
  position: 'top-right',
  iconPack: 'fontawesome',
  icon: 'check-circle',
  duration : 1200
})

Vue.directive('click-outside', {
  bind(el, binding, vnode) {
    //eslint-disable-next-line
    el.clickOutsideEvent = function (event) {
      if (!(el == event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event)
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App),
});
