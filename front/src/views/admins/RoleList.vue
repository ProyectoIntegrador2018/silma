<template>
  <div>
    <h1>Listado de Roles</h1>
    <div class="add-btn-container">
      <v-btn color="primary" @click="() => $router.push('/roleFormCreate')"
        >Agregar</v-btn
      >
    </div>
    <div class="table-wrapper">
      <Table :items="roles" :headers="headers">
        <template #actions="{ props }">
          <div class="actions-wrapper">
            <v-btn
              small
              color="success"
              :disabled="false"
              depressed
              @click="
                () => {
                  $router.push(`roleFormView/${props._id}`);
                }
              "
              >Ver</v-btn
            >
            <v-btn
              v-if="!props.isBaseRole"
              small
              color="primary"
              :disabled="false"
              depressed
              @click="
                () => {
                  $router.push(`roleForm/${props._id}`);
                }
              "
              >Editar</v-btn
            >
            <v-btn
              v-if="!props.isBaseRole"
              small
              color="error"
              :disabled="false"
              depressed
              @click="() => deleteRole(props._id)"
              >Eliminar</v-btn
            >
          </div>
        </template>
      </Table>
    </div>
  </div>
</template>

<style scoped>
.table-wrapper {
  display: flex;
  justify-content: center;
}
.table-wrapper >>> .v-data-table {
  width: 600px;
}
.actions-wrapper {
  display: flex;
  justify-content: space-evenly;
}
</style>

<script>
import Table from "../../components/table";
import { deleteRequest, getRequest } from "../../utils/requestsNoErr";
import { getErrorMessage } from "../../utils/utils";
import { snackbar } from "../../utils/events";
import Messages from "../../utils/messages";

export default {
  name: "RoleList",
  components: { Table },
  data() {
    return {
      headers: [
        { text: "Código", value: "code" },
        { text: "Nombre", value: "name" },
        { text: "Acciones", sortable: false, actions: true }
      ],
      roles: [{ name: "Admin" }, { name: "Escritor" }, { name: "Usuario" }]
    };
  },
  methods: {
    async dataInit() {
      try {
        this.roles = await getRequest("role", false);
      } catch (error) {
        const message = getErrorMessage(error, Messages.SomethingWentWrong());
        snackbar(message);
      }
    },
    async deleteRole(id) {
      try {
        await deleteRequest(`role/${id}`);
        await this.dataInit();
        snackbar(Messages.CRUDOperationSuccess("eliminado"));
      } catch (error) {
        const message = getErrorMessage(error, Messages.SomethingWentWrong());
        snackbar(message);
      }
    }
  },
  mounted() {
    this.dataInit();
  },
  computed: {}
};
</script>
