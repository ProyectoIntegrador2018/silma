import { Schema, model } from "mongoose";
import beautifyUnique from "mongoose-beautiful-unique-validation";

export const AdminSchema = new Schema({
  isSuperAdmin: {
    type: Boolean,
    default: false
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  // This role defines the access level of the admin
  role: { type: Schema.Types.ObjectId, ref: "Role" }
});
AdminSchema.plugin(beautifyUnique);

export const AdminModel = model("Admin", AdminSchema);
