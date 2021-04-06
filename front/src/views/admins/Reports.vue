<template>
  <v-container>
    <h1>Reportes</h1>
    <template>
      <v-card>
        <v-tabs
          v-model="tab"
          background-color="primary"
          dark
          centered
          grow
        >
          <v-tab
            v-for="item in items"
            :key="item.tab"
            @change="changeFilter(item.filter)"
          >
            {{ item.tab }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item
            v-for="item in items"
            :key="item.tab"
          >
            <v-card flat>
              <v-card-text>
                <div class="table-wrapper">
                  <reportsTable :items="dataTexts" :headers="headers" :loading="isLoading">
                  </reportsTable>
                </div>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </template>
  </v-container>
</template>

<style scoped>
.table-wrapper {
  width: 100%;
}
</style>

<script>
import {
  deleteRequest,
  getRequest,
  postRequest
} from "../../utils/requestsNoErr";
import { getErrorMessage } from "../../utils/utils";
import Messages from "../../utils/messages";
import { snackbar } from "../../utils/events";
import reportsTable from "../../components/reportsTable";
import list from "../../mixins/list";
import { hasPermission } from "../../utils/utils";

export default {
  components: {
    reportsTable
  },
  mixins: [list],
  data() {
    return {
      hasPermission,
      dataTexts: [],
      tab: null,
      filter: '',
      rejectedFilter: false,
      isLoading: false,
      items: [
        {
          tab: 'Registrados',
          filter: ''
        },
        {
          tab: 'Rechazados',
          filter: 'rejected'
        },
        // WIP
        // {
        //   tab: 'Leidos',
        //   filter: ''
        // },
        // {
        //   tab: 'Autor',
        //   filter: ''
        // }
      ],
      genres: [],
      headers: [
        { text: "Título", value: "title" },
        { text: "Autor", value: "writer" },
        { text: "Generos", value: "genres" },
        { text: "Páginas", value: "numberOfPages" },
        { text: "Capitulos", value: "numberOfChapters" },
        { text: "Fase", value: "phase" },
        { text: "Rango de Edades", value: "ageRange" },
        {
          text: "Rechazado",
          value: "isRejected",
          filter: value => {
            if (this.filter !== 'rejected' ) return true

            return value
          }
        },
        { text: "Acciones", sortable: false, actions: true }
      ]
    };
  },
  async mounted() {
    this.updateLoading(true);
    this.isLoading = true;
    await this.getTexts();
    await this.getGenres();
    this.updateLoading(false);
    this.isLoading = false;
  },
  methods: {
    changeFilter(newFilter) {
      this.filter = newFilter;
    },
    //Funcion que al inicio obtiene todos los textos en proceso
    async getTexts() {
      const token = this.$cookies.get("token");
      var data = await getRequest("texts/", token);
      data.forEach((book) => {
        var writerName = "";
        var genreNames = "";
        book.genres.forEach((element) => {
          if (genreNames == "") {
            genreNames = element.name;
          } else {
            genreNames = genreNames + ", " + element.name;
          }
        });
        book.genres = genreNames;
        book.writer = book.writer.pseudonym;
      });
      this.dataTexts = data;
    },
    async getGenres() {
      try {
        this.genres = await getRequest("genre/search", false);
      } catch (error) {
        console.error(error);
        const message = getErrorMessage(error, Messages.SomethingWentWrong());
        snackbar(message);
      }
    }
  }
};
</script>
