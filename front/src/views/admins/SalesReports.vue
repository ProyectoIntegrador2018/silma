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
                  <div v-if="item.tab == 'Ventas por Autor'" >
                    <v-select
                      v-model="selectedWriter"
                      :items="dataWriters"
                      item-text="name"
                      item-value="_id"
                      label="Selecciona un Autor"
                      @input="changeFilter('writer')"
                    ></v-select>
                    <reportsTable :items="filteredSalesAutor" :headers="headers" :loading="isLoading">
                    </reportsTable>
                  </div>
                  <div v-if="item.tab == 'Ventas por Evento'" >
                    <v-select
                      v-model="selectedEvent"
                      :items="dataEvents"
                      item-text="name"
                      item-value="name"
                      clearable
                      label="Selecciona un Evento"
                      @input="changeFilter('event')"
                    ></v-select>
                    <div v-if="item.tab == 'Ventas por Evento'">
                      <reportsTable
                        :items="filteredSalesEvent"
                        :headers="headersSalesEvent"
                        :loading="isLoading"
                      >
                      </reportsTable>
                    </div>
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
      dataWriters: [],
      dataEvents: [],
      writers: [],
      selectedWriter: null,
      selectedEvent: null,
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
        },
        {
          tab: 'Ventas por Autor',
          filter: 'writer'
        },
        {
          tab: 'Ventas por Evento',
          filter: 'event'
        }
      ],
      salesBooks: [],
      filteredSalesAutor: [],
      filteredSalesBooks: [],
      filteredSalesMerch: [],
      filteredSalesEvent: [],
      headers: [
        { text: "Título", value: "title" },
        { text: "Autor", 
          value: "writer",
          filter: value => {
           if (this.filter === "writer" ) return true

            return value } 
        },
        { text: "Cantidad", value: "quantity" },
        { text: "Total", value: "total" },
        { text: "Categoria", value: "category" }
      ],
      headersSalesEvent: [
        { text: "Evento", value: "event" },
        { text: "Cantidad", value: "quantity" },
        { text: "Total", value: "total" }
      ],
      sales: [],
      token: this.$cookies.get("token"),
      aux1: [],
      aux2: [],
      aux3: [],
      aux4: [],
    };
  },
  async mounted() {
    this.updateLoading(true);
    this.isLoading = true;
    await this.getSales();
    await this.getProducts();
    await this.getEvents();
    await this.getSalesProducts();
    await this.composeAllWriters();
    this.updateLoading(false);
    this.isLoading = false;
  },
  methods: {
    changeFilter(newFilter) {
      this.aux1 = this.selectedWriter;

      if(newFilter=== "writer"){
        this.filteredSalesAutor=this.salesBooks.filter(val => {return val.writerObject._id === this.selectedWriter});
        this.aux2 = this.salesBooks[0].writerObject;
        this.aux3 = this.selectedWriter;
      } 
      else if (newFilter === "event") {
        if (!this.selectedEvent) {
          this.filteredSalesEvent = this.sales
        }
        else {
          this.filteredSalesEvent = this.sales.filter(val => {return val.event === this.selectedEvent});
        }
      }
      this.filter = newFilter;
    },
    //Funcion que regresa todas las ventas
    async getSales() {
      try {
        this.sales = await getRequest("sale/search", {}, this.role);
        this.sales.forEach((sale) => {
          if (sale.event != null) {
            sale.event = sale.event.name  
          } else {
            sale.event = "N/A"
          }
          sale.quantity = 0
          sale.items.forEach((product) => {
            sale.quantity += product.numberOfItems
          })
        })
      } catch (error) {
        console.error(error);
        const message = getErrorMessage(error, Messages.SomethingWentWrong());
        snackbar(message);
      }
    },
    //Funcion que regresa todos los productos
    async getProducts() {
      try {
        this.products = await getRequest("products", {}, this.token);
      } catch (error) {
        console.error(error);
        const message = getErrorMessage(error, Messages.SomethingWentWrong());
        snackbar(message);
      }
    },
    //Funcion que regresa todos los eventos
    async getEvents() {
      try {
        this.dataEvents = await getRequest("event/search", false);
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
          writerObject: {},
          quantity: 0,
          total: 0,
          category: ""
        };
        this.products.forEach((product) => {
            auxProtuct.title = product.name;
            auxProtuct.writer = product.inventory.writer.pseudonym;
            auxProtuct.writerObject = product.inventory.writer;
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
              writerObject: auxProtuct.writerObject,
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
    },
    //Funcion que se encarga de formatear los escritores con todos los datos de su modelo usuario y escritor
    async composeAllWriters() {
      this.writers = await getRequest("writers", this.token);
      var i;
      var user;
      var data = [];
      for (i = 0; i < this.writers.length; i++) {
        user = await getRequest("users/" + this.writers[i].user._id, this.token);
        data.push({
          name: user.name,
          email: user.email,
          phone: user.phone,
          birthdate: user.birthdate,
          nationality: user.nationality,
          pseudonym: this.writers[i].pseudonym,
          isPlus: this.writers[i].isPlu,
          _id: this.writers[i]._id
        });
      }
      this.dataWriters = data;
    }
  }    
};
</script>
