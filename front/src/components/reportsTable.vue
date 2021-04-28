<template>
 <div>
    <div>
      <v-data-table
        :headers="formattedHeaders"
        :items="items"
        :loading="loading"
        :options.sync="pagination"
        item-key="_id"
        class="elevation-1"
      >
        <template #body="props">
          <tr v-for="item in props.items" :key="item._id">
            <td v-for="header in displayedHeaders" :key="header.value">
              <div v-if="header.text == 'Fase'">
                  {{item.phase !== 9 ? faseOptions[item.phase].label : "Total" }}
              </div>
              <div v-if="header.text == 'Acciones'">
                <div style="margin: 2.5px 2.5px" v-if="item.go">
                </div>
              </div>
              <div
                v-if="header.text != 'Fase'"
                class="text-truncate"
                :style="{ width: header.width }"
              >
                <slot
                  >{{ item[header.value] }}
                </slot>
              </div>

            </td>
            <td class="text-xs-center" v-if="item.go">
              <slot name="actions">
                  <div style="margin: 2.5px 2.5px" v-if="item.go">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          v-bind="attrs"
                          v-on="on"
                          small
                          icon 
                          @click="goTo(item.go)"
                        >
                          <v-icon>mdi-arrow-right</v-icon>
                        </v-btn>
                      </template>
                    <span>Ir a inventario</span>
                    </v-tooltip>
                  </div>
              </slot>
            </td>
          </tr>
        </template>
      </v-data-table>
      <div class="text-xs-center pt-2" v-if="withPagination">
        <v-options v-model="pagination.page" :length="pages" circle></v-options>
      </div>
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
    admin: { type: Boolean, default: false },
    isDashboard: { type: Boolean, default: true },
    loading: { type: Boolean, default: true }
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
  methods: {
    onChange(item) {
      this.$emit("changePhase", item._id, item.phase);
    },
    seeTextDetails(item) {
      this.$emit("textDetails", item);
    },
    goTo(link){
      this.$router.push(link)
    }
  }
};
</script>

<style></style>
