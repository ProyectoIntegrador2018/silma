<template>
  <div class="ma-4">
    <h2 v-if="status">Tus Sugerencias</h2>
    <h2 v-else>Tu Lectura</h2>
    <br>
    <v-card
      class="mx-auto"
      max-width="344"
    >
      <v-card-title>
        Titulo
      </v-card-title>
      <v-card-subtitle>
        I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
      </v-card-subtitle>
      <v-card-actions v-if="status">
        <v-btn color="green" text>Aceptar</v-btn>
        <v-btn color="red" text>Rechazar</v-btn>
      </v-card-actions>
      <v-card-actions v-else>
        <v-btn color="purple" text>Continuar lectura</v-btn>
      </v-card-actions>
    </v-card>
     <br>
    <h2>Tus Historial de lecturas</h2>
     <br>
    <Table :headers="headers" :items="data"> </Table>
  </div>
</template>

<script>
import Table from "@/components/table.vue";
import { getRequest } from '@/utils/requests';

export default {
  components: {
    Table,
  },
  data() {
    return {
      headers: [
        { text: "Título", align: "start", value: "title",},
        { text: "Calificación", value: "score" },
        { text: "Estado", value: "suggestionStatus", color: "red" },
      ],
      data: [],
      reader: this.$cookies.get("user_id"),
      role: this.$cookies.get("user_type"),
      show: false,
      status: true
    };
  },
  created() {
  },
  asyncComputed: {
      async getSuggestion(){
        const token = this.$cookies.get('token');
        this.data = await getRequest(`texts/writer/${this.writer}`, token);
      }
  },
  methods: {
    
  }
};
</script>
