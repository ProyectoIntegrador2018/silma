import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "vuetify/dist/vuetify.min.css";
import vuetify from "@/plugins/vuetify";
import vueCookies from "vue-cookies";

Vue.config.productionTip = false;
Vue.use(vueCookies);

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount("#app");
