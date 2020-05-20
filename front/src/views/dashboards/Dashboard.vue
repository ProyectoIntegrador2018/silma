<template>
  <v-app id="inspire">
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-btn icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">{{this.name}}</span>
      </v-toolbar-title>

      <v-spacer />
      <typeOfUserSelection />
    </v-app-bar>
    <v-content>
      <div align="center">
        <br />
        <br />
        <h1>¡Bienvenido a Silma! </h1>
        <writerDashboard v-if="this.role == 'writer'" />
      </div>
    </v-content>
  </v-app>
</template>

<script>
import typeOfUserSelection from "@/components/typeOfUserSelection.vue";
import writerDashboard from "@/components/dashboardWriter.vue";
export default {
  components: {
    typeOfUserSelection,
    writerDashboard,
  },
  data() {
    return {
      writer: this.$cookies.get("user_id"),
      role: this.$cookies.get("user_type"),
      name: this.$cookies.get("user_name"),
      number: 2,
    }
  },
  methods: {

  },
};
</script>
