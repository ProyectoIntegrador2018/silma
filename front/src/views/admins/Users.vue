<template>
  <v-container>
    <div class="display-3 font-weight-medium" align="center">Usuarios</div>
    <div style="margin-top: 25px">
      <h2 align="left">Administradores</h2>
      <!-- Tablas de usuarios registrados -->
      <Table :headers="userHeaders" :items="admins">
        <template #actions="{ props }">
          <v-row>
            <div style="margin: 5px 2.5px">
              <!-- Permisos de usuario -->
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    small
                    color="primary"
                    @click="() => {$router.push(`RoleSet/${props._id}`);}"
                  >
                    <v-icon color="white">mdi-account-multiple</v-icon>
                  </v-btn>
                </template>
                <span>Permisos de usuario</span>
              </v-tooltip>
            </div>
            <!-- 
            <div style="margin: 5px 2.5px">
              Eliminar Usuario
              <v-btn small color="error">
                <v-icon>mdi-account-remove</v-icon>
              </v-btn>
            </div> -->
          </v-row>
        </template>
      </Table>
    </div>
    <div style="margin-top: 25px">
      <h2 align="left">Lectores y Escritores</h2>
      <!-- Tablas de usuarios registrados -->
      <Table :headers="userHeaders" :items="readersWriters">
        <template #actions="{ props }">
          <v-row>
            <div style="margin: 5px 2.5px">
              <!-- Permisos de usuario -->
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    small
                    color="error"
                    @click="openDialog(props)"
                  >
                    <v-icon color="white">mdi-account-remove</v-icon>
                  </v-btn>
                </template>
                <span>Revocar acceso</span>
              </v-tooltip>
            </div>
          </v-row>
        </template>
      </Table>
    </div>
    <div>
      <!-- Modal de rechazo de texto -->
      <v-layout row wrap>
        <v-dialog v-model="dialogStatus" persistent max-width="450">
          <v-card>
            <v-card-title class="headline">Revocar acceso a {{ this.selectedUser.name }} </v-card-title>
            <v-card-text>
              Es probable que quieras primero enviar un aviso sobre su inactivdad al usuario antes de revocarle su acceso.
            </v-card-text>
            <v-card-actions>
              <v-btn color="secondary darken-1" text @click="closeDialog()">
                Cancelar
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary darken-1" text @click="sendNotice()">
                Avisar
              </v-btn>
              <v-spacer></v-spacer>
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
import Table from "@/components/table.vue";
import { getRequest, deleteRequest } from "@/utils/requests";
import { events } from "../../main";

export default {
  components: {
    Table
  },
  data() {
    return {
      userHeaders: [
        { text: "Nombre", align: "start", sortable: true, value: "name" },
        { text: "Correo", sortable: false, value: "email" },
        { text: "Roles", sortable: false, value: "roles" },
        { text: "Acciones", actions: true, sortable: false }
      ],
      readersWriters: [],
      admins: [],
      selectedUser: [],
      dialogStatus: false,
    };
  },
  async created() {
    //Funcion que se llama al iniciar la vista
    await this.composeUsers();
  },
  methods: {
    async composeUsers() {
      const users = await getRequest("users");
      
      // Formateando los usuarios los usuarios con sus datos
      users.forEach((user) => {
        let userRoles = "";
        user.roles.forEach((role) => {
          userRoles += `${this.formatRole(role)}, `;
        });
        user.roles = userRoles.slice(0, -2);
      });

      // Dividiendo los usuarios en administradores y usuarios ordinarios
      const readersWriters = []
      const admins = users.filter( user => {
        let isAdmin = user.roles.includes("Administrador")
        if (isAdmin) {
          return isAdmin;
        }
        else {
          readersWriters.push(user)
        }
      });
      this.admins = admins;
      this.readersWriters = readersWriters;
    },
    formatRole(role) {
      switch (role) {
        case "admin" : return "Administrador";
        case "reader" : return "Lector"
        case "writer" : return "Escritor"
        default: return role
      }
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
      console.log("Send Notice", this.selectedUser);
      await getRequest(`/users/SendNotice/${this.selectedUser._id}`);
    },
    async revokeAccess() {
      this.dialogStatus = false;
      console.log("Revoke access");
      await deleteRequest(`/users/DeleteUser/${this.selectedUser._id}`);
      window.location.reload();
    },
  }
};
</script>
