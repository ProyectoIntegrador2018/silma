import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "vuetify/dist/vuetify.min.css";
import vuetify from "@/plugins/vuetify";
import vueCookies from "vue-cookies";
import AsyncComputed from 'vue-async-computed'

Vue.config.productionTip = false;
Vue.use(vueCookies);
Vue.use(AsyncComputed)

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount("#app");
