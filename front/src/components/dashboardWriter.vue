<template>
  <div class="ma-4">
    <h2>Tus escritos</h2>
    <v-alert
      border="top"
      colored-border
      type="info"
      elevation="2"
      max-width="50%"
    >
      Recuerda que para agregar un escrito, es necesario hacerlo con el formato
      de Common Mark y los capítulos tendrán que estar marcados como encabezados
      (Heading 1). <br />
      <a href="https://commonmark.org/help/" target="_blank"
        >Presiona aquí para más información</a
      >
    </v-alert>

    <br />
    <v-btn color="primary" dark class="mb-2" @click="addText()"
      >Agregar Escrito</v-btn
    >

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
            <template v-for="(item, index) in writerTask">
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


    <!-- Tabla de escritos registrados -->
    <Table :headers="headers" :items="data" @textDetails="seeTextDetails">
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
    <v-dialog v-model="dialog" persistent max-width="60%">
      <v-card>
        <v-card-title class="headline">
          Fases cumplidas
        </v-card-title>
        <v-card-text>
          <Table
            :headers="headersDialog"
            :items="dataDialog"
            v-bind:isDashboard="false"
          >
          </Table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue" text @click="dialog = false">
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="newTextDialog" persistent max-width="60%">
      <v-card>
        <v-card-title class="headline">
          Agregar Texto
        </v-card-title>
        <div style="text-align:center">
          <v-btn color="primary" dark class="mb-2" @click="newText()"
          >Escrito Nuevo
        </v-btn>
        </div>
        <v-card-text>
          <Table
            :headers="headersTextsDialog"
            :items="rejectedTexts"
            v-bind:isDashboard="false"
          >
          <template #actions="{ props }">
          <v-row>
            <div style="margin: 2.5px 2.5px">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  small
                  color="primary"
                  @click="editRejectedText(props)"
                >
                  <v-icon color="white">mdi-file-document-edit</v-icon>
                </v-btn>
              </template>
              <span>Cargar datos</span>
              </v-tooltip>
            </div>
          </v-row>
          </template>
          </Table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue" text @click="newTextDialog = false">
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Table from "@/components/table.vue";
import { getRequest } from "@/utils/requests";
import { phases } from "@/utils/constants.js";
import { hasPermission } from "../utils/utils";

export default {
  components: {
    Table
  },
  props: ["tripId", "ticketId"],
  data() {
    return {
      //Titulos que corresponden a la tabla y de donde se obtienen sus datos
      headers: [
        {
          text: "Título",
          align: "start",
          sortable: true,
          value: "title"
        },
        { text: "Número de páginas", value: "numberOfPages" },
        { text: "Fase", value: "phase", color: "red" }
      ],
      data: [],
      writer: this.$cookies.get("user_id"),
      role: this.$cookies.get("user_type"),
      phaseDetails: phases,
      dialog: false,
      headersDialog: [
        {
          text: "Fase",
          align: "start",
          sortable: true,
          value: "label"
        },
        { text: "Descripción", value: "description" }
      ],
      headersTextsDialog:[
        {
          text: "Titulo",
          align: "start",
          value: "title"
        },
        { text: "Descripción", value: "description" },
        {
          text: "Número de Páginas", value: "numberOfPages", sortable: true
        },
        {
          text: "Número de Capítulos", value: "numberOfChapters", sortable: true
        },
        { text: "Acciones", actions: true, sortable: false }
      ],
      dataDialog: null,
      newTextDialog: false,
      rejectedTexts: [],
      writerTask: [
        {
          title: "Mis Libros",
          route: "/myBooks"
        },
        {
          title: "Mis Ventas",
          route: "/mySales"
        }]
    };
  },
  asyncComputed: {
    //Funcion que obtiene todos los escritos registrados del escritor
    async getTexts() {
      const token = this.$cookies.get("token");
      this.data = await getRequest(`texts/writer/${this.writer}`, token);
      this.rejectedTexts = this.data.filter( x => x.isRejected);
    }
  },
  methods: {
    seeTextDetails(item) {
      this.dataDialog = this.phaseDetails.filter(
        (phase) => phase.value <= item.phase
      );
      this.dialog = true;
    },
    addText(){
      this.newTextDialog = true;
    },
    newText(){
      this.$router.push("/Agregar_Escrito");
    },
    editRejectedText(item){
      var id = item._id;
      this.$router.push("/Agregar_Escrito/" + id);
    }
  }
};
</script>
