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
                    <v-select
                      v-model="selectedWriter"
                      :items="dataWriters"
                      item-text="name"
                      item-value="pseudonym"
                      label="Selecciona un Autor"
                      @input="changeFilter('writer')"
                    ></v-select>
                  </div>
                  <div v-if="item.tab == 'Autor'">
                    <reportsTable  :items="filteredDataTexts" :headers="headers" :loading="isLoading">
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
      dataWriters: [],
      tab: null,
      filter: '',
      rejectedFilter: false,
      isLoading: false,
      selectedWriter: null,
      filteredDataTexts: null,
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
         {
          tab: 'Autor',
          filter: 'writer'
         }
      ],
      genres: [],
      headers: [
        { text: "Título", value: "title" },
        { text: "Autor",
          value: "writer",
          filter: value => {
           if (this.filter === "writer" ) return true

            return value }
          },
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
      ],
      headersForWriter: [
        { text: "Nombre", value: "name" },
        { text: "Seudónimo", value: "pseudonym" },
        { text: "Email", value: "email" },
        { text: "Teléfono", value: "phone" },
        { text: "Año de nacimiento", value: "birthdate" },
        { text: "Nacionalidad", value: "nationality" },
        { text: "Suscripción", value: "isPlus" },

      ]
    };
  },
  async mounted() {
    this.updateLoading(true);
    this.isLoading = true;
    await this.getTexts();
    await this.getGenres();
    await this.composeAllWriters();
    this.updateLoading(false);
    this.isLoading = false;
  },
  methods: {
    changeFilter(newFilter) {
      if(newFilter=== "writer"){
        this.filteredDataTexts=this.dataTexts.filter(val => {return val.writer === this.selectedWriter})
      }
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
        //this.genres = await getRequest("genre/search", false);
        this.genres= [];
      } catch (error) {
        console.error(error);
        const message = getErrorMessage(error, Messages.SomethingWentWrong());
        snackbar(message);
      }
    },
    //Funcion que se encarga de formatear los escritores con todos los datos de su modelo usuario y escritor
    async composeAllWriters() {
      const token = this.$cookies.get("token");
      const writers = await getRequest("writers", token);
      var i;
      var user;
      var data = [];
      for (i = 0; i < writers.length; i++) {
        user = await getRequest("users/" + writers[i].user._id, token);
        data.push({
          name: user.name,
          email: user.email,
          phone: user.phone,
          birthdate: user.birthdate,
          nationality: user.nationality,
          pseudonym: writers[i].pseudonym,
          isPlus: writers[i].isPlus
        });
      }
      this.dataWriters = data;
    }
  }
};
</script>
