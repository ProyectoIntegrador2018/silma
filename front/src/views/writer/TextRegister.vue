<template>
  <v-container>
    <div class="display-3 font-weight-medium" align="center">Agregar Escrito</div>
    <br>
    <v-form ref="form">
      <h2 class="primary--text">Datos del Escrito</h2>
      <v-layout row wrap>
          <v-col cols="12" sm="6">
            <v-text-field
              outlined
              label="Título"
              :rules="[requiredRule]"
              v-model="text.title"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
                outlined
                label="ID de Registro"
                :rules="[requiredRule]"
                v-model="text.registerNumber"
            ></v-text-field>
           </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
              outlined
              label="# de páginas"
              :rules="[requiredRule, numericRule]"
              v-model="text.numberOfPages"
            ></v-text-field>
          </v-col>
      </v-layout>
      <p>Seleccionar géneros (Máximo 3)</p>
      <v-layout row wrap>
      <v-col cols="12" sm="3" v-for="genres in genres" :key="genres.name">
            <v-switch
              v-model="text.genres"
              :label="genres.name"
              :value="genres.name"
              color="success"
            ></v-switch>
        </v-col>
      </v-layout>
      <v-layout row wrap class="justify-center">
          <v-col cols="12" sm="12">
            <v-textarea
              outlined
              label="Descripción"
              :rules="[requiredRule]"
              v-model="text.description"
            ></v-textarea>
          </v-col>
      </v-layout>
      <p>Los archivos deberán subirse con el formato de Common Mark.</p>
      <a href="https://commonmark.org/help/">Presiona aquí para más información</a>
      <v-layout row wrap>
          <v-col cols="12" sm="4">
            <v-file-input 
                label="Subir Archivo"
                :rules="[requiredRule]"
                v-model="text.documentPath"
            ></v-file-input>
          </v-col>
          <v-col cols="12" sm="4">
            
        <v-dialog v-model="dialog" width="800px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on" @click="previewData">Vista Previa</v-btn>
            </template>

            <v-card>
            <v-card-title>Previa visualización del escrito</v-card-title>
            <v-card-text v-html="data"></v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
          </v-col>
        </v-layout>
    </v-form>    
    
    <v-layout row wrap>
      <v-dialog v-model="dialogSuccess" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Escrito Registrado!</v-card-title>
          <v-card-text>Tu escrito ya se encuentra registrado</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialogSuccess = false" href="/dashboard">Entendido</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogError" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">{{errorMessage.title}}</v-card-title>
          <v-card-text>{{errorMessage.text}}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="dialogError = false">Entendido</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-layout row wrap>
      <v-col align="end">
        <v-btn @click="create" color="success">Registrar</v-btn>
      </v-col>
    </v-layout>
  </v-container>
</template>


<script>
import axios from 'axios';
import commonmark from 'commonmark';
import {requiredRule, numericRule} from '@/utils/rules';
import {errorGenresRange, errorServerRegister} from '@/utils/constants';

export default{
  components: {
    
  },
  data(){
    return {
      text: {
        writer:'',
        title:'',
        registerNumber:'',
        description:'',
        genres:[],
        numberOfPages:'',
        phase:1,
        documentPath: null
      },
      errorMessage: {
        title:'',
        text:''
      },
      dialogSuccess: false,
      dialogError: false,
      requiredRule,
      genres: [],
      numericRule,
      data: null,
      dialog: false
    };
  },
  asyncComputed: {
      async getGenres(){
        const responseGenres = await axios.get("http://localhost:3000/api/user/genres");
        console.log(responseGenres.data)
        return this.genres = responseGenres.data
      }
  },
  methods: {
    async create() {
      if (!this.$refs.form.validate()) {
        return;
      }
      if (this.text.genres.length < 1 || this.text.genres.length > 3 ){
        this.errorMessage = errorGenresRange
        this.dialogError = true
        return;
      }
      try {
        console.log(this.text)
        const responseCreate = await axios.post("http://localhost:3000/api/texts", this.text);
        console.log(responseCreate)
        this.dialogSuccess = true;
      } catch (error) {
        this.errorMessage = errorServerRegister
        this.dialogError = true;
      }
    },
    previewData() {
      
      if (!this.text.documentPath) {
          this.data = "No se ha seleccionado ningún archivo"
        } else {
            var reader = new FileReader();
            reader.readAsText(this.text.documentPath);
            reader.onload = () => {
                var readerCM = new commonmark.Parser();
                var writerCM = new commonmark.HtmlRenderer();
                var parsed = readerCM.parse(reader.result);
                this.data = writerCM.render(parsed); // result is a String
            }
        }
  }
}
}
</script>

<style scoped></style>