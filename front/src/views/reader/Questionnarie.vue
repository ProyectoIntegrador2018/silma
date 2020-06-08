<template>
  <v-container>
    <div class="display-3 font-weight-medium" align="center">Retroalimentación de {{textTitle}}</div>
    <br>
    <v-form ref="form">
      <h2 class="primary--text">¿Debería publicarse el libro?</h2>
      <v-layout row wrap>
        <v-col cols="12" sm="8">
          <v-radio-group :rules="[requiredRule]" v-model="feedback.publish" row>
            <v-radio 
              label="Si" 
              value="Yes"
              color="success"
            ></v-radio>
            <v-radio 
              label="No" 
              value="No"
              color="success"
            ></v-radio>
          </v-radio-group>
        </v-col>
      </v-layout>
      <h2 class="primary--text">La primera vez que dejaste de leer el texto, ¿en qué página te quedaste?</h2>
      <v-layout row wrap>
        <v-col cols="12" sm="2">
          <v-text-field
                outlined
                :rules="[requiredRule, numericRule]"
                v-model="feedback.page"
          ></v-text-field>
        </v-col>
      </v-layout>
      <v-layout row wrap>
        <v-col cols="12" sm="12">
        <h2 class="primary--text">El género del libro es (selecciona todos los que apliquen): </h2>
        </v-col>
        <v-col cols="12" sm="3" v-for="genres in genres" :key="genres.name">
            <v-switch
              v-model="genresNames"
              :label="genres.name"
              color="success"
              :value="genres.name"
            ></v-switch>
        </v-col>
      </v-layout>
      <h2 class="primary--text">Comenta algo que te haya gustado mucho de la lectura</h2>
      <v-layout row wrap>
        <v-col>
          <v-textarea
            outlined
            :rules="[requiredRule]"
            v-model="feedback.liked"
          ></v-textarea>
        </v-col>
      </v-layout>
      <h2 class="primary--text">Comenta algo que no te haya gustado de la lectura</h2>
      <v-layout row wrap>
        <v-col>
          <v-textarea
            outlined
            :rules="[requiredRule]"
            v-model="feedback.disliked"
          ></v-textarea>
        </v-col>
      </v-layout>
      <h2 class="primary--text">Mi personaje favorito fue (coméntanos por qué)</h2>
      <v-layout row wrap>
        <v-col>
          <v-textarea
            outlined
            :rules="[requiredRule]"
            v-model="feedback.goodCharacter"
          ></v-textarea>
        </v-col>
      </v-layout>
      <h2 class="primary--text">El personaje que menos me gusto fue (coméntanos por qué)</h2>
      <v-layout row wrap>
        <v-col>
          <v-textarea
            outlined
            :rules="[requiredRule]"
            v-model="feedback.badCharacter"
          ></v-textarea>
        </v-col>
      </v-layout>
      <h2 class="primary--text">En general el libro, No me gustó (1) - Lo amé (10)</h2>
      <v-layout row wrap>
        <v-col cols="12" sm="8">
          <v-radio-group :rules="[requiredRule]" v-model="feedback.grade" row>
            <v-radio v-for="index in 10" :key="index"
              :label="String(index)" 
              :value="index"
              color="success"
            ></v-radio>
          </v-radio-group>
        </v-col>
      </v-layout>
    </v-form>
    <v-layout row wrap>
      <v-dialog v-model="dialogSuccess" persistent max-width="500">
        <v-card>
          <v-card-title class="headline">Se recibio tu retroalimentación!</v-card-title>
          <v-card-text>Serás reenviado a tu dashboard</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialogSuccess = false" href="/">Entendido</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogError" persistent max-width="500">
        <v-card>
          <v-card-title class="headline">{{errorMessage.title}}</v-card-title>
          <v-card-text>{{errorMessage.message}}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="dialogError = false">Entendido</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-layout row wrap>
      <v-col align="end">
        <v-btn @click="create" color="success">Concluir</v-btn>
      </v-col>
    </v-layout>
  </v-container>
</template>


<script>
import {errorServerRegister, errorPreferencesMinimun} from '@/utils/constants.js';
import {requiredRule, numericRule} from '@/utils/rules';
import { getRequest, postRequest } from "@/utils/requests";

export default {
  data(){
    return {
      feedback: {
        reader: this.$cookies.get("user_id"),
        suggestion: this.$route.params.id,
        selectedGenres:[],
        publish:'',
        page:'',
        grade:'',
        badCharacter:'',
        goodCharacter:'',
        liked:'',
        disliked:''
      },
      errorMessage: {
        title:'',
        message:''
      },
      genresNames: [],
      dialogSuccess: false,
      dialogError: false,
      genres: [],
      textTitle: '',
      requiredRule,
      numericRule,
      errorServerRegister, 
      errorPreferencesMinimun
    }
  },
  //Funciones que se llaman al inicio de la vista
  asyncComputed: {
      //Obtener todos los generos
      async getGenres(){
        const token = this.$cookies.get('token');
        const responseDuplicate = await getRequest('/user/genres', token);
        return this.genres = responseDuplicate
      },
      //Obtener la sugerencia a la cual pertenece esta retroalimentacion
      async getSuggestion(){
        const token = this.$cookies.get('token');
        const reference = this.$route.params
        this.feedback.suggestion = reference.id
        const suggestion = await getRequest('/suggestions/feedback/'+this.feedback.suggestion, token);
        const text = await getRequest('/texts/'+suggestion.text, token)
        this.textTitle = text.title
      }
  },
  methods: {
    //Funcion que traduce el nombre de un genero por su id
    preferenceId(preference){
        for(const genre of this.genres){
          if(preference == genre.name){
            return genre._id
          }
        }
    },
    //Funcion que crea la retroalimentacion
    async create() {
      if (!this.$refs.form.validate()) {
        return;
      }
      try {
        //Se necesita seleccionar 3 generos
        if(this.genresNames.length < 3){
          this.errorMessage = this.errorPreferencesMinimun
          this.dialogError = true
          return
        }
        //Se necesita cambiar el nombre de los generos por su id
        for (const genre of this.genresNames){
            this.feedback.selectedGenres.push(this.preferenceId(genre))
        }
        const token = this.$cookies.get('token');
        await postRequest("/register/feedback", this.feedback, token);
        await postRequest("/suggestions/"+this.feedback.suggestion+"/complete", {} ,token);
        this.dialogSuccess = true
      } catch (error) {
        this.errorMessage = this.errorServerRegister
        this.dialogError = true
      }
    }
  }
};
</script>

<style scoped></style>