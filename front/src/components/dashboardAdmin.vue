<template>
  <div>
    <h1 align="left">Textos Recibidos</h1>
    <Table :headers="headers" :items="dataTexts">
      <!-- Actions -->
      <template #actions="{ props }">
        <div style="padding-top: 5px">
          <v-btn small color="primary" depressed @click="seeSuggestions(props)">Sugerencias</v-btn>
        </div>
        <div style="padding-top: 5px">
          <v-btn small color="success" :disabled="props.isRejected" depressed @click="advancePhase(props)">Avanzar Fase</v-btn>
        </div>
        <div style="padding-top: 5px">
          <v-btn small color="error" :disabled="props.isRejected" depressed @click="openRejectDialog(props)">Rechazar</v-btn>
        </div>
      </template>
      <template #phase="{ props }">
        <v-chip label class="ma-2" outlined small
          :color="props.isRejected ? 'red' : 'primary'">
          {{ props.isRejected ? 'Rechazado' : props.phase }}
        </v-chip>
      </template>
    </Table>
    <v-layout row wrap>
      <v-dialog v-model="dialogReject" persistent max-width="450">
        <v-card>
          <v-card-title class="headline">Rechazo del texto</v-card-title>
          <v-card-text>
            Favor de adjuntar un PDF explicando porque el texto del autor fue rechazado.
            Se le mandará un correo al autor con esta explicación.
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
            <v-btn
              color="secondary darken-1"
              text
              @click="closeRejectDialog()">
              Cancelar
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="rejectText()">
              Confirmar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>


<script>
import Table from "@/components/table.vue";
import { postRequest, getRequest } from "@/utils/requests";
import { requiredRule } from "@/utils/rules";

export default {
  components: {
    Table
  },
  data() {
    return {
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
      dataTexts: [],
      dialogReject: false,
      rejectingText: undefined,
      rejectDocument: undefined
    };
  },
  async created() {
    await this.getTexts();
  },
  methods: {
    async getTexts() {
      const token = this.$cookies.get("token");
      var data = await getRequest("texts/", token);
      var genreNames = "";
      data.forEach(book => {
        book.genres.forEach(element => {
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
      var id = item._id
      this.$router.push('/Sugerencias_Texto/' +id);
    },
    advancePhase(item){
      console.log(item)

    },
    openRejectDialog(text) {
      this.dialogReject = true;
      this.rejectingText = text;
    },
    closeRejectDialog() {
      this.dialogReject = false;
      this.rejectingText = undefined;
      this.rejectDocument = undefined;
    },
    async rejectText() {
      let formData = new FormData();
      formData.append("document", this.rejectDocument);
      const token = this.$cookies.get('token');
      const newText = await postRequest(`texts/${this.rejectingText._id}/reject`, formData, token, true);
      this.closeRejectDialog();
      await this.getTexts();
    }
  }
};
</script>
