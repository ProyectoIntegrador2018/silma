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
                  <div v-if="item.tab != 'Autor'">
                    <reportsTable :items="dataTexts" :headers="headers" :loading="isLoading">
                    </reportsTable>
                  </div>
                  <div v-if="item.tab == 'Autor'">
                    <reportsTable  :items="dataWriters" :headers="headersForWriter" :loading="isLoading">
                    </reportsTable>
                  </div>
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
      writer: this.$cookies.get("user_id"),
      role: this.$cookies.get("user_type"),
      hasPermission,
      dataTexts: [],
      data: [],
      dataWriters: [],
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

    this.updateLoading(false);
    this.isLoading = false;
  },
  methods: {
    changeFilter(newFilter) {
      this.filter = newFilter;
    },
  //Funcion que al inicio obtiene todos los textos, del escritor actual
  async getTexts() {
        const token = this.$cookies.get("token");
        this.data = await getRequest(`texts/writer/${this.writer}`, token);
        this.rejectedTexts = this.data.filter( x => x.isRejected);
        this.data.forEach((book) => {
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
      this.dataTexts = this.data;
        
      }
  }

    
};
</script>
