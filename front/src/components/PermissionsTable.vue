<template>
  <v-data-table
    :headers="headers"
    :items="permissionsMatrix"
    :items-per-page="10"
    class="elevation-1"
  >
    <template v-slot:body="{ items }">
      <tbody>
        <tr v-for="item in items" :key="item.name">
          <td>{{ item.display }}</td>
          <td>
            <v-switch
              @change="(value) => permissionChanged(`${item.name}Read`, value)"
              :value="item[`${item.name}Read`]"
              :disabled="viewMode"
            ></v-switch>
          </td>
          <td>
            <v-switch
              @change="
                (value) => permissionChanged(`${item.name}Create`, value)
              "
              :value="item[`${item.name}Create`]"
              :disabled="viewMode"
            ></v-switch>
          </td>
          <td>
            <v-switch
              @change="(value) => permissionChanged(`${item.name}Edit`, value)"
              :value="item[`${item.name}Edit`]"
              :disabled="viewMode"
            ></v-switch>
          </td>
          <td>
            <v-switch
              @change="
                (value) => permissionChanged(`${item.name}Delete`, value)
              "
              :value="item[`${item.name}Delete`]"
              :disabled="viewMode"
            ></v-switch>
          </td>
        </tr>
      </tbody>
    </template>
  </v-data-table>
</template>

<style scoped></style>

<script>
export default {
  name: "PermissionsTable",
  props: {
    role: {
      type: Object,
      required: true
    },
    viewMode: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      headers: [
        {
          text: "Funcionalidad",
          value: ""
        },
        {
          text: "Ver",
          value: ""
        },
        {
          text: "Crear",
          value: ""
        },
        {
          text: "Modificar",
          value: ""
        },
        {
          text: "Eliminar",
          value: ""
        }
      ]
    };
  },
  methods: {
    permissionChanged(permission, value) {
      this.$emit("permissionChanged", permission, !!value);
    }
  },
  mounted() {},
  computed: {
    permissionsMatrix: function() {
      const functionalities = [
        {
          display: "Lectura",
          name: "reading",
          hasCrudPermissions: true,
          specialPermissions: []
        },
        {
          display: "Obras",
          name: "book",
          hasCrudPermissions: true,
          specialPermissions: []
        },
        {
          display: "Avance de Fases",
          name: "phase",
          hasCrudPermissions: true,
          specialPermissions: []
        },
        {
          display: "Usuarios",
          name: "user",
          hasCrudPermissions: true,
          specialPermissions: []
        },
        {
          display: "Eventos",
          name: "event",
          hasCrudPermissions: true,
          specialPermissions: []
        },
        {
          display: "Reportes",
          name: "report",
          hasCrudPermissions: true,
          specialPermissions: []
        },
        {
          display: "Roles",
          name: "role",
          hasCrudPermissions: true,
          specialPermissions: []
        }
      ];

      const matrix = functionalities.map((x) => {
        if (x.hasCrudPermissions) {
          const permissionLine = {
            display: x.display,
            name: x.name,
            [`${x.name}Read`]: this.role[[`${x.name}Read`]],
            [`${x.name}Create`]: this.role[[`${x.name}Create`]],
            [`${x.name}Edit`]: this.role[[`${x.name}Edit`]],
            [`${x.name}Delete`]: this.role[[`${x.name}Delete`]]
          };
          return permissionLine;
        }
        return { display: x.display, name: x.name };
      });
      return matrix;
    }
  }
};
</script>
