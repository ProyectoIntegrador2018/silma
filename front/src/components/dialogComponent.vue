<template>
  <v-dialog
    v-model="dialog"
    :max-width="styleOptions.width"
    :style="{ zIndex: styleOptions.zIndex }"
    @keydown.esc="cancel"
  >
    <v-card>
      <v-toolbar dark :color="styleOptions.color" dense flat>
        <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text v-show="!!message" class="pa-4">{{ message }}</v-card-text>
      <v-card-actions class="pt-0">
        <v-spacer></v-spacer>
        <v-btn color="primary darken-1" text @click.native="agree">Si</v-btn>
        <v-btn color="grey" text @click.native="cancel">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    onAccept: null,
    onReject: null,
    message: null,
    title: null,
    styleOptions: {
      color: "primary",
      width: 290,
      zIndex: 200,
    },
  }),
  methods: {
    //Activa el dialogo de confirmación con los parametros enviados.
    open(options) {
      const { title, message, styleOptions, onAccept, onReject } = options;
      this.dialog = true;
      this.title = title;
      this.message = message;
      this.styleOptions = Object.assign(this.styleOptions, styleOptions);
      this.onAccept = onAccept;
      this.onReject = onReject;
    },
    //Regresa el resultado True para confirmar la acción
    agree() {
      if (typeof this.onAccept === "function") this.onAccept();
      this.dialog = false;
      this.onAccept = null;
    },
    //Regresa el resultado False para cancelar la acción
    cancel() {
      if (typeof this.onReject === "function") this.onReject();
      this.dialog = false;
      this.onReject = null;
    },
  },
};
</script>
