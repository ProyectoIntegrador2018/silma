<template>
  <div class="ma-4">
    <!-- Si el usuario contiene una sugerencia -->
    <v-container v-if="suggestionExists">
      <!-- si la sugerencia ya fue aceptada o no -->
      <h2 v-if="status">Tus Sugerencias</h2>
      <h2 v-else>Tu Lectura</h2>
      <br />
      <v-card class="mx-auto" max-width="344">
        <v-card-title>
          {{ text.title }}
        </v-card-title>
        <v-card-subtitle>
          {{ text.description }}
        </v-card-subtitle>
        <!-- aceptar o rechazar una sugerencia -->
        <v-card-actions v-if="status">
          <v-btn @click="accept()" color="green" text>Aceptar</v-btn>
          <v-btn @click="reject()" color="red" text>Rechazar</v-btn>
        </v-card-actions>
        <v-card-actions v-else>
          <!-- Acceder lectura de texto -->
          <v-btn
            color="purple"
            text
            :href="'/Mis_Lecturas/' + this.suggestion._id"
            >Continuar lectura</v-btn
          >
        </v-card-actions>
      </v-card>
      <br />
    </v-container>
    <v-container v-else>
      <h2>No tienes lecturas ni sugerencias por el momento</h2>
    </v-container>


    <!-- Reportes del lector -->
    <div class="my-2" align="right">
      <div class="btns-wrapper">
        <v-menu offset-y open-on-hover>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" v-bind="attrs" v-on="on">
              <v-icon left>mdi-account-cog</v-icon>
              MIS REPORTES
            </v-btn>
          </template>
          <v-list>
            <template v-for="(item, index) in readerTask">
              <v-list-item
                v-if="true"
                :key="index"
                :href="`${item.route}`"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </template>
          </v-list>
        </v-menu>
      </div>
    </div>

    <h2>Tus Historial de lecturas</h2>
    <br />
    <Table :headers="headers" :items="data"> </Table>
    <DialogComponent ref="confirm"></DialogComponent>
  </div>
</template>

<script>
import Table from "@/components/table.vue";
import { errorServerRegister } from "@/utils/constants.js";
import { getRequest, postRequest } from "@/utils/requests";
import { translateStatus } from "@/utils/functions";
import DialogComponent from "@/components/dialogComponent.vue";
import moment from "moment";
import { events } from "../main";

export default {
  components: {
    Table,
    DialogComponent
  },
  data() {
    return {
      headers: [
        { text: "Título", align: "start", value: "title" },
        { text: "Fecha en que se recibio sugerencia:", value: "sentDate" },
        { text: "Estado", value: "suggestionStatus" }
      ],
      data: [],
      history: "",
      reader: this.$cookies.get("user_id"),
      role: this.$cookies.get("user_type"),
      suggestion: {},
      text: {},
      suggestionExists: false,
      status: true,
      errorMessage: "",
      errorServerRegister,
      token: "",
      readerTask: [
        {
          title: "Mis lecturas",
          route: "/readBooks"
          //hasPermission: true
        }]
    };
  },
  async created() {
    //Funciones que se llaman al inicio
    await this.getInfo();
    await this.getHistory();
  },
  methods: {
    //Funcion que acepta la sugerencia recibida
    async accept() {
      const options = {
        title: "Aceptar",
        message: "¿Seguro que quieres comprometerte a leer el texto?",
        styleOptions: { color: "primary" },
        onAccept: async () => {
          await postRequest(
            "/suggestions/" + this.suggestion._id + "/accept",
            {},
            this.token
          );
          await this.getInfo();
          await this.getHistory();
        },
        onReject: () => {}
      };
      events.$emit("dialog", options);
    },
    //Funcion que rechaza la sugerencia recibida
    async reject() {
      const options = {
        title: "Rechazar",
        message: "¿Seguro que quieres rechazar la sugerencia?",
        styleOptions: { color: "primary" },
        onAccept: async () => {
          await postRequest(
            "/suggestions/" + this.suggestion._id + "/reject",
            {},
            this.token
          );
          this.suggestionExists = false;
          await this.getInfo();
          await this.getHistory();
        },
        onReject: () => {}
      };
      events.$emit("dialog", options);
    },
    //Funcion que busca si se tiene una sugerencia asignada
    async getInfo() {
      this.token = this.$cookies.get("token");
      this.suggestion = await getRequest(
        "/suggestions/getSuggestionDashboard/" + this.reader,
        this.token
      );
      if (!(this.suggestion == false)) {
        //Has a suggestion or ongoing text
        this.suggestionExists = true;
        this.text = await getRequest(
          "/texts/" + this.suggestion.text,
          this.token
        );
        if (this.suggestion.suggestionStatus == "Accepted") this.status = false;
      }
    },
    //Funcion que formatea la informacion de sugerencias del lector con el nombre del libro
    async composeHistory() {
      var i;
      var text;
      var data = [];
      for (i = 0; i < this.history.length; i++) {
        text = await getRequest("/texts/" + this.history[i].text._id, this.token);
        data.push({
          title: text.title,
          sentDate: moment(new Date(this.history[i].sentDate)).format(
            "DD/MM/YYYY"
          ),
          suggestionStatus: translateStatus(this.history[i].suggestionStatus)
        });
      }
      this.data = data;
    },
    //Funcion que recibe todas las sugerencias del lector
    async getHistory() {
      this.token = this.$cookies.get("token");
      this.history = await getRequest(
        "/suggestions/getAllSuggestionsDashboard/" + this.reader,
        this.token
      );
      await this.composeHistory();
    }
  }
};
</script>
