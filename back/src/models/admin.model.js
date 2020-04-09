import { Schema, model } from "mongoose";
import { validateEmail } from "@/utils/validators";
import beautifyUnique from "mongoose-beautiful-unique-validation";

export const AdminSchema = new Schema({
  name: {
    type: String,
    required: "Name is required",
  },
  email: {
    type: String,
    required: "Email address is required",
    unique: "User with email {VALUE} already registered as an admin",
    index: true,
    validate: [validateEmail, "Invalid email address"],
  },
  isSuperAdmin: { type: Boolean, default: false },
});
AdminSchema.plugin(beautifyUnique);

export const AdminModel = model("Admin", AdminSchema);
