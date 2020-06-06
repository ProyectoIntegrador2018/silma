<template>
  <v-container>
    <div class="display-3 font-weight-medium" align="center">
      Agregar Escrito
    </div>
    <br />
    <v-form ref="form">
      <h2 class="primary--text">Datos del Escrito</h2>
      <v-layout row wrap>
        <v-col cols="12" sm="4">
          <v-text-field
            outlined
            label="Título"
            :rules="[requiredRule]"
            v-model="text.title"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="2">
          <v-text-field
            outlined
            label="Registro de derechos de autor"
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
        <v-col cols="12" sm="2">
          <v-text-field
            outlined
            label="# de capítulos"
            :rules="[requiredRule, numericRule]"
            v-model="text.numberOfChapters"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="2">
          <v-select
            outlined
            label="Rango edad"
            :items="ageRanges"
            :rules="[requiredRule]"
            v-model="text.ageRange"
          ></v-select>
        </v-col>
      </v-layout>
      <p>Seleccionar géneros (Máximo 3)</p>
      <v-layout row wrap>
        <v-col cols="12" sm="3" v-for="genre in genres" :key="genre.name">
          <v-switch
            v-model="text.genres"
            :label="genre.name"
            :value="genre._id"
            color="success"
          ></v-switch>
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
      <p>
        Los capítulos tendrán que ser indicados como encabezados (Heading 1)
      </p>
      <a href="https://commonmark.org/help/" target="_blank"
        >Presiona aquí para más información</a
      >
      <v-layout row wrap>
        <v-col cols="12" sm="4">
          <v-file-input
            accept=".md"
            label="Subir Archivo"
            :rules="[requiredRule]"
            v-model="document"
          ></v-file-input>
        </v-col>
        <v-col cols="12" sm="4">
          <v-dialog v-model="dialog" width="800px">
            <template v-slot:activator="{ on }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-on="on"
                @click="previewData"
                >Vista Previa</v-btn
              >
            </template>

            <v-card>
              <v-card-title>Previa visualización del escrito</v-card-title>
              <v-card-text id="commonMarkHTML" v-html="data"></v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false"
                  >Cancel</v-btn
                >
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
      <v-dialog v-model="dialogError" persistent max-width="400">
        <v-card>
          <v-card-title class="headline">{{ errorMessage.title }}</v-card-title>
          <v-card-text>{{ errorMessage.text }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="dialogError = false"
              >Entendido</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-layout row wrap>
      <v-col align="end">
        <v-btn @click="create" color="success" :disabled="this.isDisabled"
          >Registrar</v-btn
        >
      </v-col>
    </v-layout>
  </v-container>
</template>

<script>
import { requiredRule, numericRule } from "@/utils/rules";
import {
  errorGenresRange,
  errorServerRegister,
  errorDescriptionRange,
  ageRanges,
  errorNumberOfChapters,
} from "@/utils/constants";
import { getRequest, postRequest } from "@/utils/requests";
import { markdownToHTML, readChapters } from "@/utils/functions";

export default {
  components: {},
  data() {
    return {
      text: {
        writer: this.$cookies.get("user_id"),
        title: "",
        registerNumber: "",
        description: "",
        genres: [],
        numberOfPages: "",
        ageRange: "",
        phase: 1,
        documentPath: "",
        numberOfChapters: "",
      },
      errorMessage: {
        title: "",
        text: "",
      },
      isDisabled: false,
      dialogSuccess: false,
      dialogError: false,
      requiredRule,
      document: null,
      genres: [],
      ageRanges,
      numericRule,
      data: null,
      dialog: false,
    };
  },
  asyncComputed: {
    async getGenres() {
      const token = this.$cookies.get("token");
      this.genres = await getRequest(`user/genres`, token);
      return this.genres;
    },
  },
  methods: {
    async getFile() {
      return new Promise((resolve, reject) => {
        var fr = new FileReader();
        fr.onerror = reject;
        fr.onload = () => {
          resolve(fr.result);
        };
        fr.readAsText(this.document);
      });
    },
    async create() {
      if (!this.$refs.form.validate()) {
        return;
      }
      if (this.text.genres.length < 1 || this.text.genres.length > 3) {
        this.errorMessage = errorGenresRange;
        this.dialogError = true;
        return;
      }
      var getFile = await this.getFile();

      var numChaptersFile = readChapters(getFile).length;
      if (numChaptersFile != parseInt(this.text.numberOfChapters)) {
        this.errorMessage = errorNumberOfChapters;
        this.dialogError = true;
        return;
      }
      if (
        this.text.description.length < 20 ||
        this.text.description.length > 200
      ) {
        this.errorMessage = errorDescriptionRange;
        this.dialogError = true;
        return;
      }
      this.isDisabled = true;
      try {
        const token = this.$cookies.get("token");

        const text = await postRequest("texts", this.text, token);
        const id = text._id;

        let formData = new FormData();
        formData.append("document", this.document);

        await postRequest(`texts/${id}/uploads`, formData, token, true);
        this.dialogSuccess = true;
      } catch (error) {
        this.errorMessage = errorServerRegister;
        this.dialogError = true;
        this.isDisabled = false;
      }
    },
    previewData() {
      if (!this.document) {
        this.data = "No se ha seleccionado ningún archivo";
      } else {
        var reader = new FileReader();
        reader.readAsText(this.document);
        reader.onload = () => {
          this.data = markdownToHTML(reader.result);
        };
      }
    },
  },
};
</script>

<style scoped></style>
