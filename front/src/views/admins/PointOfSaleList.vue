<template>
  <v-container>
    <h1>Puntos de Venta</h1>
    <div class="add-btn-container">
      <v-btn
        v-if="hasPermission('pointOfSaleCreate')"
        color="primary"
        @click="() => $router.push('/pointofsale/create')"
        >Agregar</v-btn
      >
    </div>
    <div class="table-wrapper">
      <Table :items="poS" :headers="headers">
        <template #actions="{ props }">
          <div class="actions-wrapper">
            <v-btn
              v-if="hasPermission('pointOfSaleRead')"
              small
              color="success"
              :disabled="false"
              depressed
              @click="
                () => {
                  $router.push(`pointofsale/view/${props._id}`);
                }
              "
              >Ver</v-btn
            >
            <v-btn
              v-if="hasPermission('pointOfSaleEdit')"
              small
              color="primary"
              :disabled="false"
              depressed
              @click="
                () => {
                  $router.push(`pointofsale/edit/${props._id}`);
                }
              "
              >Editar</v-btn
            >
            <v-btn
              v-if="hasPermission('pointOfSaleDelete')"
              small
              color="error"
              :disabled="false"
              depressed
              @click="() => deletePoS(props._id)"
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
      poS: [],
      headers: [
        { text: "Nombre", value: "name" },
        { text: "Descripción", value: "description" },
        { text: "Acciones", sortable: false, actions: true, align:"center"}
      ]
    };
  },
  async mounted() {
    this.updateLoading(true);
    await this.getPoS();
    this.updateLoading(false);
  },
  methods: {
    async getPoS() {
      try {
        this.poS = await getRequest("pointOfSale/search", false);
      } catch (error) {
        console.error(error);
        const message = getErrorMessage(error, Messages.SomethingWentWrong());
        snackbar(message);
      }
    },
    async deletePoS(id) {
      try {
        await deleteRequest(`pointOfSale/${id}`);
        await this.getPoS();
        snackbar(Messages.CRUDOperationSuccess("eliminado"));
      } catch (error) {
        const message = getErrorMessage(error, Messages.SomethingWentWrong());
        snackbar(message);
      }
    }
  }
};
</script>
