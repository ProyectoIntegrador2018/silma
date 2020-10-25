<template>
  <v-container>
    <h1>Géneros</h1>
    <div class="add-btn-container">
      <v-btn color="primary" @click="() => $router.push('/genre/create')"
        >Agregar</v-btn
      >
    </div>
    <div class="table-wrapper">
      <Table :items="genres" :headers="headers">
        <template #actions="{ props }">
          <div class="actions-wrapper">
            <v-btn
              small
              color="success"
              :disabled="false"
              depressed
              @click="
                () => {
                  $router.push(`genre/view/${props._id}`);
                }
              "
              >Ver</v-btn
            >
            <v-btn
              small
              color="primary"
              :disabled="false"
              depressed
              @click="
                () => {
                  $router.push(`genre/edit/${props._id}`);
                }
              "
              >Editar</v-btn
            >
            <v-btn
              small
              color="error"
              :disabled="false"
              depressed
              @click="() => deleteGenre(props._id)"
              >Eliminar</v-btn
            >
          </div>
        </template>
      </Table>
    </div>
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
import Table from "../../components/table";

export default {
  components: {
    Table
  },
  data() {
    return {
      genres: [],
      headers: [
        { text: "Nombre", value: "name" },
        { text: "Descripción", value: "description" },
        { text: "Acciones", sortable: false, actions: true }
      ]
    };
  },
  mounted() {
    this.getGenres();
  },
  methods: {
    async getGenres() {
      try {
        this.genres = await getRequest("genre/search", false);
      } catch (error) {
        console.error(error);
        const message = getErrorMessage(error, Messages.SomethingWentWrong());
        snackbar(message);
      }
    },
    async deleteGenre(id) {
      try {
        await deleteRequest(`genre/${id}`);
        await this.getGenres();
        snackbar(Messages.CRUDOperationSuccess("eliminado"));
      } catch (error) {
        const message = getErrorMessage(error, Messages.SomethingWentWrong());
        snackbar(message);
      }
    }
  }
};
</script>
