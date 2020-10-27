<template>
  <v-container>
    <h1>Género</h1>
    <v-form ref="form" v-model="valid" class="main-container">
      <v-text-field
        v-model="genre.name"
        :rules="[(x) => !!x || Messages.RequiredField()]"
        :disabled="viewMode"
      >
        ><template slot="prepend"
          >Nombre<span style="color: red">*</span></template
        ></v-text-field
      >
      <v-textarea v-model="genre.description" :disabled="viewMode">
        ><template slot="prepend">Descripción</template></v-textarea
      >
      <h2>Subgéneros</h2>
      <div class="add-btn-container" v-if="!viewMode">
        <v-btn
          color="primary"
          @click.stop="() => (showSubgenreFormModal = true)"
          >Agregar</v-btn
        >
      </div>
      <Table :items="genre.subgenres" :headers="subgenresTableHeaders">
        <template #actions="{ props }">
          <div class="actions-wrapper">
            <v-btn
              small
              color="success"
              :disabled="false"
              depressed
              @click="() => openSubgenre(props, true)"
              >Ver</v-btn
            >
            <v-btn
              small
              color="primary"
              :disabled="viewMode"
              depressed
              @click="() => openSubgenre(props, false)"
              >Editar</v-btn
            >
            <v-btn
              small
              color="error"
              :disabled="viewMode"
              depressed
              @click="() => deleteSubgenre(props)"
              >Eliminar</v-btn
            >
          </div>
        </template>
      </Table>
    </v-form>
    <SubgenreFormModal
      v-if="showSubgenreFormModal"
      :viewMode="viewMode || modalInViewMode"
      :subgenreEdit="subgenreEdit"
      @save="addSubgenre"
      @close="closeSubgenreModal"
    ></SubgenreFormModal>
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
import Table from "../../components/table";
import SubgenreFormModal from "../../components/SubgenreFormModal";
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
    Table,
    SubgenreFormModal
  },
  data() {
    return {
      valid: true,
      Messages,
      showSubgenreFormModal: false,
      subgenreEdit: null,
      subgenreEditIndex: -1,
      modalInViewMode: false,
      id: "",
      genre: {
        name: "",
        description: "",
        subgenres: [],
        subgenresToDelete: []
      },
      subgenresTableHeaders: [
        { text: "Nombre", value: "name" },
        { text: "Descripción", value: "description" },
        { text: "Acciones", sortable: false, actions: true }
      ]
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
        const genre = await getRequest(`genre/${this.id}`, false);
        this.genre = { ...this.genre, ...genre };
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
      await postRequest("genre", this.genre, false);
    },
    async update() {
      await patchRequest(`genre/${this.id}`, this.genre, false);
    },
    openSubgenre(subgenre, viewMode) {
      this.subgenreEdit = { ...subgenre };
      this.subgenreEditIndex = this.genre.subgenres.findIndex(
        (x) => x === subgenre
      );
      this.modalInViewMode = viewMode;
      this.showSubgenreFormModal = true;
    },
    closeSubgenreModal() {
      this.subgenreEdit = null;
      this.subgenreEditIndex = -1;
      this.modalInViewMode = false;
      this.showSubgenreFormModal = false;
    },
    addSubgenre(subgenre) {
      if (this.subgenreEditIndex !== -1)
        this.genre.subgenres = this.genre.subgenres.filter(
          (_, index) => index !== this.subgenreEditIndex
        );
      this.genre.subgenres.push(subgenre);
      this.closeSubgenreModal();
    },
    deleteSubgenre(subgenre) {
      this.genre = {
        ...this.genre,
        subgenres: this.genre.subgenres.filter((x) => x !== subgenre)
      };
      this.genre.subgenresToDelete.push(subgenre);
    }
  }
};
</script>
