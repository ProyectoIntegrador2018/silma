<template>
        <v-btn @click="create" class="btn btn-indigo">Agregar</v-btn>  
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return {
          textid:'5ebce5e413a35c2c08bdb109'
        }
    },
    methods: {
    async create() {
      try {
        const token = this.$cookies.get('token');
        await axios.post("http://localhost:3000/api/admins/texts/movePhase/"+ this.textid, {}, { headers: {"Authorization" : 'Bearer ' + token} });
        this.dialogSuccess = true
      } catch (error) {
            console.log(error.response.data)
            this.dialogError = true
      }
    }
  }
}
</script>