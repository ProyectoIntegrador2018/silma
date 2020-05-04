<template>
  <v-container>
    <div class="display-3 font-weight-medium" align="center">Registro de Escritor</div>
    <br>
    <v-form ref="form">
      <h2 class="primary--text">Datos personales</h2>
      <v-layout row wrap>
          <v-col cols="12" sm="6">
            <v-text-field
              outlined
              label="Nombre completo"
              :rules="[requiredRule]"
              v-model="writer.name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              outlined
              :rules="[requiredRule, emailRule]"
              label="E-mail"
              v-model="writer.email"
            ></v-text-field>
          </v-col>
      </v-layout>
      <v-layout row wrap>
          <v-col cols="12" sm="6">
            <v-text-field
              outlined
              label="Contraseña"
              :rules="[requiredRule, passwordMinRule]"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              :type="showPassword ? 'text' : 'password'"
              name="input-10-1"
              v-model="writer.password"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              outlined
              label="Teléfono celular"
              :rules="[requiredRule, numericRule, phoneRule]"
              v-model="writer.phone"
            ></v-text-field>
          </v-col>
      </v-layout>
      <v-layout row wrap>
          <v-col cols="12" sm="6">
            <TimestampDateField
              label="Fecha de Nacimiento"
              icon="event"
              :rules="[requiredRule]"
              v-model="writer.birthdate"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              outlined
              label="Seudónimo"
              :rules="[requiredRule]"
              v-model="writer.pseudonym"
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
                v-model="writer.nationality"
            ></v-select>
            </v-col>
      </v-layout>
    </v-form>
    <v-layout row wrap>
      <v-dialog v-model="dialogSuccess" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Escritor Registrado!</v-card-title>
          <v-card-text>Serás reenviado a tu dashboard</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialogSuccess = false" href="/">Entendido</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogError" persistent max-width="500">
        <v-card>
          <v-card-title class="headline">Error en el registro</v-card-title>
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
        <v-btn @click="create" color="success">Registrarse</v-btn>
      </v-col>
    </v-layout>
  </v-container>
</template>


<script>
import axios from 'axios';
import TimestampDateField from '@/components/timestampDate.vue';
import {requiredRule, emailRule, numericRule, passwordMinRule, phoneRule} from '@/utils/rules';
import {countries} from "@/utils/constants"

export default{
  components: {
    TimestampDateField
  },
  data(){
    return {
      writer: {
        name:'',
        email:'',
        phone:'',
        password:'',
        birthdate:'',
        pseudonym:'',
        nationality:'',
        phase:1,
        isPlus:false
      },
      dialogSuccess: false,
      dialogError: false,
      emailRule,
      requiredRule,
      numericRule,
      passwordMinRule,
      phoneRule,
      countries,
      showPassword: false
    };
  },
  methods: {
    async create() {
      if (!this.$refs.form.validate()) {
        return;
      }
      try {
        await axios.post("http://localhost:3000/api/register/writers", this.writer)
        const authUser = {
          email: this.writer.email,
          password: this.writer.password
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
        this.$router.push('/');
      } catch (error) {
        this.dialogError = true;
      }
    }
  }
};
</script>

<style scoped></style>