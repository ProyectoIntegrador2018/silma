<template>
  <div>
    <h1 align="left">Textos Recibidos</h1>
    <Table :headers="headers" :items="dataTexts">
      <!-- Actions -->
      <template #actions="{ props }">
        <div style="padding-top: 5px">
          <v-btn small color="primary" depressed @click="seeSuggestions(props)">Sugerencias</v-btn>
        </div>
        <div style="padding-top: 5px">
          <v-btn small color="success" depressed @click="advancePhase(props)">Avanzar Fase</v-btn>
        </div>
        <div style="padding-top: 5px">
          <v-btn small color="error" depressed @click="rejectText(props)">Rechazar</v-btn>
        </div>
      </template>
    </Table>
  </div>
</template>


<script>
import Table from "@/components/table.vue";
import { getRequest } from "@/utils/requests";

export default {
  components: {
    Table
  },
  data() {
    return {
      headers: [
        { text: "Título", align: "start", sortable: false, value: "title" },
        {
          text: "Número de Registro",
          align: "start",
          sortable: false,
          value: "registerNumber"
        },
        {
          text: "Descripción",
          align: "start",
          sortable: false,
          value: "description"
        },
        { text: "Generos", align: "start", sortable: false, value: "genres" },
        {
          text: "Rango de Edades",
          align: "start",
          sortable: false,
          value: "ageRange"
        },
        {
          text: "Número de Páginas",
          align: "start",
          sortable: false,
          value: "numberOfPages"
        },
        {
          text: "Número de Capitulos",
          align: "start",
          sortable: false,
          value: "numberOfChapters"
        },
        { text: "Fase", align: "start", sortable: false, value: "phase" },
        { text: "Acciones", actions: true, sortable: false }
      ],
      dataTexts: []
    };
  },
  asyncComputed: {
    async getTexts() {
      const token = this.$cookies.get("token");
      var data = await getRequest("texts/", token);
      var genreNames = "";
      data.forEach(book => {
        book.genres.forEach(element => {
          if (genreNames == "") {
            genreNames = element.name;
          } else {
            genreNames = genreNames + ", " + element.name;
          }
        });
        book.genres = genreNames;
      });
      this.dataTexts = data;
    }
  },
  methods: {
    seeSuggestions(item) {
      var id = item._id
      this.$router.push('/Sugerencias_Texto/' +id);
    },
    advancePhase(item){
      console.log(item)

    },
    rejectText(item){
      console.log(item)

    }
  }
};
</script>
