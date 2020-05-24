<template>
  <div>
    <v-data-table
      :headers="formattedHeaders"
      :items="items"
      :options.sync="pagination"
      :expand="false"
      item-key="_id"
      class="elevation-0"
    >
      <template #body="props">
        <tr v-for="item in props.items" :key="item._id">
          <td v-for="header in displayedHeaders" :key="header.value">
            <div class="text-truncate" :style="{width:header.width}">
              <slot
                :name="header.value"
                :value="item[header.value]"
                :props="item"
              >{{ item[header.value] }}</slot>
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
    expand: { type: Boolean, default: false }
  },
  data() {
    return {
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
      return this.headers.filter(x => !x.actions);
    },
    formattedHeaders() {
      const expandColumn = this.expand
        ? [
            {
              text: '',
              value: 'expand',
              sortable: false,
              align: 'left',
              width: '10px'
            }
          ]
        : [];
      return [...expandColumn, ...this.headers];
    }
  }
};
</script>

<style>
</style>