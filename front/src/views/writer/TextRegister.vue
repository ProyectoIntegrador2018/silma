<template>
  <v-container>
    <div class="display-3 font-weight-medium" align="center">Agregar Escrito</div>
    <br>
    <v-form ref="form">
      <h2 class="primary--text">Datos del Escrito</h2>
      <v-layout row wrap>
          <v-col cols="12" sm="5">
            <v-text-field
              outlined
              label="Título"
              :rules="[requiredRule]"
              v-model="text.title"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <v-text-field
                outlined
                label="ID de Registro"
                :rules="[requiredRule]"
                v-model="text.registerNumber"
            ></v-text-field>
           </v-col>
          <v-col cols="12" sm="2">
            <v-text-field
              outlined
              label="# de páginas"
              :rules="[requiredRule, numericRule]"
              v-model="text.numberOfPages"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-select
                outlined
                label="Rango edad"
                :items="ageRanges"
                :rules="[requiredRule]"
                v-model="text.ageRange"
            ></v-select>
           </v-col>
      </v-layout>
      <p>Seleccionar géneros (Máximo 3)</p>
      <v-layout row wrap>
      <v-col cols="12" sm="3" v-for="genre in genres" :key="genre.name">
            <v-switch
              v-model="text.genres"
              :label="genre.name"
              :value="genre._id"
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
            <v-file-input accept=".md" 
                label="Subir Archivo"
                :rules="[requiredRule]"
                v-model="document"
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
            <v-btn color="green darken-1" text @click="dialogSuccess = false" href="/">Entendido</v-btn>
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
import {errorGenresRange, errorServerRegister, errorDescriptionRange, ageRanges} from '@/utils/constants';
const host = "https://silma.herokuapp.com";

export default{
  components: {
    
  },
  data(){
    return {
      text: {
        writer:this.$cookies.get('user_id'),
        title:'',
        registerNumber:'',
        description:'',
        genres:[],
        numberOfPages:'',
        ageRange: '',
        phase:1,
        documentPath: ''
      },
      errorMessage: {
        title:'',
        text:''
      },
      dialogSuccess: false,
      dialogError: false,
      requiredRule,
      document: null,
      genres: [],
      ageRanges,
      numericRule,
      data: null,
      dialog: false
    };
  },
  asyncComputed: {
      async getGenres(){
        const token = this.$cookies.get('token');
        const responseGenres = await axios.get(`${host}/api/user/genres`, { headers: {"Authorization" : 'Bearer ' + token} });
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
      if (this.text.description.length < 20  || this.text.description.length > 200 ){
        this.errorMessage = errorDescriptionRange
        this.dialogError = true
        return;
      }
      try {
        const token = this.$cookies.get('token');

        const responseCreate = await axios.post(`${host}/api/texts`, this.text, {
            headers: {
                  'content-type': 'application/json',
                  "Authorization" : 'Bearer ' + token, 
            },
        });
        const id = responseCreate.data._id;
        console.log(id)
        
        let formData = new FormData();
        formData.append('document', this.document);

        console.log('>> formData >> ', formData);
        console.log(formData.get('text'))

        const responseUpload = await axios.post(`${host}/api/texts/${id}/uploads`, formData, {
            headers: {
                  "Authorization" : 'Bearer ' + token, 
                  'Content-Type': 'multipart/form-data'
            },
        });
        console.log(responseUpload)

        this.dialogSuccess = true;
      } catch (error) {
        console.log(error.response.data)
        this.errorMessage = errorServerRegister
        this.dialogError = true;
      }
    },
    previewData() {
      if (!this.document) {
          this.data = "No se ha seleccionado ningún archivo"
        } else {
            var reader = new FileReader();
            reader.readAsText(this.document);
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