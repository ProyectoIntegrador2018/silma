<template>
  <div class="background" style="height: 100vh; overflow: hidden">
    <v-card
      elevation="10"
      style="margin-right: 10%; margin-left: 10%; margin-top: 10%; height: 100vh"
    >
      <v-img
        src="not-found.png"
        width="300"
        position="center center"
        style="margin: auto;"
      ></v-img>
      <p
        class="display-4 font-weight-medium blue-grey--text text--darken-4 text-center mb-6"
      >
        Error 404
      </p>
      <p class="display-1 blue-grey--text text--darken-3 text-center">
        Pagina no encontrada
      </p>
    </v-card>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.background {
  background-color: rgb(245, 245, 245);
}
</style>
