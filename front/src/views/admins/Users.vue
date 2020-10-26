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
        <template #actions="{ }">
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
                    :href="``"
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
  </v-container>
</template>

<script>
import Table from "@/components/table.vue";
import { requiredRule, letterRule } from "@/utils/rules";
import { getRequest } from "@/utils/requests";
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
    }
  }
};
</script>
