<template>
  <div class="ma-4">
    <v-container v-if="suggestionExists">
    <h2 v-if="status">Tus Sugerencias</h2>
    <h2 v-else>Tu Lectura</h2>
    <br>
    <v-card
      class="mx-auto"
      max-width="344"
    >
      <v-card-title>
        {{text.title}}
      </v-card-title>
      <v-card-subtitle>
        {{text.description}}
      </v-card-subtitle>
      <v-card-actions v-if="status">
        <v-btn @click="accept()" color="green" text>Aceptar</v-btn>
        <v-btn @click="reject()" color="red" text>Rechazar</v-btn>
      </v-card-actions>
      <v-card-actions v-else>
        <v-btn color="purple" text :href="'/Mis_Lecturas/'+this.suggestion._id">Continuar lectura</v-btn>
      </v-card-actions>
    </v-card>
     <br>
    </v-container>
    <v-container v-else>
      <h2>No tienes lecturas ni sugerencias por el momento</h2>
    </v-container>  
    <h2>Tus Historial de lecturas</h2>
     <br>
    <Table :headers="headers" :items="data"> </Table>
  </div>
</template>

<script>
import Table from "@/components/table.vue";
import {errorServerRegister} from '@/utils/constants.js';
import { getRequest, postRequest } from "@/utils/requests";

export default {
  components: {
    Table,
  },
  data() {
    return {
      headers: [
        { text: "Título", align: "start", value: "title"},
        { text: "Fecha en que se recibio sugerencia:", value: "sentDate"},
        { text: "Estado", value: "suggestionStatus"},
      ],
      data: [],
      history: '',
      reader: this.$cookies.get("user_id"),
      role: this.$cookies.get("user_type"),
      suggestion: {},
      text: {},
      suggestionExists: false,
      status: true,
      errorMessage: '',
      errorServerRegister,
      token: ''
    };
  },
  async created() {
    await this.getInfo();
    await this.getHistory();
  },
  asyncComputed: {
    
  },
  methods: {
      async accept(){
        try {
          await postRequest('/suggestions/'+this.suggestion._id+'/accept', {} ,this.token)
          await this.getInfo()
          await this.getHistory()
        } catch (error) {
          this.errorMessage = this.errorServerRegister
          this.dialogError = true
        }
      },
      async reject(){
        try {
          await postRequest('/suggestions/'+this.suggestion._id+'/reject', {} ,this.token)
          this.suggestionExists = false
          await this.getInfo()
          await this.getHistory()
        } catch (error) {
          this.errorMessage = this.errorServerRegister
          this.dialogError = true
        }
      },
      async getInfo(){
          this.token = this.$cookies.get('token');
          this.suggestion = await getRequest('/suggestions/getSuggestionDashboard/' + this.reader, this.token);
          if(!(this.suggestion == false)){
              //Has a suggestion or ongoing text
              this.suggestionExists = true
              this.text = await getRequest('/texts/' + this.suggestion.text, this.token);
              if(this.suggestion.suggestionStatus == "Accepted")
                this.status = false
          }
      },
      async composeHistory(){
            var i;
            var text;
            var data = [];
            for(i = 0; i < this.history.length; i++) {
                text = await getRequest('/texts/' + this.history[i].text, this.token);
                data.push({
                  title: text.title,
                  sentDate: this.history[i].sentDate,
                  suggestionStatus: this.history[i].suggestionStatus
                })
            }
            this.data = data
      },
      async getHistory(){
        this.token = this.$cookies.get('token');
        this.history = await getRequest('/suggestions/getAllSuggestionsDashboard/' + this.reader, this.token);
        await this.composeHistory()
      },
  }
};
</script>
