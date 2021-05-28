<template>
  <v-container>
    <h1>Ventas</h1>
    <div class="add-btn-container">
      <v-btn
        v-if="hasPermission('saleCreate')"
        color="primary"
        @click="() => $router.push('/sales/create')"
        >Agregar</v-btn
      >
    </div>
    <div class="table-wrapper">
      <Table :items="sales" :headers="headers">
        <!-- WIP: Falta formatear correctamente el nombre del evento -->
        <template v-slot:[`item.event`]="{ item }">
          {{ item.name }}
        </template>

        <!-- WIP: Falta formatear los productos que se vendieron en la venta, mostrar sus  -->
        <!-- subtotales, cant de productos, nombre del producto, etc -->
        <template #actions="{ props }">
          <div class="actions-wrapper">
            <v-btn
              v-if="hasPermission('saleRead')"
              small
              color="success"
              :disabled="false"
              depressed
              @click="
                () => {
                  $router.push(`sales/view/${props._id}`);
                }
              "
              >Ver</v-btn
            >
            <v-btn
              v-if="hasPermission('saleEdit')"
              small
              color="primary"
              :disabled="false"
              depressed
              @click="
                () => {
                  $router.push(`sales/edit/${props._id}`);
                }
              "
              >Editar</v-btn
            >
            <v-btn
              v-if="hasPermission('saleDelete')"
              small
              color="error"
              :disabled="false"
              depressed
              @click="() => deleteSales(props._id)"
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
      sales: [],
      headers: [
        { text: "Evento", value: "event" },
        // { text: "Productos", value: "items" },
        { text: "Total", value: "total" },
        { text: "Acciones", sortable: false, actions: true, align: "center" }
      ]
    };
  },
  async mounted() {
    this.updateLoading(true);
    await this.getSales();
    this.updateLoading(false);
  },
  methods: {
    async getSales() {
      try {
        const token = this.$cookies.get("token");
        this.sales = await getRequest("sale/search", {}, token);
        console.log(this.sales);
      } catch (error) {
        console.error(error);
        const message = getErrorMessage(error, Messages.SomethingWentWrong());
        snackbar(message);
      }
    },
    async deleteSales(id) {
      try {
        await deleteRequest(`sale/${id}`);
        await this.getSales();
        snackbar(Messages.CRUDOperationSuccess("eliminado"));
      } catch (error) {
        const message = getErrorMessage(error, Messages.SomethingWentWrong());
        snackbar(message);
      }
    }
  }
};
</script>
