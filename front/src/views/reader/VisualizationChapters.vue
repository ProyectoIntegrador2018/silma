<template>
  <v-container>
    <div class="display-3 font-weight-medium" align="center">
      {{ this.text.title }}
    </div>
    <br />
    <p align="center">
      Capítulos mostrados: {{ this.suggestion.readingChapters }}
    </p>

    <v-card>
      <v-card-title class="grey lighten-4"
        >{{ this.text.description }}
      </v-card-title>
      <v-card-text id="commonMarkHTML" v-html="data"></v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="blue darken-1" color="white" text @click="dialog = false"
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
  </v-container>
</template>

<script>
import { getRequest } from "@/utils/requests";
import { markdownToHTML, readChapters } from "@/utils/functions";

export default {
  components: {},
  data() {
    return {
      title: "Título de la Sugerencia",
      suggestionId: this.$route.params.id,
      suggestion: "",
      text: "",
      chapters: "",
      data: "",
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
      const allChapters = response.message;
      this.chapters = readChapters(allChapters)
        .slice(0, this.suggestion.readingChapters)
        .toString();
      this.data = markdownToHTML(this.chapters);
    },
  },
  methods: {},
};
</script>

<style scoped></style>
