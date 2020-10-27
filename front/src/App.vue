<template>
  <v-app id="app">
    <v-progress-linear
      v-if="globalLoading"
      class="global-loading"
      indeterminate
    ></v-progress-linear>
    <v-toolbar v-if="userId" color="blue darken-3" dark max-height="65">
      <!-- Home button -->
      <v-btn icon @click="navigate()">
        <v-icon>{{
          $router.currentRoute.path === "/" ? "mdi-home" : "mdi-arrow-left"
        }}</v-icon>
      </v-btn>
      <!-- User name -->
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">{{ this.name }}</span>
      </v-toolbar-title>
      <v-spacer />
      <typeOfUserSelection />
      <!-- Log out -->
      <v-btn
        outlined
        small
        text
        @click="logOut()"
        style="margin-left: 16px; height: 48px;"
        >Cerrar Sesión</v-btn
      >
    </v-toolbar>
    <div class="main-container">
      <router-view />
    </div>
    <v-snackbar v-model="showSnackbar">
      {{ snackbarMessage }}
      <v-btn color="pink" text @click="showSnackbar = false">
        Cerrar
      </v-btn>
    </v-snackbar>
    <DialogComponent ref="warningDialog"></DialogComponent>
  </v-app>
</template>

<script>
import typeOfUserSelection from "@/components/typeOfUserSelection.vue";
import { cleanAuthCookies } from "@/utils/cookies";
import { events } from "./main";
import DialogComponent from "./components/dialogComponent";

export default {
  components: {
    typeOfUserSelection,
    DialogComponent
  },
  data() {
    return {
      userId: undefined,
      role: undefined,
      name: undefined,
      showSnackbar: false,
      snackbarMessage: "",
      globalLoading: false
    };
  },
  created() {
    this.updateCookies();
  },
  watch: {
    // Based on when the route changes, update cookies to see if changes need to be made.
    $route(to, from) {
      this.updateCookies();
    }
  },
  methods: {
    navigate() {
      // Navigates back when not in home.
      if (this.$router.currentRoute.path === "/") {
        this.$router.go();
      } else {
        this.$router.go(-1);
      }
    },
    updateCookies() {
      this.userId = this.$cookies.get("user_id");
      this.role = this.$cookies.get("user_type");
      this.name = this.$cookies.get("user_name");
    },
    async logOut() {
      // Clear all the cookies (including the token).
      cleanAuthCookies();
      // Reload page for redirect.
      this.$router.go();
    },
    snackbar(message) {
      this.snackbarMessage = message;
      this.showSnackbar = true;
    }
  },
  mounted() {
    events.$on("snackbar", (message) => {
      this.snackbar(message);
    });
    events.$on("dialog", (options) => {
      this.$refs.warningDialog.open(options);
    });
    events.$on("globalLoading", (globalLoading) => {
      this.globalLoading = globalLoading;
    });
  }
};
</script>
<style>
.main-container {
  margin: 16px;
}

.add-btn-container {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.bottom-buttons-wrapper {
  display: flex;
  justify-content: center;
  margin: 16px;
}

.bottom-buttons-wrapper > button:first-child {
  margin-right: 16px;
}

.actions-wrapper {
  display: flex;
  justify-content: space-evenly;
}

.global-loading {
  position: absolute !important;
  left: 0;
  top: 72px;
}
</style>
