<template>
  <v-data-table
    :headers="headers"
    :items="permissionsMatrix"
    :items-per-page="10"
    class="elevation-1"
    single-expand
    show-expand
    :expanded.sync="expanded"
  >
    <template v-slot:item="{ item, expand, isExpanded }">
      <tr>
        <td>
          <v-btn
            color="primary"
            v-if="item.specialPermissions.length > 0"
            @click="expand(!isExpanded)"
            >Expandir</v-btn
          >
        </td>
        <td>{{ item.display }}</td>
        <td>
          <v-switch
            v-if="item.hasReadPermission"
            @change="(value) => permissionChanged(`${item.name}Read`, value)"
            :value="item[`${item.name}Read`]"
            :disabled="viewMode"
          ></v-switch>
        </td>
        <td>
          <v-switch
            v-if="item.hasCreatePermission"
            @change="(value) => permissionChanged(`${item.name}Create`, value)"
            :value="item[`${item.name}Create`]"
            :disabled="viewMode"
          ></v-switch>
        </td>
        <td>
          <v-switch
            v-if="item.hasEditPermission"
            @change="(value) => permissionChanged(`${item.name}Edit`, value)"
            :value="item[`${item.name}Edit`]"
            :disabled="viewMode"
          ></v-switch>
        </td>
        <td>
          <v-switch
            v-if="item.hasDeletePermission"
            @change="(value) => permissionChanged(`${item.name}Delete`, value)"
            :value="item[`${item.name}Delete`]"
            :disabled="viewMode"
          ></v-switch>
        </td>
      </tr>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <tr
        v-for="(specialPermission, index) in item.specialPermissions"
        :key="index"
      >
        <td :colspan="headers.length">
          <div class="special-permission-container">
            <v-checkbox
              v-model="item[specialPermission.name]"
              :disabled="viewMode"
              @change="
                (value) => permissionChanged(specialPermission.name, value)
              "
            >
              <template slot="prepend">{{
                specialPermission.display
              }}</template>
            </v-checkbox>
          </div>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<style scoped>
.special-permission-container {
  display: flex;
  justify-content: flex-end;
}
</style>

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
          value: "name",
          sortable: true
        },
        {
          text: "Ver",
          value: "",
          sortable: false
        },
        {
          text: "Crear",
          value: "",
          sortable: false
        },
        {
          text: "Modificar",
          value: "",
          sortable: false
        },
        {
          text: "Eliminar",
          value: "",
          sortable: false
        }
      ],
      expanded: []
    };
  },
  methods: {
    permissionChanged(permission, value) {
      this.$emit("permissionChanged", permission, !!value);
    },
    test(props) {
      console.log(props);
    }
  },
  mounted() {},
  computed: {
    permissionsMatrix: function() {
      const functionalities = [
        {
          display: "Lecturas",
          name: "reading",
          hasReadPermission: true,
          hasCreatePermission: false,
          hasEditPermission: false,
          hasDeletePermission: false,
          specialPermissions: [
            {
              display: "Avanzar Fase",
              name: "advancePhase"
            }
          ]
        },
        {
          display: "Obras",
          name: "book",
          hasReadPermission: true,
          hasCreatePermission: true,
          hasEditPermission: true,
          hasDeletePermission: true,
          specialPermissions: []
        },
        {
          display: "Usuarios",
          name: "user",
          hasReadPermission: true,
          hasCreatePermission: false,
          hasEditPermission: true,
          hasDeletePermission: true,
          specialPermissions: []
        },
        {
          display: "Eventos",
          name: "event",
          hasReadPermission: true,
          hasCreatePermission: true,
          hasEditPermission: true,
          hasDeletePermission: true,
          specialPermissions: []
        },
        {
          display: "Reportes",
          name: "report",
          hasReadPermission: true,
          hasCreatePermission: true,
          hasEditPermission: true,
          hasDeletePermission: true,
          specialPermissions: []
        },
        {
          display: "Roles",
          name: "role",
          hasReadPermission: true,
          hasCreatePermission: true,
          hasEditPermission: true,
          hasDeletePermission: true,
          specialPermissions: []
        },
        {
          display: "Géneros",
          name: "genre",
          hasReadPermission: true,
          hasCreatePermission: true,
          hasEditPermission: true,
          hasDeletePermission: true,
          specialPermissions: []
        }
      ];

      const matrix = functionalities.map((x) => {
        const {
          hasReadPermission,
          hasCreatePermission,
          hasEditPermission,
          hasDeletePermission,
          specialPermissions
        } = x;

        const permissionLine = {
          display: x.display,
          name: x.name,
          hasReadPermission,
          hasCreatePermission,
          hasEditPermission,
          hasDeletePermission,
          specialPermissions
        };

        if (hasReadPermission)
          permissionLine[`${x.name}Read`] = this.role[[`${x.name}Read`]];
        if (hasCreatePermission)
          permissionLine[`${x.name}Create`] = this.role[[`${x.name}Create`]];
        if (hasEditPermission)
          permissionLine[`${x.name}Edit`] = this.role[[`${x.name}Edit`]];
        if (hasDeletePermission)
          permissionLine[`${x.name}Delete`] = this.role[[`${x.name}Delete`]];
        if (x.specialPermissions.length > 0) {
          x.specialPermissions.forEach(
            (x) => (permissionLine[x.name] = this.role[x.name])
          );
        }

        return permissionLine;
      });
      return matrix;
    }
  }
};
</script>
