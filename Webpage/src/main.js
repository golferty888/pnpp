import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios';

/* components */
import nav from './components/home_navbar'
import Console from './pages/console'
import appliance from './components/appliance'

Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.prototype.$http = axios;

/*create route here */
const routes = [
  { path: '/', component: Console},
  { path: '/nav', component: nav},
  { path: '/app', component: appliance}
]
// /* eslint-disable */
const router = new VueRouter({ mode : 'history', routes })

// /* eslint-disable */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

