<template>
  <v-app id="inspire">
    <h1 
    v-if="inventoryId === undefined && userId != writerId"
    align="center"
    > No existe ese inventario</h1>
    <v-content
    v-else
    >
      <div align="center">
        <h1>Inventario</h1>
        <v-dialog v-model="dialog" persistent max-width="2000px">
          <template v-slot:activator="{ on }" v-if="userId == writerId">
            <v-btn color="primary" dark v-on="on">Agregar item</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{edit ? "Editar item" : "Agregar item"}}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                  <v-form ref="form">
                    <v-layout row wrap>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          outlined
                          label="Nombre"
                          :rules="[requiredRule]"
                          v-model="itemData.name"
                        ></v-text-field>
                      </v-col>
                    </v-layout>
                    <v-layout row wrap>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          outlined
                          label="Descripcion"
                          :rules="[requiredRule]"
                          v-model="itemData.description"
                        ></v-text-field>
                      </v-col>
                    </v-layout>
                    <v-layout row wrap>
                      <v-col cols="12" sm="6">
                        <v-text-field
                        outlined
                        :rules="[requiredRule, numericRule]"
                        label="Precio"
                        v-model="itemData.price"
                        prefix="$"
                        ></v-text-field>
                      </v-col>
                    </v-layout>
                    <v-layout row wrap>
                      <v-col cols="12" sm="6">
                        <v-text-field
                        outlined
                        :rules="[requiredRule, numericRule]"
                        label="Cantidad disponible"
                        v-model="itemData.stock"
                        ></v-text-field>
                      </v-col>
                    </v-layout>
                    <v-layout row wrap>
                      <v-col cols="12" sm="6">
                        <v-text-field
                        outlined
                        :rules="[requiredRule, linkRule]"
                        label="link"
                        v-model="itemData.link"
                        ></v-text-field>
                      </v-col>
                    </v-layout>
                  </v-form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="addOrEditItem()"
                >{{edit ? "Guardar" : "Agregar"}}</v-btn
              >
              <v-btn text @click="closeDialog()"
                >Cerrar</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog >
        <v-dialog v-model="isDeleting" v-if="isDeleting">
          <v-card>
            <v-card-title>
              <span class="headline">¿Estas seguro de borrar {{currentItem.name}}?</span>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="deleteItem(currentItem._id)"
                >Si</v-btn
              >
              <v-btn text @click="closeDialog()"
                >No</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-row >
          <v-col v-for="item in this.items" :key="item._id" cols="12" sm="6" md="3">
            <v-card
            class="mx-auto my-8"
            max-width="374"
            >
              <template slot="progress">
              <v-progress-linear
                  color="deep-purple"
                  height="10"
                  indeterminate
              ></v-progress-linear>
              </template>

              <v-img
              height="250"
              src="https://semantic-ui.com/images/wireframe/image.png"
              
              ></v-img>

              <v-card-title>{{item.name}}
                <v-spacer/>
                <v-btn
                v-if="userId == writerId"
                icon
                color="grey"
                @click="editItem(item)"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-card-title>

              <v-card-text class="text-left">
              <div>{{item.description}}</div>
              </v-card-text>

              <v-card-title style="margin-bottom:-20px">
                <v-spacer></v-spacer>
                $ {{item.price}}</v-card-title>
              <v-card-text class="text-right" style="margin-bottom:-20px">
              <div>Cantidad: {{item.stock}}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn
                v-if="userId == writerId"
                icon
                color="grey"
                @click="openDelete(item)"
                >
                  <v-icon>mdi-trash-can-outline</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  color="deep-purple lighten-2"
                  text
                  @click="goTo(item.link)"
                  >
                    Ver producto
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import { getRequest, postRequest, patchRequest } from "@/utils/requests";
import {
  requiredRule,
  numericRule,
  linkRule
} from "@/utils/rules";

export default {
  components: {
  },
  data() {
    return {
      inventoryId: undefined,
      userId: null,
      writerId: null,
      writerName: undefined,
      items: [],
      dialog: false,
      itemData: {
        name: "",
        description: "",
        price: null,
        stock: null,
        link: ""
      },
      currentItem: undefined,
      dialogSuccess: false,
      dialogError: false,
      edit: false,
      isDeleting: false,
      requiredRule,
      numericRule,
      linkRule
    };
  },
   mounted() {
    this.writerId = this.$route.params.id;
    this.userId = this.$cookies.get("user_id");
    if(this.writerId === undefined) this.$router.push('/')
    this.getInventories();
  },
  methods: {
      async getInventories(){
        const token = this.$cookies.get("token");
        try{
          const inventory = await getRequest(`inventoryByWriter/`+this.writerId, token);
          console.log(this.writerId)
          console.log(inventory)
          this.inventoryId = inventory._id
          this.items = inventory.items
        }
        catch(error){
          console.log(error)
        }
      },

      async addOrEditItem(){
          if (!this.$refs.form.validate()) {
              return;
          }
          var dataItem = this.itemData
          const token = this.$cookies.get("token");
          let inventoryId = this.inventoryId
          const itemId = this.currentItem
          try{
              let results
              if(!inventoryId){
                const writerId = this.$cookies.get("user_id");
                const inventory = await postRequest("inventory", dataItem, token, false, {writerId});
                this.inventoryId = inventory._id
                inventoryId = inventory._id
              }
              if(!this.edit) results = await postRequest("product", dataItem, token, false, {inventoryId});
              else results = await patchRequest("product/edit", dataItem, token, false, {id: itemId});
              console.log(results)
              if(this.items !== undefined){
                const itemIndex = this.items.findIndex((el) => el._id === results._id);
                if(itemIndex !== -1) this.items[itemIndex] = results
                else this.items.push(results)
              }
              else this.items = [results]
          }
          catch(error){
              console.log(error)
          }
          this.closeDialog()
      },

      editItem(item){
        this.itemData = {
          name: item.name,
          description: item.description,
          price: item.price,
          stock: item.stock,
          link: item.link
        }
        this.edit = true
        this.currentItem = item._id
        this.dialog = true
      },

      openDelete(item){
        this.currentItem = item
        this.isDeleting = true
      },

      async deleteItem(itemId){
          try{
            const token = this.$cookies.get("token");
            const inventoryId = this.inventoryId
            const results = await patchRequest("product/delete", {}, token, false, {id: itemId, inventoryId});
            this.items = this.items.filter((item) => item._id != itemId)
          }
          catch(error){
              console.log(error)
          }
          this.closeDialog();
      },

      closeDialog(){
          this.dialog = false
          this.isDeleting = false
          this.$refs.form.reset()
          this.currentItem = undefined;
          this.edit = false
      },
      goTo(link){
        window.open(link, '_blank')
      }

  }
}
</script>

<style scoped>

.itemsContainer{
  display: flex;
  flex-direction: row;
}

.cardDescription{
  text-justify: initial;
}
</style>