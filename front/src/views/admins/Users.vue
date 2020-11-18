<template>
  <v-container>
    <div class="display-3 font-weight-medium" align="center">Usuarios</div>
    <!-- Tablas de usuarios registrados -->
    <v-card style="margin-top: 25px">
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-select
          v-model="sortBy"
          hide-details
          dense
          :items="selectKeys"
          prepend-inner-icon="mdi-magnify"
          label="Filtrar por"
        ></v-select>
      </v-card-title>
      <template>
        <v-data-table
          :headers="userHeaders"
          :items="filteredUsers"
          :search="search"
          item-key="name"
        >
          <template v-slot:body="{ items }">
            <tbody>
              <tr
                v-for="(item, key) in items"
                :key="key"
                :class="rowClass(item)"
              >
                <td>{{ item.name }}</td>
                <td>{{ item.email }}</td>
                <td class="center-td">
                  <v-icon v-if="item.isreader" color="success">
                    mdi-check-circle
                  </v-icon>
                </td>
                <td class="center-td">
                  <v-icon v-if="item.iswriter" color="success">
                    mdi-check-circle
                  </v-icon>
                </td>
                <td class="center-td">
                  <v-icon v-if="item.isadmin" color="success">
                    mdi-check-circle
                  </v-icon>
                </td>
                <td>
                  <v-row>
                    <!-- Permisos de usuario -->
                    <div style="margin: 5px 2.5px">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            :disabled="!item.isadmin || item.name == 'Admin 1'"
                            v-bind="attrs"
                            v-on="on"
                            small
                            color="success"
                            @click="
                              () => {
                                $router.push(`RoleSet/${item._id}`);
                              }
                            "
                          >
                            <v-icon color="white">mdi-account-multiple</v-icon>
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
                            :disabled="item.isadmin"
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
                            <v-icon color="white">mdi-account-key</v-icon>
                          </v-btn>
                        </template>
                        <span>Hacer admin</span>
                      </v-tooltip>
                    </div>
                    <!-- Revocar acceso a Usuario -->
                    <div style="margin: 5px 2.5px">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            :disabled="item.isadmin"
                            v-bind="attrs"
                            v-on="on"
                            small
                            color="error"
                            @click="openDialog(item)"
                          >
                            <v-icon color="white">mdi-account-remove</v-icon>
                          </v-btn>
                        </template>
                        <span>Revocar acceso</span>
                      </v-tooltip>
                    </div>
                  </v-row>
                </td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
        <div class="info-container">
          <div class="red-square"></div>
          <div>Lectores que han rechazado más de 5 textos seguidos</div>
        </div>
      </template>
    </v-card>
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

<style scoped>
.many-rejects-reader {
  background: red;
  color: white;
}
.many-rejects-reader:hover {
  color: unset;
}
.red-square {
  width: 20px;
  height: 20px;
  background: red;
}
.info-container {
  padding: 16px;
  display: flex;
  align-items: center;
}
.info-container > :first-child {
  margin-right: 8px;
}
</style>

<script>
import { getRequest, deleteRequest } from "@/utils/requests";
import { events } from "../../main";

export default {
  data() {
    return {
      userHeaders: [
        { text: "Nombre", align: "start", sortable: true, value: "name" },
        { text: "Correo", sortable: true, value: "email" },
        { text: "Lector", align: "center", sortable: true, value: "isreader" },
        {
          text: "Escritor",
          align: "center",
          sortable: true,
          value: "iswriter"
        },
        {
          text: "Administrador",
          align: "center",
          sortable: true,
          value: "isadmin"
        },
        { text: "Acciones", align: "center", sortable: false, value: "actions" }
      ],
      allUsers: [],
      filteredUsers: [],
      selectedUser: [],
      dialogStatus: false,
      selectKeys: ["Escritor", "Lector", "Administrador", "Ninguno"],
      search: "",
      sortBy: ""
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
        user.roles.forEach((role) => {
          user[`is${role}`] = true;
        });
      });
      this.allUsers = this.filteredUsers = users;
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
    },
    rowClass(user) {
      if (!user.isreader) return "";
      if (
        !user.reader ||
        !user.reader.rejectsInARow ||
        user.reader.rejectsInARow < 6
      )
        return "";
      return "many-rejects-reader";
    }
  },
  watch: {
    sortBy: function(val) {
      switch (val) {
        case "Escritor":
          this.filteredUsers = this.allUsers.filter(
            (user) => user.iswriter == true
          );
          break;
        case "Lector":
          this.filteredUsers = this.allUsers.filter(
            (user) => user.isreader == true
          );
          break;
        case "Administrador":
          this.filteredUsers = this.allUsers.filter(
            (user) => user.isadmin == true
          );
          break;
        case "Ninguno":
        default:
          this.filteredUsers = this.allUsers;
          break;
      }
    }
  }
};
</script>
