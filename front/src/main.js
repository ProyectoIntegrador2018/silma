import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "vuetify/dist/vuetify.min.css";
import vuetify from "@/plugins/vuetify";
import vueCookies from "vue-cookies";
import AsyncComputed from "vue-async-computed";
import axios from "axios";

Vue.config.productionTip = false;
Vue.use(vueCookies);
Vue.use(AsyncComputed);

// Set Axios global headers
axios.defaults.headers.common = {
  Authorization: `Bearer ${Vue.$cookies.get("token")}`
};

export const events = new Vue();

new Vue({
  vuetify,
  router,
  render: (h) => h(App)
}).$mount("#app");
