import { Schema, model } from "mongoose";
import beautifyUnique from "mongoose-beautiful-unique-validation";

export const AdminSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  isSuperAdmin: { type: Boolean, default: false },
});
AdminSchema.plugin(beautifyUnique);

export const AdminModel = model("Admin", AdminSchema);
