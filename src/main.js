import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import router from './router'
import store from './store'
import Cookies from 'js-cookie'
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false

Vue.use(Cookies)

Vue.use(Antd);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
