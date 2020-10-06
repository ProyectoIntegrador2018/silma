import { Schema, model } from "mongoose";
import { onSaveValidation } from "../validations/role.validation";

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
  reportRead: {
    type: Boolean,
    default: false
  },
  reportCreate: {
    type: Boolean,
    default: false
  },
  reportEdit: {
    type: Boolean,
    default: false
  },
  reportDelete: {
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
  }
});

RoleSchema.pre("save", async function (next) {
  await onSaveValidation(this);
  next();
});

const RoleModel = model("Role", RoleSchema);

export default RoleModel;
