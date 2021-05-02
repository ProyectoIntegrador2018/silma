<template>
  <v-container>
    <h1>Ventas</h1>
    <v-form ref="form" v-model="valid" class="main-container">
      <v-select
        v-model="selectedEvent"
        :items="events"
        item-text="name"
        item-value="_id"
        label="Evento"
        :rules="[(x) => !!x || Messages.RequiredField()]"
        :disabled="viewMode"
        outlined
      >
      </v-select>

      <!-- Add Item -->
      <template>
        <v-row
          v-for="(item, index) in items"
          :key="index"
        >
          <v-col
            class="text-right"
            cols="12"
            md="3"
          >
            <v-autocomplete
              v-model="item._id"
              :items="products"
              item-text="name"
              item-value="_id"
              label="Producto"
              clearable
              required
              :rules="[() => item._id !== null || 'Este campo es requerido']"
              :disabled="viewMode"
              outlined
              @input="autocompleteProduct(index, item._id)"
            ></v-autocomplete>
          </v-col>

          <v-col
            class="text-right"
            cols="12"
            md="3"
          >
            <v-text-field
              v-model="item.price"
              label="Precio Unitario"
              prefix="$"
              type="number"
              :rules="[(x) => !!x || Messages.RequiredField()]"
              :disabled="viewMode"
              required
              outlined
              @input="calculateSubtotal(index)"
            ></v-text-field>
          </v-col>

          <v-col
            class="text-right"
            cols="12"
            md="2"
          >
            <v-text-field
              v-model="item.numberOfItems"
              label="Cantidad"
              type="number"
              :rules="[(x) => !!x || Messages.RequiredField()]"
              :disabled="viewMode"
              min="1"
              required
              outlined
              @input="calculateSubtotal(index)"
            ></v-text-field>
          </v-col>

          <v-col
            class="text-right"
            cols="12"
            md="3"
          >
            <v-text-field
              v-model="item.subtotal"
              label="Subtotal"
              prefix="$"
              type="number"
              :rules="[(x) => !!x || Messages.RequiredField()]"
              :disabled="viewMode"
              required
              outlined
            ></v-text-field>
          </v-col>

          <v-col
            class="mx-auto"
            cols="12"
            md="1"
          >
            <v-btn
              icon
              @click="deleteItem(index)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </template>

      <v-row>
        <v-col
          class="text-right"
          cols="12"
          md="1"
        >
          <v-btn
            color="primary"
            @click="addItem"
          >Agregar</v-btn>
        </v-col>

        <v-spacer></v-spacer>

        <v-col
          class="text-right"
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="total"
            label="Total"
            prefix="$"
            type="number"
            :rules="[(x) => !!x || Messages.RequiredField()]"
            :disabled="viewMode"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <div class="bottom-buttons-wrapper">
        <v-btn
          color="secondary"
          :disabled="false"
          @click="
            () => {
              $router.go(-1);
            }
          "
          >Cancelar</v-btn
        >
        <v-btn 
          color="primary"
          :disabled="loading || viewMode || !valid"
          @click="save"
        >Guardar
        </v-btn>
      </div>
    </v-form>
  </v-container>
</template>

<style scoped>
.main-container {
  width: 100%;
}
</style>

<script>
import {
  patchRequest,
  getRequest,
  postRequest
} from "../../utils/requestsNoErr";
import { getErrorMessage } from "../../utils/utils";
import Messages from "../../utils/messages";
import { snackbar } from "../../utils/events";
import form from "../../mixins/form";

export default {
  props: {
    viewMode: {
      type: Boolean,
      required: true
    }
  },
  mixins: [form],
  components: {
  },
  data() {
    return {
      valid: false,
      Messages,
      modalInViewMode: false,
      selectedEvent: null,
      id: "",
      total: 0,
      sale: {},
      events: [],
      products: [],
      items: [
        {
          name: null,
          price: 1,
          numberOfItems: 1,
          subtotal: 1
        }
      ]
    };
  },
  async mounted() {
    this.id = this.$route.params.id;
    this.dataInit();
    await this.getEvents();
    await this.getProducts();
  },
  // computed: {
  //   calculateTotal: function () {
  //     return this.items.map(item => item.subtotal).reduce((prev, next) => prev + next);
  //   }
  // },
  methods: {
    async dataInit() {
      if (this.id) {
        this.updateLoading(true);
        await this.getById();
        this.updateLoading(false);
      }
    },
    async getById() {
      try {
        this.sale = await getRequest(`sale/${this.id}`, false);
      } catch (error) {
        console.error(error);
        const message = getErrorMessage(error, Messages.SomethingWentWrong());
        snackbar(message);
      }
    },
    async getEvents() {
      try {
        this.events = await getRequest("event/search", false);
      } catch (error) {
        console.error(error);
        const message = getErrorMessage(error, Messages.SomethingWentWrong());
        snackbar(message);
      }
    },
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
    async save() {
      if (!this.$refs.form.validate()) {
        snackbar(Messages.IncompleteForm());
        return;
      }
      try {
        this.updateLoading(true);
        if (this.id) {
          await this.update();
          snackbar(Messages.CRUDOperationSuccess("actualizado"));
        } else {
          await this.create();
          snackbar(Messages.CRUDOperationSuccess("creado"));
        }
        this.$router.go(-1);
      } catch (error) {
        console.error(error);
        const message = getErrorMessage(error, Messages.SomethingWentWrong());
        snackbar(message);
      }
      this.updateLoading(false);
    },
    async create() {
      this.sale = {
        createdBy: this.$cookies.get("user_id"),
        event: this.selectedEvent,
        items: this.items,
        total: this.total
      }
      await postRequest("sale", this.sale, false);
    },
    async update() {
      await patchRequest(`sale/${this.id}`, this.sale, false);
    },
    addItem() {
      this.items.push({
        name: null,
        price: 1,
        numberOfItems: 1
      });
    },
    deleteItem(index) {
      if (this.items.length > 1) {
        this.items.splice(index, 1);
      }
    },
    calculateTotal() {
      this.total = this.items.map(item => item.subtotal).reduce((prev, next) => prev + next);
    },
    calculateSubtotal(index) {
      this.items[index].subtotal = this.items[index].price * this.items[index].numberOfItems
      this.calculateTotal();
    },
    autocompleteProduct(index, id) {
      this.product = this.products[this.products.findIndex(x => x._id === id)];
      this.items[index].productId = this.product._id;
      this.items[index].name = this.product.name;
      this.items[index].price = this.product.price;
      this.items[index].stock = this.product.stock;
      this.calculateSubtotal(index);
    }
  }
};
</script>
