<template>
  <v-menu v-model="menu" :close-on-content-click="false" max-width="290">
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
        @input="updateDate"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      header-color="green lighten-1"
      color="green lighten-1"
      @change="menu = false"
      @input="updateDate"
    ></v-date-picker>
  </v-menu>
</template>

<script>
import moment from "moment";

export default {
  data: () => ({
    date: "",
    menu: false
  }),
  props: ["label", "rules", "icon"],
  computed: {
    // Shows the formatted date
    computedDateFormattedMomentjs() {
      return this.date ? moment(this.date).format("dddd, MMMM Do YYYY") : "";
    }
  },
  methods: {
    // Changes the date.
    updateDate(date) {
      const newDate = new Date(date);
      this.$emit("input", newDate);
    }
  }
};
</script>