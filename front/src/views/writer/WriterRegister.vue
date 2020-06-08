<template>
  <v-container>
    <div class="display-3 font-weight-medium" align="center">Registro de Escritor</div>
    <br />
    <v-form ref="form">
      <h2 class="primary--text">Datos personales</h2>
      <v-layout v-if="logedIn" row wrap>
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
        <v-col v-if="logedIn" cols="12" sm="6">
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
        <v-col v-if="logedIn" cols="12" sm="6">
          <v-text-field
            outlined
            label="Teléfono celular"
            :rules="[requiredRule, numericRule, phoneRule]"
            v-model="writer.phone"
          ></v-text-field>
        </v-col>
      </v-layout>
      <v-layout row wrap>
        <v-col v-if="logedIn" cols="12" sm="6">
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
      <v-layout v-if="logedIn" row wrap>
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
      <v-dialog v-model="termsAndConditionsDialog" width="70%">
        <v-card>
          <v-card-title class="title">Términos y Condiciones</v-card-title>
          <v-card-text v-html="termsAndConditionsContent"></v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="gray" @click="termsAndConditionsDialog = false"
              >Entendido</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-col cols="12">
        <div @click.stop="">
          <v-icon>mdi-checkbox-marked-circle</v-icon>
          Al registrarte, aceptas los
          <a href="javascript:;" @click.stop="termsAndConditionsDialog = true">
            términos y condiciones</a
          >
        </div>
      </v-col>
    </v-layout>
    <v-layout row wrap>
      <v-col align="end">
        <v-btn @click="create" color="success">Registrarse</v-btn>
      </v-col>
    </v-layout>
  </v-container>
</template>


<script>
import TimestampDateField from "@/components/timestampDate.vue";
import {
  requiredRule,
  emailRule,
  numericRule,
  passwordMinRule,
  phoneRule
} from "@/utils/rules";
import { countries, termsAndConditionsWriter } from "@/utils/constants";
import { postRequest } from "@/utils/requests";
import { setAuthCookies } from "@/utils/cookies";

export default {
  components: {
    TimestampDateField
  },
  data() {
    return {
      logedIn: "",
      writer: {
        name: "",
        email: "",
        phone: "",
        password: "",
        birthdate: "",
        pseudonym: "",
        nationality: "",
        phase: 1,
        isPlus: false
      },
      dialogSuccess: false,
      dialogError: false,
      emailRule,
      requiredRule,
      numericRule,
      passwordMinRule,
      phoneRule,
      countries,
      showPassword: false,
      termsAndConditionsDialog: false,
      termsAndConditionsContent: termsAndConditionsWriter,
    };
  },
  created: function() {
    //Verifica si el usuario está iniciado sesión por medio de cookies
    if (this.$cookies.get("token") === null) {
      this.logedIn = true;
    } else {
      this.logedIn = false;
    }
  },
  methods: {
    //Crea el usuario escritor dependiendo si está iniciado sesión o no
    async create() {
      if (!this.$refs.form.validate()) {
        return;
      }
      var authUser = {
        email: this.writer.email,
        password: this.writer.password
      };
      try {
        //Solamente agrega el rol de escritor a un usuario existente
        if (this.logedIn === false) {
          this.writer.userid = this.$cookies.get("user_id");
          var readerData = await postRequest(
            "register/addWriter",
            this.writer,
            this.$cookies.get("token")
          );
          var user = {
            token: this.$cookies.get("token"),
            user_type: "writer",
            user_id: this.$cookies.get("user_id"),
            user_name: this.$cookies.get("user_name")
          };
          setAuthCookies(user);
        } else {
          //Agrega un usuario nuevo con rol de escritor
          await postRequest("register/writers", this.writer);
          authUser.email = this.writer.email;
          authUser.password = this.writer.password;
          const user = await postRequest("user/authentication", authUser);
          setAuthCookies(user);
        }
        this.dialogSuccess = true;
      } catch (error) {
        this.dialogError = true;
      }
    }
  }
};
</script>

<style scoped></style>