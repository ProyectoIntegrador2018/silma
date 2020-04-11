

<template>
  <v-container>
    <div class="display-3 font-weight-medium" align="center">Iniciar Sesión</div>
    <br>
    <br>
    <div align="center" >
    <v-form ref="form">
        <v-text-field
              outlined
              :rules="[requiredRule, emailRule]"
              label="E-mail"
              style="width: 50%"
            ></v-text-field>
            <v-text-field
              outlined
              label="Contraseña"
              :rules="[requiredRule]"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              :type="showPassword ? 'text' : 'password'"
              name="input-10-1"
              style="width: 50%"
            ></v-text-field>
            <br>
         <v-btn class="btn btn-indigo" type="submit">Login</v-btn>
    </v-form>
    </div>
  </v-container>
</template>
