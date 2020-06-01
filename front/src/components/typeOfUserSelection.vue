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
    ></v-select>
  </div>
</template>

<script>
import { getRequest } from "@/utils/requests";

export default {
  data() {
    return {
      items: [
        { title: "Escritor", type: "writer" },
        { title: "Lector", type: "reader" },
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
    }
  },
  methods: {
    async updateRoles() {
      const id = this.$cookies.get("user_id");
      const token = this.$cookies.get("token");
      const user = await getRequest(`users/${id}`, token);
      this.roles = user.roles;
    },
    async changeRole(newRole) {
      this.$cookies.set("user_type", newRole);
      this.currentRole = this.items.find(x => x.type === newRole);
      this.$router.go();
    }
  }
};
</script>
