<template>
  <v-container>
    <div class="display-3 font-weight-medium" align="center">Registro de Lector Beta</div>
    <br>
    <v-form ref="form">
      <h2 class="primary--text">Datos personales</h2>
      <v-layout row wrap>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              outlined
              label="Nombre completo"
              :rules="[requiredRule]"
              v-model="reader.name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              outlined
              :rules="[requiredRule, emailRule]"
              label="E-mail"
              v-model="reader.email"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              outlined
              label="Contraseña"
              :rules="[requiredRule, passwordMinRule]"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              :type="showPassword ? 'text' : 'password'"
              name="input-10-1"
              v-model="reader.password"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <TimestampDateField
              label="Fecha de Nacimiento"
              icon="event"
              :rules="[requiredRule]"
              v-model="reader.birthdate"
          />
        </v-col>
      </v-layout>
      <v-layout row wrap>
          <v-col cols="12" sm="6">
            <v-text-field
              outlined
              label="Teléfono celular"
              :rules="[requiredRule, numericRule]"
              v-model="reader.phone"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              outlined
              label="Link a perfil de facebook"
              :rules="[requiredRule, facebookRule]"
              v-model="reader.facebookLink"
            ></v-text-field>
          </v-col>
      </v-layout>
      <h2 class="primary--text">Datos para Silma</h2>
      <v-layout row wrap>
        <v-col cols="12" sm="6" md="3">
          <v-select
            outlined
            label='¿Quién te recomendo Silma?'
            :items="administrators"
            dense
            :rules="[requiredRule]"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="8">
          <v-radio-group :rules="[requiredRule]" label='¿Cuánto te tardas en leer 200 páginas?' v-model="reader.readingProficiency" row>
            <v-radio 
              label="3 días o menos" 
              value="3 or less"
              color="success"
            ></v-radio>
            <v-radio 
              label="5 días" 
              value="4 to 6"
              color="success"
            ></v-radio>
            <v-radio 
              label="7 días o más" 
              value="7 or more"
              color="success"
            ></v-radio>
          </v-radio-group>
        </v-col>
      </v-layout>
      <h2 class="primary--text">¿Entre que fechas puedes leer textos?</h2>
      <v-layout row wrap>
        <v-col cols="12" sm="6">
            <TimestampDateField
              label="Desde"
              icon="event"
              :rules="[requiredRule]"
          />
        </v-col>
        <v-col cols="12" sm="6">
            <TimestampDateField
              label="Hasta"
              icon="event"
              :rules="[requiredRule]"
          />
        </v-col>
      </v-layout>
      <v-layout row wrap>
        <v-col cols="12" sm="12">
        <h2 class="primary--text">Preferencias de textos</h2>
        </v-col>
        <v-col cols="12" sm="3" v-for="genres in genres" :key="genres">
            <v-switch
              :label="genres"
              color="success"
              value="success"
            ></v-switch>
        </v-col>
      </v-layout>
    </v-form>
    <v-btn @click="create" color="success">Registrarse</v-btn>
    <v-btn color="error" >Cancelar</v-btn>
  </v-container>
</template>


<script>
import axios from 'axios';
import TimestampDateField from '@/components/timestampDate.vue';
import {genres, administrators} from '@/utils/constants.js';
import {requiredRule, emailRule, numericRule, facebookRule, passwordMinRule} from '@/utils/rules';

export default{
  components: {
    TimestampDateField
  },
  data(){
    return {
      reader: {
        name:'',
        email:'',
        phone:'',
        password:'',
        facebookLink:'',
        birthdate:'',
        //preferences:'',
        //recommended:'',
        readingProficiency:'',
        nationality:'mexicano',
        //from:'',
        //till:''
      },
      genres,
      administrators,
      emailRule,
      requiredRule,
      numericRule,
      facebookRule,
      passwordMinRule,
      showPassword: false
    };
  },
  methods: {
    async create() {
      if (!this.$refs.form.validate()) {
        return;
      }
      try {
        const responseCreate = await axios.post("http://localhost:3000/api/register/readers", this.reader);
        console.log(responseCreate)
        const authUser = {
          email: this.reader.email,
          password: this.reader.password
        }
        const responseAuth = await axios.post("http://localhost:3000/api/user/authentication", authUser)
        console.log(responseAuth.data.token)
        
      } catch (error) {
        alert("No se pudo registrar, intente de nuevo más tarde");
      }
    }
  }
};
</script>

<style scoped></style>