<template>
  <v-container>
    <div class="display-3 font-weight-medium" align="center">
      {{ this.text.title }}
    </div>
    <br />
    <p align="center">Capítulos mostrados: {{ this.chaptersRequired }}</p>

    <v-card>
      <v-card-title class="grey lighten-4"
        >{{ this.text.description }}
      </v-card-title>
      <v-card-text id="commonMarkHTML" v-html="data"></v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="blue darken-1" color="white" text @click="moreChapters"
          >Pedir más capítulos</v-btn
        >
        <v-btn
          class="green darken-2"
          color="white"
          text
          :href="'/Cuestionario_de_lectura/' + this.suggestionId"
          >Llenar retroalimentación</v-btn
        >
      </v-card-actions>
    </v-card>
    <br />
    <!-- Dialogo para mostrar la actualizacion al pedir mas capitulos -->
    <v-dialog v-model="dialogUpdate" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">{{ errorMessage.title }}</v-card-title>
        <v-card-text>{{ errorMessage.message }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="gray darken-1" text @click="dialogUpdate = false"
            >Entendido</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { getRequest, postRequest } from "@/utils/requests";
import { markdownToHTML, readChapters } from "@/utils/functions";
import { updateChaptersMax, updateChapters } from "@/utils/constants";

export default {
  components: {},
  data() {
    return {
      title: "Cargando..",
      suggestionId: this.$route.params.id,
      suggestion: "",
      text: "",
      allChapters: "",
      data: "",
      chaptersRequired: "Cargando..",
      chaptersTotal: 0,
      dialogUpdate: false,
      errorMessage: {
        title: "",
        text: ""
      }
    };
  },
  asyncComputed: {
    //Funcion que regresa los muestra la visualizacion de los capitulos al cargar la pagina
    async visualizeChapters() {
      const token = this.$cookies.get("token");
      this.suggestion = await getRequest(
        `suggestions/${this.suggestionId}`,
        token
      );
      this.text = this.suggestion.text;

      const response = await getRequest(
        `/texts/${this.text._id}/uploads`,
        token
      );

      this.allChapters = response.message;
      this.chaptersRequired = this.suggestion.readingChapters;
      this.chaptersTotal = this.text.numberOfChapters;
      this.cropChapters();
    }
  },
  methods: {
    //Funcion para pedir 5 capitulos mas a los previamente registrados
    async moreChapters() {
      if (this.chaptersRequired >= this.chaptersTotal) {
        //Si ya se cuenta con el escrito completo, se muestra un dialogo indicandolo
        this.errorMessage = updateChaptersMax;
        this.dialogUpdate = true;
        return;
      }
      //Si se cuentan con menos de 5 capitulos extra disponible, se pide el escrito completo
      if (this.chaptersRequired + 5 > this.chaptersTotal) {
        this.chaptersRequired = this.chaptersTotal;
      } else {
        //Si se cuenta con 5 capitulos extra disponible o mas, se piden 5
        this.chaptersRequired = this.chaptersRequired + 5;
      }
      const token = this.$cookies.get("token");

      this.suggestion.readingChapters = this.chaptersRequired;
      await postRequest(
        `suggestions/${this.suggestion._id}/requestChapters`,
        this.suggestion,
        token
      );
      this.cropChapters();
      this.errorMessage = updateChapters;
      this.dialogUpdate = true;
      return;
    },
    //Funcion que muestra el numero de capitulos solicitados en la sugerencia
    async cropChapters() {
      var currentChapters = [];
      if (this.chaptersRequired <= this.chaptersTotal) {
        currentChapters = readChapters(this.allChapters)
          .slice(0, this.chaptersRequired)
          .toString();
      } else {
        currentChapters = this.allChapters;
      }
      this.data = markdownToHTML(currentChapters);
    }
  }
};
</script>

<style scoped></style>
