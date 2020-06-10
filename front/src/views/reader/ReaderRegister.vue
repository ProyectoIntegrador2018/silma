<template>
  <v-container>
    <div class="display-3 font-weight-medium" align="center">
      Registro de Lector Beta
    </div>
    <br />
    <v-form ref="form">
      <h2 class="primary--text">Datos personales</h2>
      <v-layout row wrap v-if="logedIn">
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            outlined
            label="Nombre completo"
            :rules="[requiredRule, letterRule]"
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
        <v-col cols="12" sm="6">
          <v-text-field
            outlined
            label="Teléfono celular"
            :rules="[requiredRule, numericRule, phoneRule]"
            v-model="reader.phone"
          ></v-text-field>
        </v-col>
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
      <v-layout row wrap>
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
            v-model="reader.recommended"
            outlined
            label="¿Quién te recomendo Silma?"
            :items="administrators"
            dense
            :rules="[requiredRule]"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="8">
          <v-radio-group
            :rules="[requiredRule]"
            label="¿Cuánto te tardas en leer 200 páginas?"
            v-model="reader.readingProficiency"
            row
          >
            <v-radio
              label="3 días o menos"
              value="3 or less"
              color="success"
            ></v-radio>
            <v-radio label="5 días" value="4 to 6" color="success"></v-radio>
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
            <v-btn
              color="green darken-1"
              text
              @click="dialogSuccess = false"
              href="/"
              >Entendido</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogError" persistent max-width="500">
        <v-card>
          <v-card-title class="headline">{{ errorMessage.title }}</v-card-title>
          <v-card-text>{{ errorMessage.message }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="dialogError = false"
              >Entendido</v-btn
            >
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
  administrators,
  countries,
  errorServerRegister,
  errorPreferencesMinimun,
  termsAndConditionsReader,
} from "@/utils/constants.js";
import {
  requiredRule,
  emailRule,
  numericRule,
  facebookRule,
  passwordMinRule,
  phoneRule,
  letterRule,
} from "@/utils/rules";
import { getRequest, postRequest } from "@/utils/requests";
import { setAuthCookies } from "@/utils/cookies";

export default {
  components: {
    TimestampDateField,
  },
  data() {
    return {
      logedIn: "",
      reader: {
        name: "",
        email: "",
        phone: "",
        password: "",
        facebookLink: "",
        birthdate: "",
        preferences: [],
        recommended: "",
        readingProficiency: "",
        nationality: "",
        readFrom: "",
        readTill: "",
        //lastReview:''
      },
      errorMessage: {
        title: "",
        message: "",
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
      letterRule,
      errorServerRegister,
      errorPreferencesMinimun,
      showPassword: false,
      termsAndConditionsDialog: false,
      termsAndConditionsContent: termsAndConditionsReader,
    };
  },
  asyncComputed: {
    //Funcion que llama los generos
    async getGenres() {
      this.genres = await getRequest("user/genres");
      return this.genres;
    },
  },
  //Funcion para saber si ya se encuentra una sesion activa
  created: function() {
    if (this.$cookies.get("token") === null) {
      this.logedIn = true;
    } else {
      this.logedIn = false;
    }
  },
  methods: {
    //Funcion que obtiene el ID de las preferencias seleccionadas
    preferenceId(preference) {
      for (const genre of this.genres) {
        if (preference == genre.name) {
          return genre._id;
        }
      }
    },
    //Funcion que crea el lector
    async create() {
      if (!this.$refs.form.validate()) {
        return;
      }
      try {
        //Necesita tener al menos 3 preferencias
        if (this.preferencesNames.length < 3) {
          this.errorMessage = this.errorPreferencesMinimun;
          this.dialogError = true;
          return;
        }
        //Obtener el id de las preferencias
        for (const preference of this.preferencesNames) {
          this.reader.preferences.push(this.preferenceId(preference));
        }
        var authUser = {
          email: "",
          password: "",
        };
        //Validar si existe una sesion activa para agregar funcionalidad nueva
        if (this.logedIn === false) {
          this.reader.userid = this.$cookies.get("user_id");
          var readerData = await postRequest(
            "register/addReader",
            this.reader,
            this.$cookies.get("token")
          );
          //Autenticar usuario
          var user = {
            token: this.$cookies.get("token"),
            user_type: "reader",
            user_id: this.$cookies.get("user_id"),
            user_name: this.$cookies.get("user_name"),
          };
          setAuthCookies(user);
        } else {
          //Solo crear el usuario por que no existe ya con otro rol
          await postRequest("register/readers", this.reader);
          authUser.email = this.reader.email;
          authUser.password = this.reader.password;
          const user = await postRequest("user/authentication", authUser);
          //Autenticar usuario
          setAuthCookies(user);
        }
        this.dialogSuccess = true;
      } catch (error) {
        this.errorMessage = this.errorServerRegister;
        this.dialogError = true;
      }
    },
  },
};
</script>

<style scoped></style>
