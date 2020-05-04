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
              :rules="[requiredRule, numericRule, phoneRule]"
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
      <v-layout row wrap>
          <v-col cols="12" sm="4">
            <v-select
                outlined
                label="Nacionalidad"
                :items="countries"
                dense
                :rules="[requiredRule]"
                v-model="reader.nationality"
            ></v-select>
            </v-col>
      </v-layout>
      <h2 class="primary--text">Datos para Silma</h2>
      <v-layout row wrap>
        <v-col cols="12" sm="6" md="3">
          <v-select
            v-model="reader.recommended"
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
              v-model="reader.readFrom"
          />
        </v-col>
        <v-col cols="12" sm="6">
            <TimestampDateField
              label="Hasta"
              icon="event"
              :rules="[requiredRule]"
              v-model="reader.readTill"
          />
        </v-col>
      </v-layout>
      <v-layout row wrap>
        <v-col cols="12" sm="12">
        <h2 class="primary--text">Preferencias de textos</h2>
        </v-col>
        <v-col cols="12" sm="3" v-for="genres in genres" :key="genres.name">
            <v-switch
              v-model="preferencesNames"
              :label="genres.name"
              color="success"
              :value="genres.name"
            ></v-switch>
        </v-col>
      </v-layout>
    </v-form>
    <v-layout row wrap>
      <v-dialog v-model="dialogSuccess" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Lector Registrado!</v-card-title>
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
        <v-btn @click="create" color="success">Registrarse</v-btn>
      </v-col>
    </v-layout>
  </v-container>
</template>


<script>
import axios from 'axios';
import TimestampDateField from '@/components/timestampDate.vue';
import {administrators, countries, errorServerRegister, errorPreferencesMinimun} from '@/utils/constants.js';
import {requiredRule, emailRule, numericRule, facebookRule, passwordMinRule, phoneRule} from '@/utils/rules';

export default {
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
        preferences:[],
        recommended:'',
        readingProficiency:'',
        nationality:'',
        readFrom:'',
        readTill:'',
        //lastReview:''
      },
      errorMessage: {
        title:'',
        message:''
      },
      preferencesNames: [],
      dialogSuccess: false,
      dialogError: false,
      genres: [],
      countries,
      administrators,
      emailRule,
      requiredRule,
      numericRule,
      facebookRule,
      passwordMinRule,
      phoneRule,
      errorServerRegister, 
      errorPreferencesMinimun,
      showPassword: false
    }
  },
  asyncComputed: {
      async getGenres(){
        const responseDuplicate = await axios.get("http://localhost:3000/api/user/genres");
        return this.genres = responseDuplicate.data
      }
  },
  methods: {
    preferenceId(preference){
        for(const genre of this.genres){
          if(preference == genre.name){
            return genre._id
          }
        }
    },
    async create() {
      if (!this.$refs.form.validate()) {
        return;
      }
      try {
        if(this.preferencesNames.length < 3){
          this.errorMessage = this.errorPreferencesMinimun
          this.dialogError = true
          return
        }
        for (const preference of this.preferencesNames){
            this.reader.preferences.push(this.preferenceId(preference))
        }
        console.log(this.reader.preferences)
        await axios.post("http://localhost:3000/api/register/readers", this.reader);
        const authUser = {
          email: this.reader.email,
          password: this.reader.password
        }
        const responseAuth = await axios.post("http://localhost:3000/api/user/authentication", authUser);
        const { token, roles, _id } = responseAuth.data;
        this.$cookies.set('token', token);
        if (!this.$cookies.isKey('user_type')) {
            const role = roles.includes('admin')
              ? 'admin' : roles.includes('writer')
              ? 'writer' : 'reader';
            this.$cookies.set('user_type', role);
            this.$cookies.set('user_id', _id);
        }
        this.dialogSuccess = true
      } catch (error) {
        console.log(error.response.data)
        this.errorMessage = this.errorServerRegister
        this.dialogError = true
      }
    }
  }
};
</script>

<style scoped></style>