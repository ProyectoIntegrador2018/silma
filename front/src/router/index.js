import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";

import RegisterReader from "@/views/reader/ReaderRegister.vue";
import RegisterWriter from "@/views/writer/WriterRegister.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: '/Registro_Lector',
    name: 'RegisterReader',
    component: RegisterReader
  },
  {
    path: "/Registro_Escritor",
    name: "RegisterWriter",
    component: RegisterWriter
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
