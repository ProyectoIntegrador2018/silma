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
        <v-list-item
          @click="goToRegister(role.link)"
          v-for="role of shownNoRoles"
          :key="role.title"
        >
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
        {
          title: "Escritor",
          type: "writer",
          titleRegister: "Registrate como Escritor",
          link: "/Registro_Escritor"
        },
        {
          title: "Lector",
          type: "reader",
          titleRegister: "Registrate como Lector",
          link: "/Registro_Lector"
        },
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
    // All roles that the user has.
    shownRoles() {
      return this.items.filter(x => this.roles.includes(x.type));
    },
    // All roles that the user doesn't has and can register.
    shownNoRoles() {
      return this.items.filter(
        x => !this.roles.includes(x.type) && x.type !== "admin"
      );
    }
  },
  methods: {
    // Gets user info to update avialable roles.
    async updateRoles() {
      const id = this.$cookies.get("user_id");
      const token = this.$cookies.get("token");
      const user = await getRequest(`users/${id}`, token);
      this.roles = user.roles;
    },
    // Changes to another role and reloads page.
    async changeRole(newRole) {
      this.$cookies.set("user_type", newRole);
      this.currentRole = this.items.find(x => x.type === newRole);
      this.$router.go();
    },
    // Navigates to register page (writer or reader).
    goToRegister(link) {
      this.$router.push(link);
    }
  }
};
</script>
