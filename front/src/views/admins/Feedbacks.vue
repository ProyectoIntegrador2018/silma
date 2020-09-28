<template>
  <v-container>
    <div class="display-3 font-weight-medium" align="center">
      Retroalimentación de {{ textTitle }}
    </div>
    <br />
    <v-form ref="form">
      <h2 class="primary--text">¿Debería publicarse el libro?</h2>
      <v-layout row wrap>
        <v-col cols="12" sm="8">
          <v-radio-group v-model="feedback.publish" row disabled>
            <v-radio label="Si" value="Yes" color="success"></v-radio>
            <v-radio label="No" value="No" color="success"></v-radio>
          </v-radio-group>
        </v-col>
      </v-layout>
      <h2 class="primary--text">
        La primera vez que dejaste de leer el texto, ¿en qué página te quedaste?
      </h2>
      <v-layout row wrap>
        <v-col cols="12" sm="2">
          <v-text-field
            readonly
            outlined
            v-model="feedback.page"
          ></v-text-field>
        </v-col>
      </v-layout>
      <v-layout row wrap>
        <v-col cols="12" sm="12">
          <h2 class="primary--text">
            El género del libro es (selecciona todos los que apliquen):
          </h2>
        </v-col>
        <v-col cols="12" sm="3" v-for="genres in genres" :key="genres.name">
          <v-switch
            disabled
            v-model="genresNames"
            :label="genres.name"
            color="success"
            :value="genres.name"
          ></v-switch>
        </v-col>
      </v-layout>
      <h2 class="primary--text">
        Comenta algo que te haya gustado mucho de la lectura
      </h2>
      <v-layout row wrap>
        <v-col>
          <v-textarea readonly outlined v-model="feedback.liked"></v-textarea>
        </v-col>
      </v-layout>
      <h2 class="primary--text">
        Comenta algo que no te haya gustado de la lectura
      </h2>
      <v-layout row wrap>
        <v-col>
          <v-textarea
            readonly
            outlined
            v-model="feedback.disliked"
          ></v-textarea>
        </v-col>
      </v-layout>
      <h2 class="primary--text">
        Mi personaje favorito fue (coméntanos por qué)
      </h2>
      <v-layout row wrap>
        <v-col>
          <v-textarea
            readonly
            outlined
            v-model="feedback.goodCharacter"
          ></v-textarea>
        </v-col>
      </v-layout>
      <h2 class="primary--text">
        El personaje que menos me gusto fue (coméntanos por qué)
      </h2>
      <v-layout row wrap>
        <v-col>
          <v-textarea
            readonly
            outlined
            v-model="feedback.badCharacter"
          ></v-textarea>
        </v-col>
      </v-layout>
      <h2 class="primary--text">
        En general el libro, No me gustó (1) - Lo amé (10)
      </h2>
      <v-layout row wrap>
        <v-col cols="12" sm="8">
          <v-radio-group v-model="feedback.grade" row disabled>
            <v-radio
              v-for="index in 10"
              :key="index"
              :label="String(index)"
              :value="index"
              color="success"
            ></v-radio>
          </v-radio-group>
        </v-col>
      </v-layout>
    </v-form>
  </v-container>
</template>

<script>
import { getRequest } from "@/utils/requests";

export default {
  data() {
    return {
      feedback: {},
      genresNames: [],
      genres: [],
      token: this.$cookies.get("token"),
      textTitle: ""
    };
  },
  async created() {
    //Funciones que se llaman al iniciar la vista
    await this.getGenres();
    await this.getFeedback();
  },
  methods: {
    //Funcion que se encarga de traducir el nombre de el ID al nombre del genero
    preferenceId(preference) {
      for (const genre of this.genres) {
        if (preference == genre._id) {
          return genre.name;
        }
      }
    },
    //Funcion que llama todos los generos
    async getGenres() {
      const genres = await getRequest("/user/genres", this.token);
      return (this.genres = genres);
    },
    //Funcion que llama el feedback al cual se esta entrando especificamente
    async getFeedback() {
      const feedback = await getRequest(
        "/admins/feedback/" + this.$route.params.id,
        this.token
      );
      //Se necesita traducir el arreglo de preferencias en ID a nombre
      for (const genre of feedback.selectedGenres) {
        this.genresNames.push(this.preferenceId(genre));
      }
      const suggestion = await getRequest(
        "/suggestions/feedback/" + feedback.suggestion,
        this.token
      );
      const text = await getRequest("/texts/" + suggestion.text, this.token);
      this.textTitle = text.title;
      return (this.feedback = feedback);
    }
  }
};
</script>

<style scoped></style>
