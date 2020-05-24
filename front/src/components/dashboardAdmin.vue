<template>
    <div>
      <h1>Initialized Admin</h1>
      <Table :headers="headers" :items="dataTexts"> </Table>

    </div>

</template>


<script>
import Table from "@/components/table.vue";
import { getRequest } from '@/utils/requests';

export default {
  components: {
    Table
  },
  data() {
    return {
      headers: [
        { text: "Título", align: "start", sortable: false, value: "title" }
      ],
      dataTexts: []
    };
  },
  created() {
  },
  asyncComputed: {
    async getTexts(){
      const token = this.$cookies.get('token');
      this.dataTexts = await getRequest('texts/', token)
   }
  },
  methods: {
    
     
  },
};
</script>
