<template>
  <div class="text-center">
    <v-select
      style="width: 200px"
      hide-details
      class="my-0"
      :items="shownRoles"
      :value="currentRole"
      @change="changeRole"
      item-value="type"
      item-text="title"
      light
      solo
    >
      <template v-slot:append-item>
        <v-divider class="mb-2"></v-divider>
        <v-list-item @click="goToRegister(role.link)" v-for="role of shownNoRoles" :key="role.title">
          <v-icon>mdi-plus</v-icon>
          {{ role.titleRegister }}
        </v-list-item>
      </template>
    </v-select>
  </div>
</template>

<script>
import { getRequest } from "@/utils/requests";

export default {
  data() {
    return {
      items: [
        { title: "Escritor", type: "writer", titleRegister: "Registrate como Escritor", link: "Registro_Escritor" },
        { title: "Lector", type: "reader", titleRegister: "Registrate como Lector", link: "Registro_Lector" },
        { title: "Administrador", type: "admin" }
      ],
      roles: [],
      currentRole: undefined
    };
  },
  created() {
    const role = this.$cookies.get("user_type");
    this.currentRole = this.items.find(x => x.type === role);
    this.updateRoles();
  },
  computed: {
    shownRoles() {
      return this.items.filter(x => this.roles.includes(x.type));
    },
    shownNoRoles() {
      return this.items.filter(x => !this.roles.includes(x.type) && x.type !== "admin");
    }
  },
  methods: {
    async updateRoles() {
      const id = this.$cookies.get("user_id");
      const token = this.$cookies.get("token");
      const user = await getRequest(`user/${id}`, token);
      this.roles = user.roles;
    },
    async changeRole(newRole) {
      this.$cookies.set("user_type", newRole);
      this.currentRole = this.items.find(x => x.type === newRole);
      this.$router.go();
    },
    goToRegister(link) {
      this.$router.push(link);
    }
  }
};
</script>
