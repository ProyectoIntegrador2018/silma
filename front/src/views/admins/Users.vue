<template>
  <v-container>
    <div class="display-3 font-weight-medium" align="center">Usuarios</div>
    <div style="margin-top: 25px">
      <!-- Tablas de usuarios registrados -->
      <template>
        <v-data-table
        class="elevation-1"
        :headers="userHeaders"
        :items="allUsers"
        item-key="name"
        >
        <template v-slot:item.reader = "{ item }">
          <v-icon v-if="item.reader" color="success">
            mdi-check-circle
          </v-icon>
        </template>
        <template v-slot:item.writer = "{ item }">
          <v-icon v-if="item.writer" color="success">
            mdi-check-circle
          </v-icon>
        </template>
        <template v-slot:item.admin = "{ item }">
          <v-icon v-if="item.admin" color="success">
            mdi-check-circle
          </v-icon>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-row>
          <!-- Permisos de usuario -->
          <div style="margin: 5px 2.5px">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  :disabled="!item.admin"
                  v-bind="attrs"
                  v-on="on"
                  small
                  color="primary"
                  @click="
                    () => {
                      $router.push(`RoleSet/${item._id}`);
                    }
                  "
                >
                  <v-icon  color="white">mdi-account-multiple</v-icon>
                </v-btn>
              </template>
              <span>Permisos de usuario</span>
            </v-tooltip>
          </div>
          <!-- Revocar acceso a Usuario -->
          <div style="margin: 5px 2.5px">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  :disabled="item.admin"
                  v-bind="attrs"
                  v-on="on"
                  small
                  color="error"
                  @click="openDialog(item)"
                >
                  <v-icon  color="white">mdi-account-remove</v-icon>
                </v-btn>
              </template>
              <span>Revocar acceso</span>
            </v-tooltip>
          </div>
          </v-row>
        </template>
        </v-data-table>
      </template>
    </div>
    <div>
      <!-- Modal de rechazo de texto -->
      <v-layout row wrap>
        <v-dialog v-model="dialogStatus" persistent max-width="450">
          <v-card>
            <v-card-title class="headline"
              >Revocar acceso a {{ this.selectedUser.name }}
            </v-card-title>
            <v-card-text>
              Es probable que quieras primero enviar un aviso sobre su
              inactivdad al usuario antes de revocarle su acceso.
            </v-card-text>
            <v-card-actions>
              <v-btn color="secondary darken-1" text @click="closeDialog()">
                Cancelar
              </v-btn>
              <v-spacer></v-spacer>
              <!-- <v-btn color="primary darken-1" text @click="sendNotice()">
                Avisar
              </v-btn>
              <v-spacer></v-spacer> -->
              <v-btn color="red darken-1" text @click="revokeAccess()">
                Revocar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
import { getRequest, deleteRequest } from "@/utils/requests";
import { events } from "../../main";

export default {
  data() {
    return {
      userHeaders: [
        { text: "Nombre", align: "start", sortable: true, value: "name" },
        { text: "Correo", sortable: true, value: "email" },
        { text: "Lector", align: "center", sortable: true, value: "reader" },
        { text: "Escritor", align: "center", sortable: true, value: "writer" },
        { text: "Administrador", align: "center", sortable: true, value: "admin" },
        { text: "Acciones", align: "center", sortable: false, value: "actions" }
      ],
      allUsers: [],
      selectedUser: [],
      dialogStatus: false
    };
  },
  async created() {
    //Funcion que se llama al iniciar la vista
    await this.composeUsers();
  },
  methods: {
    async composeUsers () {
      const users = await getRequest("users");
      // Formateando los usuarios los usuarios con sus datos
      users.forEach((user) => {
        user.roles.forEach((role) => {
          user[`${role}`] = true;
        });
      });
      this.allUsers = users;
    },
    openDialog(user) {
      this.dialogStatus = true;
      this.selectedUser = user;
    },
    closeDialog() {
      this.dialogStatus = false;
    },
    async sendNotice() {
      this.dialogStatus = false;
      await getRequest(`/users/SendNotice/${this.selectedUser._id}`);
    },
    async revokeAccess() {
      this.dialogStatus = false;
      await deleteRequest(`/users/DeleteUser/${this.selectedUser._id}`);
      window.location.reload();
    }
  }
};
</script>
