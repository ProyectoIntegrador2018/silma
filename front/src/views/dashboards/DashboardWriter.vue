<template>
  <v-app id="inspire">

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-btn icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <span class="hidden-sm-and-down">Luisa Pineda</span>
      </v-toolbar-title>
      
      <v-spacer />
      <typeOfUserSelection/>
      <notificationCenter/>
      
    </v-app-bar>
    <v-content>
        <div align="center">
            <br>
            <br>
            <h1>¡Bienvenido a Silma!</h1>
            <myBooksSection/>
        </div>  
    </v-content>
    
  </v-app>
</template>

<script>
    import typeOfUserSelection from '@/components/typeOfUserSelection.vue';
    import myBooksSection from '@/components/lectorBooksSection.vue';
    import notificationCenter from '@/components/notificationCenter.vue';
    export default{
    components: {
        typeOfUserSelection,
        myBooksSection,
        notificationCenter,
    }
    }
</script>