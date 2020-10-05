import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "vuetify/dist/vuetify.min.css";
import vuetify from "@/plugins/vuetify";
import vueCookies from "vue-cookies";
import AsyncComputed from "vue-async-computed";
import axios from "axios";
import { cleanAuthCookies } from "./utils/cookies";

Vue.config.productionTip = false;
Vue.use(vueCookies);
Vue.use(AsyncComputed);

export const events = new Vue();

// Set Axios global headers
axios.defaults.headers.common = {
  Authorization: `Bearer ${Vue.$cookies.get("token")}`
};

axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    // Log out the user when trying to access incorrect blocked resource
    if (error.response.status === 401) {
      events.$emit("snackbar", "No Autorizado.");
      cleanAuthCookies();
      router.replace("/Iniciar_Sesion");
    }
    return error;
  }
);

new Vue({
  vuetify,
  router,
  render: (h) => h(App)
}).$mount("#app");
