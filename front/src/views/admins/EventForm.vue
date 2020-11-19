<template>
  <v-container>
    <h1>Evento</h1>
    <v-form ref="form" v-model="valid" class="main-container">
      <v-text-field
        v-model="event.name"
        :rules="[(x) => !!x || Messages.RequiredField()]"
        :disabled="viewMode"
      >
        ><template slot="prepend"
          >Nombre<span style="color: red">*</span></template
        ></v-text-field
      >
      <v-text-field
        v-model="event.description"
        :rules="[true]"
        :disabled="viewMode"
      >
        ><template slot="prepend"
          >Descripción</template
        ></v-text-field>
      <v-text-field
        v-model="event.place"
        :rules="[(x) => !!x || Messages.RequiredField()]"
        :disabled="viewMode"
      >
        ><template slot="prepend"
          >Lugar<span style="color: red">*</span></template
        ></v-text-field
      >

        <v-layout justify-space-between wrap>
        <v-flex xs12 sm6 class="my-3">
            <v-date-picker
                v-model="event.date"
                locale="es"
                landscape
                :disabled="viewMode"
            ></v-date-picker>
        </v-flex>
        <v-flex xs12 sm6 class="my-3">
            <v-time-picker
                format="24hr"
                v-model="event.time"
                landscape   
                :disabled="viewMode"
            ></v-time-picker>
        </v-flex>
        </v-layout>
        
    </v-form>
    <div class="bottom-buttons-wrapper">
      <v-btn
        color="secondary"
        :disabled="false"
        @click="
          () => {
            $router.go(-1);
          }
        "
        >Cancelar</v-btn
      >
      <v-btn color="primary" :disabled="loading || viewMode" @click="save"
        >Guardar</v-btn
      >
    </div>
  </v-container>
</template>

<style scoped>
.main-container {
  width: 100%;
}
</style>

<script>
import {
  patchRequest,
  getRequest,
  postRequest
} from "../../utils/requestsNoErr";
import { getErrorMessage } from "../../utils/utils";
import Messages from "../../utils/messages";
import { snackbar } from "../../utils/events";
import form from "../../mixins/form";

export default {
  props: {
    viewMode: {
      type: Boolean,
      required: true
    }
  },
  mixins: [form],
  components: {

  },
  data() {
    return {
      valid: true,
      Messages,
      modalInViewMode: false,
      id: "",
      event:{
          name: "",
          place: "",
          description: "",
          date: "",
          time: ""
      },
      datePicker: "",
      timePicker: ""
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.dataInit();
  },
  methods: {
    async dataInit() {
      if (this.id) {
        this.updateLoading(true);
        await this.getById();
        this.updateLoading(false);
      }
    },
    async getById() {
      try {
        this.event = await getRequest(`event/${this.id}`, false);
      } catch (error) {
        console.error(error);
        const message = getErrorMessage(error, Messages.SomethingWentWrong());
        snackbar(message);
      }
    },
    async save() {
      if (!this.$refs.form.validate()) {
        snackbar(Messages.IncompleteForm());
        return;
      }
      try {
        this.updateLoading(true);
        if (this.id) {
          await this.update();
          snackbar(Messages.CRUDOperationSuccess("actualizado"));
        } else {
          await this.create();
          snackbar(Messages.CRUDOperationSuccess("creado"));
        }
        this.$router.go(-1);
      } catch (error) {
        console.error(error);
        const message = getErrorMessage(error, Messages.SomethingWentWrong());
        snackbar(message);
      }
      this.updateLoading(false);
    },
    async create() {
        await postRequest("event", this.event, false);
    },
    async update() {
      await patchRequest(`event/${this.id}`, this.event, false);
    }
  }
};
</script>
