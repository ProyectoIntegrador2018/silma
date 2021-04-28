<template>
  <v-container>
    <h1>Reportes de Ventas</h1>
    <template>
      <v-card>
        <v-tabs
          v-model="tab"
          background-color="primary"
          dark
          centered
          grow
        >
          <v-tab
            v-for="item in items"
            :key="item.tab"
            @change="changeFilter(item.filter)"
          >
            {{ item.tab }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item
            v-for="item in items"
            :key="item.tab"
          >
            <v-card flat>
              <v-card-text>
                <div class="table-wrapper">
                  <div v-if="item.tab == 'Ventas por Libro'" >
                    <reportsTable :items="filteredSalesBooks" :headers="headers" :loading="isLoading">
                    </reportsTable>
                  </div>
                  <div v-if="item.tab == 'Ventas por Mercancía'" >
                    <reportsTable :items="filteredSalesMerch" :headers="headers" :loading="isLoading">
                    </reportsTable>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </template>
  </v-container>
</template>

<style scoped>
.table-wrapper {
  width: 100%;
}
</style>

<script>
import reportsTable from "../../components/reportsTable";
import { getRequest } from "../../utils/requestsNoErr";
import { getErrorMessage } from "../../utils/utils";
import Messages from "../../utils/messages";
import { snackbar } from "../../utils/events";
import list from "../../mixins/list";
import { hasPermission } from "../../utils/utils";


export default {
  components: {
    reportsTable
  },
  mixins: [list],
  data() {
    return {
      hasPermission,
      products: [],
      tab: null,
      filter: '',
      isLoading: false,
      items: [
          {
          tab: 'Ventas por Libro',
          filter: 'Book'
        },
        {
          tab: 'Ventas por Mercancía',
          filter: 'Merch'
        }
      ],
      salesBooks: [],
      filteredSalesBooks: [],
      filteredSalesMerch: [],
      headers: [
        { text: "Título", value: "title" },
        { text: "Autor", value: "writer" },
        { text: "Cantidad", value: "quantity" },
        { text: "Total", value: "total" },
        { text: "Categoria", value: "category" }
      ],
      sales: [],
      token: []
    };
  },
  async mounted() {
    this.updateLoading(true);
    this.isLoading = true;
    await this.getSales();
    await this.getProducts();
    await this.getSalesProducts();
    this.updateLoading(false);
    this.isLoading = false;
  },
  methods: {
    //Funcion que regresa todas las ventas
    async getSales() {
      try {
        this.token = this.$cookies.get("token");
        this.sales = await getRequest("sale/search", {}, this.role);
        console.log(this.sales)
      } catch (error) {
        console.error(error);
        const message = getErrorMessage(error, Messages.SomethingWentWrong());
        snackbar(message);
      }
    },
    //Funcion que regresa todos los productos
    async getProducts() {
      try {
        const token = this.$cookies.get("token");
        this.products = await getRequest("products", {}, token);
      } catch (error) {
        console.error(error);
        const message = getErrorMessage(error, Messages.SomethingWentWrong());
        snackbar(message);
      }
    },
    //Funcion que regresa todas las ventas ordenado por producto
    async getSalesProducts() {
      try {
        var auxProtuct = {
          title: "",
          writer: "",
          quantity: 0,
          total: 0,
          category: ""
        };
        this.products.forEach((product) => {
            auxProtuct.title = product.name;
            auxProtuct.writer = product.inventory.writer.pseudonym;
            auxProtuct.quantity = 0;
            auxProtuct.total = 0;
            auxProtuct.category = product.category;
            this.sales.forEach((sale) => {
              sale.items.forEach((saleItem) => {
                if(saleItem.productId._id == product._id){
                  auxProtuct.quantity = auxProtuct.quantity + saleItem.numberOfItems
                  auxProtuct.total = auxProtuct.total + saleItem.subtotal
                }
              });
            });
            this.salesBooks.push({
              title: auxProtuct.title,
              writer: auxProtuct.writer,
              quantity: auxProtuct.quantity,
              total: auxProtuct.total,
              category: auxProtuct.category
            }); 
        });    
      } catch (error) {
        console.error(error);
        const message = getErrorMessage(error, Messages.SomethingWentWrong());
        snackbar(message);
      }
      //ventas de la mercancía
      this.filteredSalesMerch=this.salesBooks.filter(val => {return val.category === "Merchandise"})

      //ventas de los libros
      this.filteredSalesBooks=this.salesBooks.filter(val => {return val.category === "Book"})
    }
  }    
};
</script>
