<template>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon
          v-on="on"
        >
        <v-icon>mdi-bell</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
  export default {
    data: () => ({
      items: [
        { title: 'Uno de tus títulos ha sido actualizado. 12/03/2020' },
        { title: '¡Conoce nuestra política de confidencialidad!' },
        { title: '¿Tienes alguna idea lista? Agrega un nuevoescrito' },
      ],
    }),
  }
</script>
