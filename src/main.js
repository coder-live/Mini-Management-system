import Vue from 'vue';
// 引用elem ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue';
import router from './router';
import store from './store';
//引入axios封装的模块
// import {request} from './network/request';
// console.log(request);

// Vue.prototype.$axios= request;

Vue.use(ElementUI);

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
