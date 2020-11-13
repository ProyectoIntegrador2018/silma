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
import {
  deleteRequest,
  getRequest,
  postRequest
} from "../../utils/requestsNoErr";
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
      selected_role: [],
      isNewAdmin: false
    };
  },
  methods: {
    async dataInit() {
      try {
        if (this.id) {
          this.user = await getRequest(`/users/${this.id}`);
          this.setAdminInfo(this.user);
          this.roles = await getRequest("role", false);
          this.roles.push({ name: "Ninguno" });
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
      const selectedRole = this.selected_role[0];
      if (!this.isNewAdmin) {
        if (selectedRole.name != "Ninguno") {
          this.updateRole(selectedRole);
        } else {
          this.deleteAdmin(selectedRole);
        }
      } else if (selectedRole.name != "Ninguno") {
        this.createNewAdmin(selectedRole);
      }
      this.$router.go(-1);
    },
    preSelectRole() {
      this.roles.forEach((x) => {
        if (this.newRole._id == x._id) {
          this.selected_role.push(x);
        }
      });
    },
    // To know if I'm gonna need a new admin
    setAdminInfo(user) {
      const userAdmin = user.admin;
      if (userAdmin) {
        this.actualRole = this.newRole = userAdmin.role;
      } else {
        this.actualRole = this.newRole = { name: "Ninguno" };
        this.isNewAdmin = true;
      }
    },
    async updateRole(role) {
      try {
        await patchRequest(`adminsSetRole/${this.user.admin._id}/${role._id}`);
        snackbar(Messages.CRUDOperationSuccess("actualizado"));
      } catch (error) {
        const message = getErrorMessage(error, Messages.SomethingWentWrong());
        snackbar(message);
      }
    },
    async createNewAdmin(role) {
      const newAdmin = {
        user: this.user._id,
        role: role._id
      };
      try {
        await postRequest(`/admins/makeAdmin`, newAdmin);
        snackbar(Messages.CRUDOperationSuccess("actualizado"));
      } catch (error) {
        const message = getErrorMessage(error, Messages.SomethingWentWrong());
        snackbar(message);
      }
    },
    async deleteAdmin(role) {
      try {
        await deleteRequest(`/admins/removeAdmin/${this.user._id}`);
        snackbar(Messages.CRUDOperationSuccess("actualizado"));
      } catch (error) {
        const message = getErrorMessage(error, Messages.SomethingWentWrong());
        snackbar(message);
      }
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    this.dataInit();
  },
  computed: {}
};
</script>
