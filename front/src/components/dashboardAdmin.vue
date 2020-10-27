<template>
  <div>
    <div class="my-2" align="right">
      <div class="btns-wrapper">
        <v-btn
          v-if="hasPermission('genreRead')"
          color="primary"
          dark
          href="/genres"
          >Administración de Géneros</v-btn
        >
        <v-btn
          v-if="hasPermission('roleRead')"
          color="primary"
          dark
          href="/roleList"
          >Roles</v-btn
        >
      </div>
    </div>
    <h1 align="left">Textos Recibidos</h1>
    <Table :headers="headers" :items="dataTexts" v-bind:admin="true" @changePhase="advancePhase">
      <!-- Actions -->
      <template #actions="{ props }">
        <div style="padding-top: 5px">
          <!-- Accesar a las sugerencias pertenecientes a este texto -->
          <v-btn small color="primary" depressed @click="seeSuggestions(props)"
            >Sugerencias</v-btn
          >
        </div>
        <div style="padding-top: 5px">
          <!-- Rechazar texto -->
          <v-btn
            small
            color="error"
            :disabled="props.isRejected"
            depressed
            @click="openRejectDialog(props)"
            >Rechazar</v-btn
          >
        </div>
      </template>
      <template #phase="{ props }">
        <v-chip
          label
          class="ma-2"
          outlined
          small
          :color="props.isRejected ? 'red' : 'primary'"
        >
          {{ props.isRejected ? "Rechazado" : props.phase }}
        </v-chip>
      </template>
    </Table>
    <!-- Tablas de usuarios registrados -->
    <h1 align="left">Escritores</h1>
    <Table :headers="userHeaders" :items="dataWriters" v-bind:admin="true"> </Table>
    <h1 align="left">Lectores Beta</h1>
    <Table :headers="userHeaders" :items="dataReaders" v-bind:admin="true"> </Table>
    <v-layout row wrap>
      <v-dialog v-model="dialogReject" persistent max-width="450">
        <v-card>
          <v-card-title class="headline">Rechazo del texto</v-card-title>
          <v-card-text>
            Favor de adjuntar un PDF explicando porque el texto del autor fue
            rechazado. Se le mandará un correo al autor con esta explicación.
          </v-card-text>
          <v-card-text>
            <v-file-input
              accept=".pdf"
              label="Subir PDF"
              outlined
              :rules="[requiredRule]"
              v-model="rejectDocument"
            ></v-file-input>
          </v-card-text>
          <v-card-actions>
            <v-btn color="secondary darken-1" text @click="closeRejectDialog()">
              Cancelar
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="rejectText()">
              Confirmar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<style scoped>
.btns-wrapper >>> :not(:last-child) {
  margin-right: 8px;
}
</style>

<script>
import Table from "@/components/table.vue";
import { postRequest, getRequest } from "@/utils/requests";
import { requiredRule } from "@/utils/rules";
import { events } from "../main";
import { hasPermission } from "../utils/utils";

export default {
  components: {
    Table
  },
  data() {
    return {
      requiredRule,
      hasPermission,
      //Titulos que corresponden a la tabla y de donde se obtienen sus datos
      headers: [
        { text: "Título", align: "start", sortable: false, value: "title" },
        {
          text: "Número de Registro",
          align: "start",
          sortable: false,
          value: "registerNumber"
        },
        {
          text: "Descripción",
          align: "start",
          sortable: false,
          value: "description"
        },
        { text: "Generos", align: "start", sortable: false, value: "genres" },
        {
          text: "Rango de Edades",
          align: "start",
          sortable: false,
          value: "ageRange"
        },
        {
          text: "Número de Páginas",
          align: "start",
          sortable: false,
          value: "numberOfPages"
        },
        {
          text: "Número de Capitulos",
          align: "start",
          sortable: false,
          value: "numberOfChapters"
        },
        { text: "Fase", align: "start", sortable: false, value: "phase" },
        { text: "Acciones", actions: true, sortable: false }
      ],
      userHeaders: [
        { text: "Nombre", align: "start", sortable: false, value: "name" },
        { text: "Correo", sortable: false, value: "email" }
      ],
      dataTexts: [],
      dataReaders: [],
      dataWriters: [],
      dialogReject: false,
      rejectingText: undefined,
      rejectDocument: undefined
    };
  },
  async created() {
    //Funciones que se lanzan al cargar la vista
    await this.getTexts();
    await this.composeReaders();
    await this.composeWriters();
  },
  methods: {
    //Funcion que al inicio obtiene todos los textos en proceso
    async getTexts() {
      const token = this.$cookies.get("token");
      var data = await getRequest("texts/", token);
      data.forEach((book) => {
        var genreNames = "";
        book.genres.forEach((element) => {
          if (genreNames == "") {
            genreNames = element.name;
          } else {
            genreNames = genreNames + ", " + element.name;
          }
        });
        book.genres = genreNames;
      });
      this.dataTexts = data;
    },
    seeSuggestions(item) {
      var id = item._id;
      this.$router.push("/Sugerencias_Texto/" + id);
    },
    //Funcion que avanza la fase del texto, primero confirmando el avance de fase
    async advancePhase(id, value) {
      const options = {
        title: "Avanzar",
        message: "¿Seguro que quieres avanzar el texto de fase?",
        styleOptions: { color: "primary" },
        onAccept: async () => {
          const token = this.$cookies.get("token");
          await postRequest(
            "admins/texts/movePhase/" + id,
            { phase: value },
            token
          );
          this.getTexts();
        },
        onReject: () => {}
      };
      events.$emit("dialog", options);
    },
    //Abrir mensaje de rechazo
    openRejectDialog(text) {
      this.dialogReject = true;
      this.rejectingText = text;
    },
    //Cerrar mensaje de rechazo
    closeRejectDialog() {
      this.dialogReject = false;
      this.rejectingText = undefined;
      this.rejectDocument = undefined;
    },
    //Funcion que manda a rechazar el texto
    async rejectText() {
      let formData = new FormData();
      formData.append("document", this.rejectDocument);
      const token = this.$cookies.get("token");
      const newText = await postRequest(
        `texts/${this.rejectingText._id}/reject`,
        formData,
        token,
        true
      );
      this.closeRejectDialog();
      await this.getTexts();
    },
    //Funcion que se encarga de formatear los lectores con sus datos de su modelo usuario
    async composeReaders() {
      const token = this.$cookies.get("token");
      const readers = await getRequest("/readers", token);
      var i;
      var user;
      var data = [];
      for (i = 0; i < readers.length; i++) {
        user = await getRequest("users/" + readers[i].user._id, token);
        data.push({
          name: user.name,
          email: user.email
        });
      }
      this.dataReaders = data;
    },
    //Funcion que se encarga de formatear los escritores con sus datos de su modelo usuario
    async composeWriters() {
      const token = this.$cookies.get("token");
      const writers = await getRequest("writers", token);
      var i;
      var user;
      var data = [];
      for (i = 0; i < writers.length; i++) {
        user = await getRequest("users/" + writers[i].user._id, token);
        data.push({
          name: user.name,
          email: user.email
        });
      }
      this.dataWriters = data;
    }
  }
};
</script>
