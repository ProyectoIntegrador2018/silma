<template>
  <v-container>
    <h1>Inventarios</h1>
    <template>
      <v-card>
        <v-card flat>
            <v-card-text>
            <div class="table-wrapper">
                <reportsTable :items="dataInventories" :headers="headers" :loading="isLoading">
                </reportsTable>
            </div>
            </v-card-text>
        </v-card>
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
      dataInventories: [],
      dataWriters: [],
      tab: null,
      filter: '',
      rejectedFilter: false,
      isLoading: false,
      genres: [],
      headers: [
        { text: "Escritor", value: "writer" },
        { text: "# de productos", value: "products" },
        { text: "Ver", sortable: false, actions: true },
      ],
    };
  },
  async mounted() {
    this.updateLoading(true);
    this.isLoading = true;
    await this.getInventories();
    this.updateLoading(false);
    this.isLoading = false;
  },
  methods: {
    changeFilter(newFilter) {
      this.filter = newFilter;
    },
    //Funcion que al inicio obtiene todos los textos en proceso
    async getInventories() {
      const token = this.$cookies.get("token");
      var data = await getRequest("inventories", token);
      data.forEach((inventory) => {
        inventory.go = "/inventario/"+inventory.writer.user
        inventory.writer = inventory.writer.pseudonym;
        inventory.products = inventory.items.length
      });
      this.dataInventories = data;
    },
  }
};
</script>
