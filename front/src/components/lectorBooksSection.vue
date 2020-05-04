<template>
  <v-data-table
    :headers="headers"
    :items="data"
    sort-by="status"
    class="elevation-1"
  >
     
    <template v-slot:top>
        
      <v-toolbar flat color="white">
        <v-toolbar-title>Tus Escritos</v-toolbar-title>
        

        
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
            
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="Titulo"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.fecha" label="Fecha"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>

    <template v-slot:item.status="{ item }">
        <v-chip :color="getColor(item.status)" dark>{{ item.status }}</v-chip>
      </template>

    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Agregar mi primer escrito</v-btn>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Título',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Fecha de registro', value: 'fecha' },
        { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      data: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        fecha: '',
        status: 0,
      },
      defaultItem: {
        name: '',
        fecha: '',
        status: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Título' : 'Editar Título'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.data = [
          {
            name: 'Cumbres Borroscosas',
            fecha: '12/09/2019',
            status: 1,
          },
          {
            name: 'The Lord of the Rings',
            fecha: '11/01/2020',
            status: 0,
          },
          {
            name: 'El Alquimista',
            fecha: '10/11/2008',
            status: 1,
          },
          {
            name: 'El Principito',
            fecha: '03/01/2005',
            status: 2,
          },
        ]
      },

      editItem (item) {
        this.editedIndex = this.data.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.data.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.data.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.data[this.editedIndex], this.editedItem)
        } else {
          this.data.push(this.editedItem)
        }
        this.close()
      },
        getColor (status) {
            if (status == 0) return 'red'
            else if (status == 1) return 'green'
            else return 'yellow'
      },

    },
  }
</script>