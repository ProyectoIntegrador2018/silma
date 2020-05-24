<template>
    <v-container>
    <v-form ref="form">
        <v-text-field
            label="Mover a fase"
            outlined
            :rules="[requiredRule, numericRule, phasesRule]"
            v-model="newPhase"
        ></v-text-field>
    </v-form>
    <v-btn @click="create" class="btn btn-indigo">Agregar</v-btn>
    </v-container> 
</template>

<script>
import axios from 'axios';
import {requiredRule, numericRule, phasesRule} from '@/utils/rules';

export default {
    data(){
        return {
          newPhase: '',
          textid:'5ebce5e413a35c2c08bdb109',
          requiredRule,
          numericRule,
          phasesRule
        }
    },
    methods: {
    async create() {
      if (!this.$refs.form.validate()) {
        return;
      }
      try {
        const token = this.$cookies.get('token');
        await axios.post("http://localhost:3000/api/admins/texts/movePhase/"+ this.textid, {newPhase: this.newPhase}, { headers: {"Authorization" : 'Bearer ' + token} });
        this.dialogSuccess = true
      } catch (error) {
            console.log(error.response.data)
            this.dialogError = true
      }
    }
  }
}
</script>