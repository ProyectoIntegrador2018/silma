<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <v-card>
      <v-card-title class="headline">
        Subgénero
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" class="main-container">
          <v-text-field
            v-model="subgenre.name"
            :rules="[(x) => !!x || Messages.RequiredField()]"
            :disabled="viewMode"
          >
            ><template slot="prepend"
              >Nombre<span style="color: red">*</span></template
            ></v-text-field
          >
          <v-textarea v-model="subgenre.description" :disabled="viewMode">
            ><template slot="prepend">Descripción</template></v-textarea
          >
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" :disabled="false" @click="close"
          >Cancelar</v-btn
        >
        <v-btn color="primary" :disabled="viewMode" @click="save"
          >Guardar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>

<script>
import Messages from "../utils/messages";
import { snackbar } from "../utils/events";

export default {
  name: "SubgenreFormModal",
  props: {
    subgenreEdit: {
      type: Object
    },
    viewMode: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      Messages,
      dialog: true,
      valid: true,
      subgenre: {
        name: "",
        description: ""
      }
    };
  },
  mounted() {
    if (this.subgenreEdit) this.subgenre = { ...this.subgenreEdit };
  },
  methods: {
    save() {
      if (!this.$refs.form.validate()) {
        snackbar(Messages.IncompleteForm());
        return;
      }
      this.$emit("save", this.subgenre);
    },
    close() {
      this.$emit("close");
    }
  }
};
</script>
