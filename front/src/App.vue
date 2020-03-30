<template>
  <v-app id="app">
    <router-view />
  </v-app>
</template>
<script>
import axios from "axios";

export default {
  async mounted() {
    const response = await axios.get("http://localhost:3000");
    console.log(response.data);
  }
};
</script>
<style>
</style>
