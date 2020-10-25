<template>
  <div>
    <h1>Rol</h1>
    <v-form v-model="valid" ref="form">
      <v-text-field
        v-model="form.code"
        :rules="[(x) => !!x || Messages.RequiredField()]"
        :disabled="viewMode"
      >
        ><template slot="prepend"
          >Código<span style="color: red">*</span></template
        ></v-text-field
      >
      <v-text-field
        v-model="form.name"
        :rules="[(x) => !!x || Messages.RequiredField()]"
        :disabled="viewMode"
      >
        ><template slot="prepend"
          >Nombre<span style="color: red">*</span></template
        ></v-text-field
      >
      <PermissionsTable
        :role="form"
        @permissionChanged="updateRole"
        :viewMode="viewMode"
      ></PermissionsTable>
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
      <v-btn color="success" :disabled="loading || viewMode" @click="save"
        >Guardar</v-btn
      >
    </div>
  </div>
</template>

<style scoped></style>

<script>
import PermissionsTable from "../../components/PermissionsTable";
import Messages from "../../utils/messages";
import {
  postRequest,
  patchRequest,
  getRequest
} from "../../utils/requestsNoErr";
import { getErrorMessage } from "../../utils/utils";
import { snackbar } from "../../utils/events";
import form from "../../mixins/form";

export default {
  name: "RoleForm",
  components: {
    PermissionsTable
  },
  mixins: [form],
  props: {
    viewMode: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      valid: true,
      Messages,
      form: {
        name: "",
        readingRead: false,
        readingCreate: false,
        readingEdit: false,
        readingDelete: false,
        bookRead: false,
        bookCreate: false,
        bookEdit: false,
        bookDelete: false,
        phaseRead: false,
        phaseCreate: false,
        phaseEdit: false,
        phaseDelete: false,
        userRead: false,
        userCreate: false,
        userEdit: false,
        userDelete: false,
        eventRead: false,
        eventCreate: false,
        eventEdit: false,
        eventDelete: false,
        reportRead: false,
        reportCreate: false,
        reportEdit: false,
        reportDelete: false,
        roleRead: false,
        roleCreate: false,
        roleEdit: false,
        roleDelete: false,
        genreRead: false,
        genreCreate: false,
        genreEdit: false,
        genreDelete: false
      },
      id: ""
    };
  },
  methods: {
    updateRole(permission, value) {
      this.form[permission] = value;
    },
    async dataInit() {
      try {
        if (this.id) {
          this.form = await getRequest(`role/${this.id}`);
        }
      } catch (error) {
        const message = getErrorMessage(error, Messages.SomethingWentWrong());
        snackbar(message);
        this.$router.go(-1);
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
          await patchRequest(`role/${this.id}`, this.form);
          snackbar(Messages.CRUDOperationSuccess("actualizado"));
        } else {
          await postRequest("role", this.form);
          snackbar(Messages.CRUDOperationSuccess("creado"));
        }
        this.$router.go(-1);
      } catch (error) {
        const message = getErrorMessage(error, Messages.SomethingWentWrong());
        snackbar(message);
      }
      this.updateLoading(false);
    }
  },
  async mounted() {
    this.id = this.$route.params.id;
    this.updateLoading(true);
    await this.dataInit();
    this.updateLoading(false);
  }
};
</script>
