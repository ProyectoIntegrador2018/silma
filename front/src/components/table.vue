<template>
  <div>
    <v-data-table
      :headers="formattedHeaders"
      :items="items"
      :options.sync="pagination"
      item-key="_id"
      class="elevation-1"
    >
      <template #body="props">
        <tr v-for="item in props.items" :key="item._id">
          <td v-for="header in displayedHeaders" :key="header.value">
            <div v-if="header.text == 'Fase'">
              <div v-if="admin"> 
                <v-select v-model="item.phase" 
                :items="faseOptions"
                item-text="label"
                item-value="value"
                @change="onChange(item)"
                style="width:100%;max-width:75%;"
                >
                </v-select>
              </div>
              <div v-if="!admin"> 
                <v-select v-model="item.phase" 
                :items="faseOptions"
                item-text="label"
                item-value="value"
                @change="onChange(item)"
                disabled
                style="width:100%;max-width:75%;"
                >
                </v-select>
              </div>
            </div>  
            <div  v-if="header.text != 'Fase'" class="text-truncate" :style="{ width: header.width }">
              <slot
                :name="header.value"
                :value="item[header.value]"
                :props="item"
                >{{ item[header.value] }}
              </slot>
            </div>
          </td>
          <td class="text-xs-center">
            <slot name="actions" :props="item"></slot>
          </td>
        </tr>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2" v-if="withPagination">
      <v-options v-model="pagination.page" :length="pages" circle></v-options>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    headers: { type: Array },
    items: { type: Array },
    withPagination: { type: Boolean, default: false },
    expand: { type: Boolean, default: false },
    admin: { type: Boolean, default: false}
  },
  data() {
    return {
      faseOptions: [
        {value: 1, label: "Enviar Texto" }, 
        {value: 2, label: "Lectura Editorial"},
        {value: 3, label: "Entrevista con el autor"},
        {value: 4, label: "Contrato"},
        {value: 5, label: "Tallereo"},
        {value: 6, label: "Correcciones"},
        {value: 7, label: "Portada"},
        {value: 8, label: "Maquetado"},
        {value: 9, label: "Impresion"}
      ],
      pagination: {
        rowsPerPage: 300,
        totalItems: 20
      }
    };
  },
  computed: {
    pages() {
      if (this.pagination.rowsPerPage === null || this.totalItems === null)
        return 0;
      return Math.ceil(this.totalItems / this.pagination.rowsPerPage);
    },
    totalItems() {
      return this.items.length;
    },
    displayedHeaders() {
      return this.headers.filter((x) => !x.actions);
    },
    formattedHeaders() {
      const expandColumn = this.expand
        ? [
            {
              text: "",
              value: "expand",
              sortable: false,
              align: "left",
              width: "10px"
            }
          ]
        : [];
      return [...expandColumn, ...this.headers];
    }
  },
  methods: {
    onChange(item, event) {
      this.$emit("changePhase",item._id, item.phase)
    }
  }
};
</script>

<style></style>
