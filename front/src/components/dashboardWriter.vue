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
    <v-btn color="primary" dark class="mb-2" href="/Agregar_Escrito"
      >Agregar Escrito</v-btn
    >
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
    <v-dialog
      v-model="dialog"
      persistent
      max-width="60%"
    >
      <v-card>
        <v-card-title class="headline">
          Fases cumplidas
        </v-card-title>
        <v-card-text>
          <Table :headers="headersDialog" :items="dataDialog" v-bind:isDashboard="false">
          </Table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue"
            text
            @click="dialog = false"
          >
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
      dataDialog: null
    };
  },
  asyncComputed: {
    //Funcion que obtiene todos los escritos registrados del escritor
    async getTexts() {
      const token = this.$cookies.get("token");
      this.data = await getRequest(`texts/writer/${this.writer}`, token);
    }
  },
  methods:{
    seeTextDetails(item){
      this.dataDialog = this.phaseDetails.filter(phase => phase.value <= item.phase);
      this.dialog = true
    }
  }
};
</script>
