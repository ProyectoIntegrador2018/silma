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
              <div v-if="admin && isDashboard"> 
                <v-select v-model="item.phase" 
                :items="faseOptions"
                item-text="label"
                item-value="value"
                @change="onChange(item)"
                style="width:100%;"
                >
                </v-select>
              </div>
              <div v-if="!admin && isDashboard" @click="seeTextDetails(item)"> 
                <v-select v-model="item.phase" 
                :items="faseOptions"
                item-text="label"
                item-value="value"
                readonly
                style="max-width:35%;"
                >
                </v-select>
              </div>
              <div v-if="!admin && !isDashboard"> 
                <slot
                :name="header.value"
                :value="item[header.value]"
                :props="item"
                >{{ item[header.value] }}
                </slot>
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
import { phases } from "@/utils/constants.js";
export default {
  props: {
    headers: { type: Array },
    items: { type: Array },
    withPagination: { type: Boolean, default: false },
    expand: { type: Boolean, default: false },
    admin: { type: Boolean, default: false},
    isDashboard: { type: Boolean, default: true}
  },
  data() {
    return {
      faseOptions: phases,
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
  methods:{
    onChange(item) {
      this.$emit("changePhase",item._id, item.phase)
    },
    seeTextDetails(item){
      this.$emit("textDetails",item);
    }
  }
};
</script>

<style></style>
