<template>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">
          {{ role }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "Escritor" },
        { title: "Lector" },
        { title: "Administrador" },
      ],
      role: this.$cookies.get("user_type")=="writer"? 'Escritor': 
      this.$cookies.get("user_type")=="reader"? 'Lector': 'Administrador'
    };
  },
};
</script>
