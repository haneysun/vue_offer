import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from'./store/index';
import './assets/css/global.css'
import api from './services/api'

window.api = api;
Vue.use(ElementUI);
//消息提示


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
