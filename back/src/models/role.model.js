import { Schema, model } from "mongoose";
import {
  onDeleteValidation,
  onSaveValidation
} from "../validations/role.validation";

export const RoleSchema = new Schema({
  code: {
    type: String,
    required: "Code is required"
  },
  name: {
    type: String,
    unique: true,
    required: "Name is required"
  },
  isBaseRole: {
    type: Boolean,
    default: false
  },
  inventoriesRead: {
    type: Boolean,
    default: true
  },
  readingRead: {
    type: Boolean,
    default: false
  },
  readingCreate: {
    type: Boolean,
    default: false
  },
  readingEdit: {
    type: Boolean,
    default: false
  },
  readingDelete: {
    type: Boolean,
    default: false
  },
  bookRead: {
    type: Boolean,
    default: false
  },
  bookCreate: {
    type: Boolean,
    default: false
  },
  bookEdit: {
    type: Boolean,
    default: false
  },
  bookDelete: {
    type: Boolean,
    default: false
  },
  phaseRead: {
    type: Boolean,
    default: false
  },
  phaseCreate: {
    type: Boolean,
    default: false
  },
  phaseEdit: {
    type: Boolean,
    default: false
  },
  phaseDelete: {
    type: Boolean,
    default: false
  },
  userRead: {
    type: Boolean,
    default: false
  },
  userCreate: {
    type: Boolean,
    default: false
  },
  userEdit: {
    type: Boolean,
    default: false
  },
  userDelete: {
    type: Boolean,
    default: false
  },
  eventRead: {
    type: Boolean,
    default: false
  },
  eventCreate: {
    type: Boolean,
    default: false
  },
  eventEdit: {
    type: Boolean,
    default: false
  },
  eventDelete: {
    type: Boolean,
    default: false
  },
  reportsRead: {
    type: Boolean,
    default: false
  },
  reportsCreate: {
    type: Boolean,
    default: false
  },
  reportsEdit: {
    type: Boolean,
    default: false
  },
  reportsDelete: {
    type: Boolean,
    default: false
  },
  roleRead: {
    type: Boolean,
    default: false
  },
  roleCreate: {
    type: Boolean,
    default: false
  },
  roleEdit: {
    type: Boolean,
    default: false
  },
  roleDelete: {
    type: Boolean,
    default: false
  },
  genreRead: {
    type: Boolean,
    default: false
  },
  genreCreate: {
    type: Boolean,
    default: false
  },
  genreEdit: {
    type: Boolean,
    default: false
  },
  genreDelete: {
    type: Boolean,
    default: false
  },
  advancePhase: {
    type: Boolean,
    default: false
  },
  pointOfSaleRead: {
    type: Boolean,
    default: false
  },
  pointOfSaleCreate: {
    type: Boolean,
    default: false
  },
  pointOfSaleEdit: {
    type: Boolean,
    default: false
  },
  pointOfSaleDelete: {
    type: Boolean,
    default: false
  },
  saleRead: {
    type: Boolean,
    default: false
  },
  saleCreate: {
    type: Boolean,
    default: false
  },
  saleEdit: {
    type: Boolean,
    default: false
  },
  saleDelete: {
    type: Boolean,
    default: false
  },
});

RoleSchema.pre("save", async function (next) {
  await onSaveValidation(this);
  next();
});

RoleSchema.pre("remove", async function (next) {
  await onDeleteValidation(this);
  next();
});

const RoleModel = model("Role", RoleSchema);

export default RoleModel;
