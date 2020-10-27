import Vue from "vue";
import VueRouter from "vue-router";
import RegisterReader from "@/views/reader/ReaderRegister.vue";
import RegisterWriter from "@/views/writer/WriterRegister.vue";
import LogIn from "@/views/login/LogIn.vue";
import Dashboard from "@/views/dashboards/Dashboard.vue";
import PageNotFound from "@/views/PageNotFound.vue";
import Users from "@/views/admins/Users.vue";
import RoleSet from "@/views/admins/RoleSet.vue";
import Genres from "@/views/admins/Genres.vue";
import TextRegister from "@/views/writer/TextRegister.vue";
import Questionnarie from "@/views/reader/Questionnarie.vue";
import SuggestionsAdmin from "@/views/admins/SuggestionsAdmin.vue";
import ChaptersVisualization from "@/views/reader/VisualizationChapters.vue";
import RoleList from "@/views/admins/RoleList.vue";
import RoleForm from "@/views/admins/RoleForm.vue";
import Feedback from "@/views/admins/Feedbacks.vue";

Vue.use(VueRouter);
// NOTE: Use 'withAccess' for pages that can only be accessed by certain users.
const routes = [
  {
    path: "/Registro_Lector",
    name: "RegisterReader",
    component: RegisterReader
  },
  {
    path: "/Registro_Escritor",
    name: "RegisterWriter",
    component: RegisterWriter
  },
  {
    path: "/Iniciar_Sesion",
    name: "LogIn",
    component: LogIn
  },
  {
    path: "/Agregar_Escrito",
    name: "TextRegister",
    component: TextRegister,
    meta: {
      requiresAuth: true,
      withAccess: ["writer"]
    }
  },
  {
    path: "/Generos",
    name: "Genres",
    component: Genres,
    meta: {
      requiresAuth: true,
      withAccess: ["admin"]
    }
  },
  {
    path: "/Usuarios",
    name: "Users",
    component: Users,
    meta: {
      requiresAuth: true,
      withAccess: ["admin"]
    }
  },
  {
    path: "/RoleSet/:id",
    name: "RoleSet",
    component: RoleSet,
    meta: {
      requiresAuth: true,
      withAccess: ["admin"]
    }
  },
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true,
      withAccess: ["admin", "reader", "writer"]
    }
  },
  {
    path: "/Cuestionario_de_lectura/:id",
    name: "Questionnarie",
    component: Questionnarie,
    meta: {
      requiresAuth: true,
      withAccess: ["reader"]
    }
  },
  {
    path: "/Sugerencias_Texto/:id",
    name: "SuggestionsAdmin",
    component: SuggestionsAdmin,
    meta: {
      requiresAuth: true,
      withAccess: ["admin"]
    }
  },
  {
    path: "/Mis_Lecturas/:id",
    name: "ChaptersVisualization",
    component: ChaptersVisualization,
    meta: {
      requiresAuth: true,
      withAccess: ["reader"]
    }
  },
  {
    path: "/Retroalimentacion/:id",
    name: "Feedback",
    component: Feedback,
    meta: {
      requiresAuth: true,
      withAccess: ["admin"]
    }
  },
  {
    path: "/roleList",
    name: "RoleList",
    component: RoleList,
    meta: {
      requiresAuth: true,
      withAccess: ["admin"]
    }
  },
  {
    path: "/roleFormCreate",
    name: "RoleFormCreate",
    component: RoleForm,
    meta: {
      requiresAuth: true,
      withAccess: ["admin"]
    },
    props: { viewMode: false }
  },
  {
    path: "/roleFormView/:id",
    name: "RoleFormView",
    component: RoleForm,
    meta: {
      requiresAuth: true,
      withAccess: ["admin"]
    },
    props: { viewMode: true }
  },
  {
    path: "/roleForm/:id",
    name: "RoleFormEdit",
    component: RoleForm,
    meta: {
      requiresAuth: true,
      withAccess: ["admin"]
    },
    props: { viewMode: false }
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
  const token = Vue.$cookies.get("token");
  const userType = Vue.$cookies.get("user_type");
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth && (!token || !userType)) {
    next("Iniciar_Sesion");
    return;
  }
  // Redirect users with no access to the provided routes.
  const withAccess = to.matched.map(
    (record) => record.meta.withAccess || ["admin", "writer", "reader"]
  );
  const hasAccess = withAccess.some((accessTypes) =>
    accessTypes.some((accessType) => accessType === userType)
  );
  if (requiresAuth && !hasAccess) {
    next("Iniciar_Sesion");
    return;
  }
  next();
});

export default router;
