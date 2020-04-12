

<template>
  <v-container>
    <div class="display-3 font-weight-medium" align="center">Iniciar Sesión</div>
    <br>
    <br>
    <div align="center" >
    <v-form ref="form" method="POST" action="/login">
        <v-text-field
              outlined
              :rules="[emailRule]"
              label="E-mail"
              style="width: 50%"
            ></v-text-field>
            <v-text-field
              outlined
              label="Contraseña"
              :rules="[]"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              :type="showPassword ? 'text' : 'password'"
              name="input-10-1"
              style="width: 50%"
            ></v-text-field>
            <br>
         <v-btn class="btn btn-indigo" type="submit">Login</v-btn>
         <br>
         <br>
         <a > ¿No tienes cuenta? </a>
         <a href="/Registro_Lector" class="button">Registrarme como Lector</a>
    </v-form>
    </div>
  </v-container>
</template>

<script>
import {emailRule} from '@/utils/rules';
export default {

    data(){
        return {
            showPassword: false,
            emailRule
        }
    },
    methods: {
        /*login(){
            try {
                this.axios.post('http://localhost:8000/api/user/authentication', {
                    name: this.name,description: this.description                 
                    })
            } catch(error) {
                alert("Problema del sitio")
                console.log(error)
            }
        }*/
    }
}
</script>