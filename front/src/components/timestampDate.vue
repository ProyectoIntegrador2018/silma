<template>
  <v-container>
    <v-menu
        v-model="menu"
        :close-on-content-click="false"
        max-width="290"
    >
        <template v-slot:activator="{ on }">
        <v-text-field
            :value="computedDateFormattedMomentjs"
            clearable
            readonly
            :label="label"
            :rules="rules"
            :icon="icon"
            outlined
            v-on="on"
            @click:clear="date = null"
        ></v-text-field>
        </template>
        <v-date-picker
        v-model="date"
        header-color="green lighten-1"
        color="green lighten-1"
        @change="menu = false"
        ></v-date-picker>
    </v-menu>
  </v-container>
</template>

<script>
  import moment from 'moment'
  import format from 'date-fns/format'

  export default {
    data: () => ({
      date: new Date().toISOString().substr(0, 10),
      menu: false
    }),
    props: ['label', 'rules', 'icon'],
    computed: {
      computedDateFormattedMomentjs () {
        return this.date ? moment(this.date).format('dddd, MMMM Do YYYY') : ''
      },
      computedDateFormattedDatefns () {
        return this.date ? format(this.date, 'dddd, MMMM Do YYYY') : ''
      },
    },
  }
</script>