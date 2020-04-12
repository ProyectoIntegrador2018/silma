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
      <userMenu/>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      
    </v-app-bar>
    <v-content>
        <div align="center">
            <br>
            <h1>¡Bienvenido a Silma!</h1>
            <a>Registra tu primer libro aquí</a>
            <myBooksSection/>
        </div>  
    </v-content>
    
  </v-app>
</template>

<script>
    import userMenu from '@/components/userMenu.vue';
    import myBooksSection from '@/components/lectorBooksSection.vue';
    export default{
    components: {
        userMenu,
        myBooksSection,
    }
    }
</script>