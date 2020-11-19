<template>
  <v-container>
    <h1>Eventos</h1>
    <div class="add-btn-container">
      <v-btn
        v-if="hasPermission('eventCreate')"
        color="primary"
        @click="() => $router.push('/event/create')"
        >Agregar</v-btn
      >
    </div>
    <div class="table-wrapper">
      <Table :items="events" :headers="headers">
        <template #actions="{ props }">
          <div class="actions-wrapper">
            <v-btn
              v-if="hasPermission('eventRead')"
              small
              color="success"
              :disabled="false"
              depressed
              @click="
                () => {
                  $router.push(`event/view/${props._id}`);
                }
              "
              >Ver</v-btn
            >
            <v-btn
              v-if="hasPermission('eventEdit')"
              small
              color="primary"
              :disabled="false"
              depressed
              @click="
                () => {
                  $router.push(`event/edit/${props._id}`);
                }
              "
              >Editar</v-btn
            >
            <v-btn
              v-if="hasPermission('eventDelete')"
              small
              color="error"
              :disabled="false"
              depressed
              @click="() => deleteEvent(props._id)"
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
import list from "../../mixins/list";
import { hasPermission } from "../../utils/utils";

export default {
  components: {
    Table
  },
  mixins: [list],
  data() {
    return {
      hasPermission,
      events: [],
      headers: [
        { text: "Nombre", value: "name" },
        { text: "Descripción", value: "description" },
        { text: "Fecha", value: "date"},
        { text: "Hora", value: "time"},
        { text: "Acciones", sortable: false, actions: true, align:"center" }
      ]
    };
  },
  async mounted() {
    this.updateLoading(true);
    await this.getEvents();
    this.updateLoading(false);
  },
  methods: {
    async getEvents() {
      try {
        this.events = await getRequest("event/search", false);
      } catch (error) {
        console.error(error);
        const message = getErrorMessage(error, Messages.SomethingWentWrong());
        snackbar(message);
      }
    },
    async deleteEvent(id) {
      try {
        await deleteRequest(`event/${id}`);
        await this.getEvents();
        snackbar(Messages.CRUDOperationSuccess("eliminado"));
      } catch (error) {
        const message = getErrorMessage(error, Messages.SomethingWentWrong());
        snackbar(message);
      }
    }
  }
};
</script>
