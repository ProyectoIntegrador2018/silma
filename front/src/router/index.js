import Vue from "vue";
import VueRouter from "vue-router";
import RegisterReader from "@/views/reader/ReaderRegister.vue";
import RegisterWriter from "@/views/writer/WriterRegister.vue";
import LogIn from "@/views/login/LogIn.vue";
import Dashboard from "@/views/dashboards/Dashboard.vue";
import Inventory from "@/views/inventory/Inventory.vue";
import PageNotFound from "@/views/PageNotFound.vue";
import Users from "@/views/admins/Users.vue";
import RoleSet from "@/views/admins/RoleSet.vue";
import GenreList from "@/views/admins/GenreList.vue";
import GenreForm from "@/views/admins/GenreForm.vue";
import TextRegister from "@/views/writer/TextRegister.vue";
import Questionnarie from "@/views/reader/Questionnarie.vue";
import SuggestionsAdmin from "@/views/admins/SuggestionsAdmin.vue";
import ChaptersVisualization from "@/views/reader/VisualizationChapters.vue";
import RoleList from "@/views/admins/RoleList.vue";
import RoleForm from "@/views/admins/RoleForm.vue";
import Feedback from "@/views/admins/Feedbacks.vue";
import { cleanAuthCookies } from "@/utils/cookies";
import PointOfSaleList from "@/views/admins/PointOfSaleList.vue";
import PointOfSaleForm from "@/views/admins/PointOfSaleForm.vue";
import Inventories from "@/views/admins/Inventories.vue";
import SalesList from "@/views/admins/SalesList.vue";
import SalesForm from "@/views/admins/SalesForm.vue";
import EventForm from "@/views/admins/EventForm.vue";
import EventList from "@/views/admins/EventList.vue";
import Reports from "@/views/admins/Reports.vue";
import MyBooks from "@/views/writer/MyBooks.vue";
import ReadBooks from "@/views/reader/ReadBooks.vue";
import SalesReports from "@/views/admins/SalesReports.vue";
import TimesPhase from "@/views/admins/TimesPhase.vue";


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
    path: "/Agregar_Escrito/:id",
    name: "TextRegisterByID",
    component: TextRegister,
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
      withAccess: ["admin"],
      permission: "roleRead"
    }
  },
  {
    path: "/roleFormCreate",
    name: "RoleFormCreate",
    component: RoleForm,
    meta: {
      requiresAuth: true,
      withAccess: ["admin"],
      permission: "roleCreate"
    },
    props: { viewMode: false }
  },
  {
    path: "/roleFormView/:id",
    name: "RoleFormView",
    component: RoleForm,
    meta: {
      requiresAuth: true,
      withAccess: ["admin"],
      permission: "roleRead"
    },
    props: { viewMode: true }
  },
  {
    path: "/roleForm/:id",
    name: "RoleFormEdit",
    component: RoleForm,
    meta: {
      requiresAuth: true,
      withAccess: ["admin"],
      permission: "roleEdit"
    },
    props: { viewMode: false }
  },
  {
    path: "/genres",
    name: "GenreList",
    component: GenreList,
    meta: {
      requiresAuth: true,
      withAccess: ["admin"],
      permission: "genreRead"
    }
  },
  {
    path: "/genre/create",
    name: "GenreFormCreate",
    component: GenreForm,
    meta: {
      requiresAuth: true,
      withAccess: ["admin"],
      permission: "genreCreate"
    },
    props: { viewMode: false }
  },
  {
    path: "/genre/view/:id",
    name: "GenreFormView",
    component: GenreForm,
    meta: {
      requiresAuth: true,
      withAccess: ["admin"],
      permission: "genreRead"
    },
    props: { viewMode: true }
  },
  {
    path: "/genre/edit/:id",
    name: "GenreFormEdit",
    component: GenreForm,
    meta: {
      requiresAuth: true,
      withAccess: ["admin"],
      permission: "genreEdit"
    },
    props: { viewMode: false }
  },
  {
    path: "/pointOfSale",
    name: "PointOfSale",
    component: PointOfSaleList,
    meta: {
      requiresAuth: true,
      withAccess: ["admin"],
      permission: "pointOfSaleRead"
    }
  },
  {
    path: "/pointofsale/create",
    name: "PointOfSaleCreate",
    component: PointOfSaleForm,
    meta: {
      requiresAuth: true,
      withAccess: ["admin"],
      permission: "pointOfSaleCreate"
    },
    props: { viewMode: false }
  },
  {
    path: "/pointofsale/view/:id",
    name: "PointOfsaleFormView",
    component: PointOfSaleForm,
    meta: {
      requiresAuth: true,
      withAccess: ["admin"],
      permission: "pointOfSaleRead"
    },
    props: { viewMode: true }
  },
  {
    path: "/pointofsale/edit/:id",
    name: "PointOfsaleFormEdit",
    component: PointOfSaleForm,
    meta: {
      requiresAuth: true,
      withAccess: ["admin"],
      permission: "pointOfSaleEdit"
    },
    props: { viewMode: false }
  },
  {
    path: "/event",
    name: "Event",
    component: EventList,
    meta: {
      requiresAuth: true,
      withAccess: ["admin"],
      permission: "eventRead"
    }
  },
  {
    path: "/event/create",
    name: "EventCreate",
    component: EventForm,
    meta: {
      requiresAuth: true,
      withAccess: ["admin"],
      permission: "eventCreate"
    },
    props: { viewMode: false }
  },
  {
    path: "/event/view/:id",
    name: "EventrmView",
    component: EventForm,
    meta: {
      requiresAuth: true,
      withAccess: ["admin"],
      permission: "eventRead"
    },
    props: { viewMode: true }
  },
  {
    path: "/event/edit/:id",
    name: "EventFormEdit",
    component: EventForm,
    meta: {
      requiresAuth: true,
      withAccess: ["admin"],
      permission: "eventEdit"
    },
    props: { viewMode: false }
  },
  {
    path: "/inventario/:id",
    name: "Inventario",
    component: Inventory,
    meta: {
      requiresAuth: true,
      withAccess: ["writer", "admin"]
    }
  },
  {
    path: "/inventarios",
    name: "Inventarios",
    component: Inventories,
    meta: {
      requiresAuth: true,
      withAccess: ["admin"]
    }
  },
  {
    path: "/tiempos",
    name: "Tiempos",
    component: TimesPhase,
    meta: {
      requiresAuth: true,
      withAccess: ["admin"],
    },
  },
  {
    path: "/reports",
    name: "Reports",
    component: Reports,
    meta: {
      requiresAuth: true,
      withAccess: ["admin"],
      permission: "reportsRead"
    },
    props: { viewMode: true }
  },
  {
    path: "/salesReports",
    name: "SalesReports",
    component: SalesReports,
    meta: {
      requiresAuth: true,
      withAccess: ["admin"],
      permission: "saleRead"
    }
  },
  {
    path: "/myBooks",
    name: "MyBooks",
    component: MyBooks,
    meta: {
      requiresAuth: true,
      withAccess: ["writer"],
    }
  },
  {
    path: "/readBooks",
    name: "ReadBooks",
    component: ReadBooks,
    meta: {
      requiresAuth: true,
      withAccess: ["reader"],
    }
  },
  {
    path: "/sales",
    name: "Sales",
    component: SalesList,
    meta: {
      requiresAuth: true,
      withAccess: ["admin"],
      permission: "saleRead"
    }
  },
  {
    path: "/sales/create",
    name: "SalesCreate",
    component: SalesForm,
    meta: {
      requiresAuth: true,
      withAccess: ["admin"],
      permission: "saleCreate"
    },
    props: { viewMode: false }
  },
  {
    path: "/sales/view/:id",
    name: "salesFormView",
    component: SalesForm,
    meta: {
      requiresAuth: true,
      withAccess: ["admin"],
      permission: "saleRead"
    },
    props: { viewMode: true }
  },
  {
    path: "/sales/edit/:id",
    name: "salesFormEdit",
    component: SalesForm,
    meta: {
      requiresAuth: true,
      withAccess: ["admin"],
      permission: "saleEdit"
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
  const role = Vue.$cookies.get("role");
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiredPermission = to.meta.permission;
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

  // If user doesn't has access, close session and redirect to login
  if (
    (requiresAuth && !hasAccess) ||
    (requiredPermission && !role[requiredPermission])
  ) {
    cleanAuthCookies();
    next("Iniciar_Sesion");
    return;
  }
  next();
});

export default router;
