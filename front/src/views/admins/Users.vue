<template>
  <v-container>
    <div class="display-3 font-weight-medium" align="center">Usuarios</div>
    <div>
      <!-- Tablas de usuarios registrados -->
      <Table :headers="userHeaders" :items="dataWriters">
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
                    color="purple"
                    @click="userPermisions(props)"
                  >
                    <v-icon color="white">mdi-account-multiple</v-icon>
                  </v-btn>
                </template>
                <span>Permisos de usuario</span>
              </v-tooltip>
            </div>
            <!-- 
              Botones listos para editar y eliminar usuarios
            <div style="margin: 5px 2.5px">
              Editar Usuario
              <v-btn small color="primary">
                <v-icon>mdi-account-edit</v-icon>
              </v-btn>
            </div>
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
      dataWriters: []
    };
  },
  async created() {
    //Funcion que se llama al iniciar la vista
    await this.composeUsers();
  },
  methods: {
    //Funcion que se encarga de formatear los usuarios con sus datos
    async composeUsers() {
      const users = await getRequest("users");
      users.forEach((user) => {
        let userRoles = "";
        user.roles.forEach((role) => {
          userRoles += `${role}, `;
        });
        user.roles = userRoles.slice(0, -2);
      });
      this.dataWriters = users;
    },
    userPermisions(item) {
      const options = {
        title: "Permisos",
        message: "Configuraciones d epermisso de usuarios",
        styleOptions: { color: "primary" },
        onAccept: () => {
          console.log("Permisos de usuarios");
        },
        onReject: () => {}
      };
      events.$emit("dialog", options);
    }
  }
};
</script>
