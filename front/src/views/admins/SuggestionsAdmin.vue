<template>
  <div>
    <h1 align="left">Textos Recibidos para {{ textData.title }}</h1>
    <template>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="2000px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on">Agregar Sugerencias</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Añadir Sugerencia</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <!-- Here goes fields --->
                <Table
                  :headers="headersReadersNoSuggestion"
                  :items="readersNoSuggestion"
                >
                  <!-- Actions -->
                  <template #actions="{ props }">
                    <div style="padding-top: 5px">
                      <v-btn
                        small
                        color="primary"
                        depressed
                        @click="sendSuggestion(props)"
                        >Seleccionar Lector</v-btn
                      >
                    </div>
                  </template>
                </Table>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false"
                >Cerrar</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
    <Table :headers="headersSuggestions" :items="dataSuggestions">
      <!-- Actions -->
      <template #actions="{ props }">
        <div style="padding-top: 5px">
          <v-btn small color="error" depressed @click="deleteSuggestion(props)"
            >Eliminar</v-btn
          >
        </div>
        <div style="padding-top: 5px">
          <v-btn
            small
            color="success"
            v-show="props.status == 'Completado'"
            :href="props.feedback_url"
            >Retroalimentacion</v-btn
          >
        </div>
      </template>
    </Table>
    <DialogComponent ref="confirm"></DialogComponent>
  </div>
</template>

<script>
import Table from "@/components/table.vue";
import { getRequest, postRequest, deleteRequest } from "@/utils/requests";
import { translateStatus } from "@/utils/functions";
import moment from "moment";
import DialogComponent from "@/components/dialogComponent.vue";
import { events } from "../../main";

export default {
  components: {
    Table,
    DialogComponent
  },
  data() {
    return {
      headersSuggestions: [
        { text: "Name", align: "start", sortable: false, value: "name" },
        { text: "E-mail", align: "start", sortable: false, value: "email" },
        {
          text: "Fecha de Envío",
          align: "start",
          sortable: false,
          value: "sentDate"
        },
        {
          text: "Estatus",
          align: "start",
          sortable: false,
          value: "status"
        },
        {
          text: "# Capitulos Pedidos",
          align: "start",
          sortable: false,
          value: "readingChapters"
        },
        { text: "Puntaje", align: "start", sortable: false, value: "score" },
        { text: "Acciones", actions: true, sortable: false }
      ],
      dataSuggestions: [],
      readersNoSuggestion: [],
      headersReadersNoSuggestion: [
        { text: "Name", align: "start", sortable: false, value: "name" },
        { text: "E-mail", align: "start", sortable: false, value: "email" },
        {
          text: "Fecha ultima Sugerencia",
          align: "start",
          sortable: false,
          value: "lastReview"
        },
        {
          text: "Disponibilidad Desde",
          align: "start",
          sortable: false,
          value: "readFrom"
        },
        {
          text: "Disponibilidad Hasta",
          align: "start",
          sortable: false,
          value: "readTill"
        },
        {
          text: "Preferencias",
          align: "start",
          sortable: false,
          value: "genres"
        },
        {
          text: "Velocidad de Lectura",
          align: "start",
          sortable: false,
          value: "readingProficiency"
        }
      ],
      dialog: false,
      textData: {}
    };
  },
  created() {
    this.getTextInfo();
    this.getSuggestions();
    this.getReadersWithoutSuggestion();
  },
  methods: {
    //Elimina una sugerencia para un libro
    async deleteSuggestion(item) {
      const token = this.$cookies.get("token");
      const options = {
        title: "Eliminar",
        message: "Seguro que quieres eliminar?",
        styleOptions: { color: "primary" },
        onAccept: async () => {
          await deleteRequest(
            "admins/suggestions/deleteSuggestion/" + item.suggestion_id,
            token
          );
          this.getTextInfo();
          this.getSuggestions();
          this.getReadersWithoutSuggestion();
        },
        onReject: () => {}
      };
      events.$emit("dialog", options);
    },
    // Obtiene las sugerencias de un libro
    async getSuggestions() {
      const token = this.$cookies.get("token");
      var suggestions = await getRequest(
        "admins/suggestions/getTextSuggestions/" + this.$route.params.id,
        token
      );
      var final = [];
      suggestions.forEach(async (suggestion) => {
        var dataReader = await getRequest(
          "readers/" + suggestion.reader,
          token
        );
        var url = "";
        if (suggestion.suggestionStatus == "Completed") {
          var feedback = await getRequest(
            "/admins/feedbacks/" + suggestion._id,
            token
          );
          url = "/Retroalimentacion/" + feedback;
        }
        var temp = {
          name: dataReader.user.name,
          email: dataReader.user.email,
          status: translateStatus(suggestion.suggestionStatus),
          sentDate: moment(new Date(suggestion.sentDate)).format("DD/MM/YYYY"),
          readingChapters: suggestion.readingChapters,
          score: suggestion.score,
          reader_id: dataReader.reader,
          text_id: suggestion.reader,
          suggestion_id: suggestion._id,
          feedback_url: url
        };
        final.push(temp);
      });
      this.dataSuggestions = final;
    },
    //Obtiene la información del texto
    async getTextInfo() {
      const token = this.$cookies.get("token");
      var text = await getRequest("texts/" + this.$route.params.id, token);
      this.textData = text;
    },
    //Obtiene los lectores a los que se puede sugerir el texto
    async getReadersWithoutSuggestion() {
      const token = this.$cookies.get("token");
      var readersWithoutSuggestion = await getRequest(
        "suggestions/getReadersWithoutSuggestion/" + this.$route.params.id,
        token
      );
      var readersData = [];
      readersWithoutSuggestion.forEach((reader) => {
        var genreNames = "";
        reader.preferences.forEach((element) => {
          if (genreNames == "") {
            genreNames = element.name;
          } else {
            genreNames = genreNames + ", " + element.name;
          }
        });
        var tempReaderData = {
          id: reader._id,
          name: reader.user.name,
          email: reader.user.email,
          lastReview: moment(new Date(reader.lastReview)).format("DD/MM/YYYY"),
          readFrom: moment(new Date(reader.readFrom)).format("DD/MM/YYYY"),
          readTill: moment(new Date(reader.readTill)).format("DD/MM/YYYY"),
          genres: genreNames,
          readingProficiency: reader.readingProficiency
        };
        readersData.push(tempReaderData);
      });
      this.readersNoSuggestion = readersData;
    },
    //Envia la sugerencia al lector seleccionado
    async sendSuggestion(reader) {
      const token = this.$cookies.get("token");
      await postRequest(
        "admins/suggestions/createSuggestions/",
        {
          reader_id: reader.id,
          book_id: this.textData._id,
          numberOfPages: this.textData.numberOfPages
        },
        token
      );
      this.getTextInfo();
      this.getSuggestions();
      this.getReadersWithoutSuggestion();
      this.dialog = false;
    }
  }
};
</script>
