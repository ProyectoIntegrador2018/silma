import Vue from "vue";
import VueRouter from "vue-router";
import RegisterReader from "@/views/reader/ReaderRegister.vue";
import RegisterWriter from "@/views/writer/WriterRegister.vue";
import LogIn from "@/views/login/LogIn.vue";
import Dashboard from "@/views/dashboards/DashboardWriter.vue";
import PageNotFound from "@/views/PageNotFound.vue";
import Genres from "@/views/admins/Genres.vue";
import TextRegister from "@/views/writer/TextRegister.vue";

Vue.use(VueRouter);

const routes = [
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
  {
    path: "/Iniciar_Sesion",
    name: 'LogIn',
    component: LogIn
  },
  {
    path: "/Agregar_Escrito",
    name: 'TextRegister',
    component: TextRegister,
    meta: {
      requiresAuth: true,
      withAccess: ["admin","writer"]
      // NOTE: Use 'withAccess' for pages that can only be accessed by certain users.
    }
  },
  {
    path: "/Generos",
    name: 'Genres',
    component: Genres,
    meta: {
      requiresAuth: true,
      withAccess: ["admin"]
    }
  },
  {
    path: "/",
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
      withAccess: ["admin", "reader", "writer"]
      // NOTE: Use 'withAccess' for pages that can only be accessed by certain users.
    }
  },
  {
    path: "*",
    component: PageNotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  // Redirect when authentication is required and token is not provided.
  // TODO: Add validation with API.
  const token = Vue.$cookies.get('token');
  const userType = Vue.$cookies.get('user_type');
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth && (!token || !userType)) {
    next('Iniciar_Sesion');
    return;
  }
  // Redirect users with no access to the provided routes.
  const withAccess = to.matched.map((record) => record.meta.withAccess || ["admin", "writer", "reader"]);
  const hasAccess = withAccess.some((accessTypes) =>
    accessTypes.some(accessType => accessType === userType)
  );
  if (requiresAuth && !hasAccess) {
    next('Iniciar_Sesion');
    return;
  }
  next();
});

export default router;
