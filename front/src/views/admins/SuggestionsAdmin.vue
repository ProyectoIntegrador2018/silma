<template>
<div>
    <v-btn small color="primary" depressed @click="seeId()">Sugerencias</v-btn>

</div>

</template>


<script>


export default {
  components: {
  },
  data() {
    return {

    }
      
  },
  created() {

  },
  asyncComputed: {
    
    
  },
  methods: {
   seeId(){
     console.log(this.$route.params)
   }
  }
};
</script>
