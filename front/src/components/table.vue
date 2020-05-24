<template>
  <div>
    <v-data-table
      :headers="formattedHeaders"
      :items="items"
      :pagination.sync="pagination"
      :expand="false"
      item-key="id"
      class="elevation-0"
    >
      <template slot="items" slot-scope="props">
        <tr @click="props.expanded = !props.expanded">
          <td v-if="expand" style="width: 10px;" class="pt-0 pr-0 pl-2">
            <v-btn icon small text class="ma-0">
              <v-icon>{{props.expanded ? 'arrow_drop_up' : 'arrow_drop_down'}}</v-icon>
            </v-btn>
          </td>
          <td v-for="header in displayedHeaders" :key="header.value">
            <div class="text-truncate" :style="{width:header.width}">
              <slot
                :name="header.value"
                :value="props.item[header.value]"
                :props="props"
              >{{ props.item[header.value] }}</slot>
            </div>
          </td>
          <td class="justify-center layout px-0">
            <slot name="actions" :props="props"></slot>
          </td>
        </tr>
      </template>
      <template slot="expand" slot-scope="props">
        <slot name="expand" v-bind="props"></slot>
      </template>
      <template slot="no-data">
        <v-alert :value="true"  icon="mdi-info" style="border-radius: 5px">
          <span>No tienes información registada</span>

          <br>
          <v-btn text color="gray" class="ma-0 ml-4">
            <v-icon>mdi-cached</v-icon>Volver a intentar
          </v-btn>
        </v-alert>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2" v-if="withPagination">
      <v-pagination v-model="pagination.page" :length="pages" circle></v-pagination>
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