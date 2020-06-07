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
        text: "",
      },
    };
  },
  asyncComputed: {
    async getSuggestion() {
      const token = this.$cookies.get("token");
      this.genres = await getRequest(`user/genres`, token);
      return this.genres;
    },
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
    },
  },
  methods: {
    async moreChapters() {
      if (this.chaptersRequired >= this.chaptersTotal) {
        this.errorMessage = updateChaptersMax;
        this.dialogUpdate = true;
        return;
      }
      if (this.chaptersRequired + 5 > this.chaptersTotal) {
        this.chaptersRequired = this.chaptersTotal;
      } else {
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
    },
  },
};
</script>

<style scoped></style>
