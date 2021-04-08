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

import { getErrorMessage } from "../../utils/utils";
import Messages from "../../utils/messages";
import { snackbar } from "../../utils/events";
import reportsTable from "../../components/reportsTable";
import list from "../../mixins/list";
import { hasPermission } from "../../utils/utils";
import Table from "@/components/table.vue";
import { getRequest } from "@/utils/requests";
import { phases } from "@/utils/constants.js";
import form from "../../mixins/form";


export default {
  components: {
    reportsTable
  },
  mixins: [list],
  data() {
    return {
      reader: this.$cookies.get("user_id"),
      role: this.$cookies.get("user_type"),
      hasPermission,
      dataTexts: [],
      data: [],
      dataWriters: [],
      tab: null,
      filter: '',
      token: [],
      rejectedFilter: false,
      isLoading: false,
      items: [
          {
          tab: 'Sugerencias de Libros',
          filter: ''
        },
        {
          tab: 'Leídos',
          filter: 'completed'
        }
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
          
        },
        { text: "Estatus de la Sugerencia", value: "suggestionStatus" },
        {
          text: "Leído",
          value: "readBook",
          filter: value => {
            if (this.filter !== 'completed' ) return true

            return value
          }
        }
 
      ]
    };
  },
  async mounted() {
    this.updateLoading(true);
    this.isLoading = true;
    await this.getTexts();

    this.updateLoading(false);
    this.isLoading = false;
  },
  methods: {
    changeFilter(newFilter) {
      this.filter = newFilter;
    },
    //Funcion que regresa los textos que han sido leidos.
    async getTexts() {
        this.token = this.$cookies.get("token");
        this.data = await getRequest(
        "/suggestions/getAllSuggestionsDashboard/" + this.reader,
        this.token
        );
        //this.rejectedTexts = this.data.filter( x => x.isRejected);
        this.data.forEach((suggestion) => {
        var writerName = "";
        var genreNames = "";
        suggestion.text.genres.forEach((element) => {
          if (genreNames == "") {
            genreNames = element.name;
          } else {
            genreNames = genreNames + ", " + element.name;
          }
        });
        suggestion.text.genres = genreNames;
        suggestion.text.writer = suggestion.text.writer.pseudonym;
        var readBook = false;
        if(suggestion.suggestionStatus == "Completed"){
            readBook = true;
        }
        this.dataTexts.push(
          {
          title : suggestion.text.title,
          writer : suggestion.text.writer,
          genres : suggestion.text.genres,
          numberOfPages : suggestion.text.numberOfPages,
          numberOfChapters : suggestion.text.numberOfChapters,
          phase : suggestion.text.phase,
          ageRange : suggestion.text.ageRange,
          isRejected : suggestion.text.isRejected,
          readBook : readBook,
          suggestionStatus : suggestion.suggestionStatus


          }
        );

      });

        
    }
  

  }

    
};
</script>
