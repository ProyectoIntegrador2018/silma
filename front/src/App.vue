<template>
  <v-app id="app">
    <v-toolbar
      v-if="userId"
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
      max-height="65"
    >
      <v-btn icon @click="navigate()">
        <v-icon>{{$router.currentRoute.path === '/' ? 'mdi-home' : 'mdi-arrow-left'}}</v-icon>
      </v-btn>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">{{this.name}}</span>
      </v-toolbar-title>
      <v-spacer />
      <typeOfUserSelection />
    </v-toolbar>
    <router-view />
  </v-app>
</template>
<script>
import typeOfUserSelection from "@/components/typeOfUserSelection.vue";

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
  watch:{
    $route (to, from) {
      this.updateCookies();
    }
  },
  methods: {
    navigate() {
      if (this.$router.currentRoute.path === '/') {
        this.$router.go();
      } else {
        this.$router.go(-1);
      }
    },
    updateCookies() {
      this.userId = this.$cookies.get("user_id");
      this.role = this.$cookies.get("user_type");
      this.name = this.$cookies.get("user_name");
    }
  }
};
</script>
<style>
</style>
