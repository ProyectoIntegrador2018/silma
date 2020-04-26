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
          <v-col cols="12" sm="3">
            <v-select
                outlined
                label="Género"
                :items="genres"
                :rules="[requiredRule]"
                v-model="text.genre"
            ></v-select>
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
          <v-card-title class="headline">Error en el registro de escrito</v-card-title>
          <v-card-text>Por favor inténtelo más tarde</v-card-text>
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
import { genres } from "@/utils/constants"

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
        genre:'',
        numberOfPages:'',
        phase:1,
        documentPath: null
      },
      dialogSuccess: false,
      dialogError: false,
      requiredRule,
      numericRule,
      genres,
      data: null,
      dialog: false
    };
  },
  methods: {
    async create() {
      if (!this.$refs.form.validate()) {
        return;
      }
      try {
        console.log(this.text)
        const responseCreate = await axios.post("http://localhost:3000/api/texts", this.text);
        console.log(responseCreate)
        this.dialogSuccess = true;
      } catch (error) {
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