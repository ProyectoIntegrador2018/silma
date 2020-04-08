<template>
  <v-container>
    <div class="display-3 font-weight-medium" align="center">Registro de Lector Beta</div>
    <v-form ref="form">
      <v-layout row wrap>
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
            :type="showPassword ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            counter
            outline
            @click:append="showPassword = !showPassword"
          ></v-text-field>
        </v-flex>
        
      </v-layout>
    </v-form>
    <div align="center" class="mt-3 mb-5">
      <v-btn color="success">Create</v-btn>
      <v-btn color="error" >Cancel</v-btn>
    </div>
  </v-container>
</template>


<script></script>

<style scoped></style>