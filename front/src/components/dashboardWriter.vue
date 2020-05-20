<template>
  <div class="ma-4">
    <h2>Tus escritos</h2>
    <v-btn color="primary" dark class="mb-2" href="/Agregar_Escrito"
      >Agregar Escrito</v-btn
    >

    <Table :headers="headers" :items="data"> </Table>
  </div>
</template>

<script>
import Table from "@/components/table.vue";
import axios from 'axios';

export default {
  components: {
    Table,
  },
  props: ["tripId", "ticketId"],
  data() {
    return {
      headers: [
        {
          text: "Título",
          align: "start",
          sortable: false,
          value: "title",
        },
        { text: "Número de páginas", value: "numberOfPages" },
        { text: "Status", value: "phase", color: "red" },
      ],
      data: [],
      writer: this.$cookies.get("user_id"),
      role: this.$cookies.get("user_type"),
    };
  },
  created() {
    this.initialize();
  },
  asyncComputed: {
      async getTexts(){
        const token = this.$cookies.get('token');
        const response = await axios.get(`http://localhost:3000/api/texts/writer/${this.writer}`, { headers: {"Authorization" : 'Bearer ' + token} });
        console.log(response.data)
        this.data = response.data
      }
  },
  methods: {
    initialize() {
      /*this.data = [
        {
          name: "Cumbres Borroscosas",
          fecha: "12/09/2019",
          status: 1,
        },
        {
          name: "The Lord of the Rings",
          fecha: "11/01/2020",
          status: 0,
        },
        {
          name: "El Alquimista",
          fecha: "10/11/2008",
          status: 1,
        },
        {
          name: "El Principito",
          fecha: "03/01/2005",
          status: 2,
        },
      ];*/
    },
    getColor (status) {
            if (status == 0) return 'red'
            else if (status == 1) return 'green'
            else return 'yellow'
      },
  },
};
</script>
