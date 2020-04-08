<template>
  <v-container>
    <div class="display-3 font-weight-medium" align="center">Registro de Lector Beta</div>
    <br>
    <v-form ref="form">
      <v-layout row wrap>
        <v-flex xs6 offset-xs3>
          <v-header>Datos personales</v-header>
        </v-flex>
        <v-flex xs6 offset-xs3>
          <v-text-field
            label="Nombre Completo"
            outline
          ></v-text-field>
        </v-flex>
        <v-flex xs6 offset-xs3>
          <v-text-field
            label="Email"
            outline
          ></v-text-field>
        </v-flex>
        <v-flex xs6 offset-xs3>
          <v-text-field
            label="Whatsapp"
            outline
          ></v-text-field>
        </v-flex>
        <v-flex xs6 offset-xs3>
          <v-text-field
            label="Perfil de Facebook"
            outline
          ></v-text-field>
        </v-flex>
        <v-flex xs6 offset-xs3>
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            name="input-10-1"
            label="Contraseña"
            counter
            outline
            @click:append="showPassword = !showPassword"
          ></v-text-field>
        </v-flex>
        <v-flex xs6 offset-xs3>
          <v-header>Datos para Silma</v-header>
        </v-flex>
        <br>
        <v-flex xs6 offset-xs3>
          <v-subheader>¿Cuánto te tardas en leer 200 páginas?</v-subheader>
          <v-radio-group>
            <v-radio label="3 días o menos" value="fast"></v-radio>
            <v-radio label="5 días" value="average"></v-radio>
            <v-radio label="7 días o más" value="slow"></v-radio>
          </v-radio-group>
        </v-flex>
        <v-flex xs6 offset-xs3>
          <v-subheader>¿Quién te recomendó?</v-subheader>
          <v-col class="d-flex" cols="12" sm="6">
            <v-select
              :items="administrators"
              dense
            ></v-select>
          </v-col>
        </v-flex>
        <br>
        <v-flex xs6 offset-xs3>
          <v-header>Preferencias de lectura</v-header>
        </v-flex>
        <v-flex xs6 offset-xs3 v-for="genres in genres" :key="genres">
          <v-checkbox
            :label="genres"
          ></v-checkbox>
        </v-flex>
      </v-layout>
    </v-form>
    <div align="center" class="mt-3 mb-5">
      <v-btn color="success">Create</v-btn>
      <v-btn color="error" >Cancel</v-btn>
    </div>
  </v-container>
</template>


<script>
import {genres, administrators} from '@/utils/constants.js';
export default{
  data(){
    return {
      genres,
      administrators
    }
  }
}
</script>

<style scoped></style>