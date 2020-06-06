<template>
  <v-app id="inspire">
    <v-content>
      <div align="center">
        <br />
        <br />
        <h1>¡Bienvenido a Silma!</h1>
        <writerDashboard v-if="this.role == 'writer'" />
        <readerDashboard v-if="this.role == 'reader'" />
        <adminDashbaord v-if="this.role == 'admin'" />
      </div>
    </v-content>
  </v-app>
</template>

<script>
import readerDashboard from "@/components/dashboardReader.vue";
import writerDashboard from "@/components/dashboardWriter.vue";
import adminDashbaord from "@/components/dashboardAdmin.vue";

export default {
  components: {
    writerDashboard,
    readerDashboard,
    adminDashbaord,
  },
  data() {
    return {
      role: this.$cookies.get("user_type"),
    };
  },
  methods: {},
};
</script>
