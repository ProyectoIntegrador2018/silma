<template>
  <v-container>
    <div class="display-1 font-weight-medium" align="center">
      Actualizar rol a: {{ this.user.name }}
    </div>
    <div style="margin-top: 25px">
      <template>
        <v-data-table
          v-model="selected_role"
          :headers="headers"
          :items="roles"
          item-key="name"
          :single-select="true"
          show-select
          hide-default-footer
        ></v-data-table>
      </template>
    </div>
    <div class="bottom-buttons-wrapper">
      <v-btn
        color="secondary"
        @click="
          () => {
            $router.go(-1);
          }
        "
      >
        Cancelar
      </v-btn>
      <v-btn color="success" @click="save">Guardar</v-btn>
    </div>
  </v-container>
</template>

<script>
import { deleteRequest, getRequest } from "../../utils/requestsNoErr";
import { getErrorMessage } from "../../utils/utils";
import { snackbar } from "../../utils/events";
import { patchRequest } from "../../utils/requestsNoErr";
import Messages from "../../utils/messages";

export default {
  name: "RoleSet",
  components: {},
  props: {},
  data() {
    return {
      headers: [{ text: "Rol", value: "name" }],
      roles: [],
      id: "",
      user: "",
      actualRole: "",
      newRole: "",
      selected_role: []
    };
  },
  methods: {
    async dataInit() {
      try {
        if (this.id) {
          this.user = await getRequest(`/users/${this.id}`);
          this.actualRole = this.newRole = this.user.admin.role;
          this.roles = await getRequest("role", false);
          this.preSelectRole();
        }
      } catch (error) {
        const message = getErrorMessage(error, Messages.SomethingWentWrong());
        snackbar(message);
        this.$router.go(-1);
      }
    },
    // Save role in db
    async save() {
      try {
        await patchRequest(
          `adminsSetRole/${this.user.admin._id}/${this.selected_role[0]._id}`
        );
        snackbar(Messages.CRUDOperationSuccess("actualizado"));
        this.$router.go(-1);
      } catch (error) {
        const message = getErrorMessage(error, Messages.SomethingWentWrong());
        snackbar(message);
      }
    },
    preSelectRole() {
      this.roles.forEach((x) => {
        if (this.newRole._id == x._id) {
          this.selected_role.push(x);
        }
      });
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    this.dataInit();
  },
  computed: {}
};
</script>
