<template>
  <v-app id="app">
    <v-toolbar v-if="userId" color="blue darken-3" dark max-height="65">
      <!-- Home button -->
      <v-btn icon @click="navigate()">
        <v-icon>{{$router.currentRoute.path === '/' ? 'mdi-home' : 'mdi-arrow-left'}}</v-icon>
      </v-btn>
      <!-- User name -->
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">{{this.name}}</span>
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
      >Cerrar Sesión</v-btn>
    </v-toolbar>
    <router-view />
  </v-app>
</template>

<script>
import typeOfUserSelection from "@/components/typeOfUserSelection.vue";
import { cleanAuthCookies } from "@/utils/cookies";

export default {
  components: {
    typeOfUserSelection
  },
  data() {
    return {
      userId: undefined,
      role: undefined,
      name: undefined
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
    }
  }
};
</script>
<style>
</style>
