import { Schema, model } from "mongoose";
import { validateEmail, validatePhone } from "@/utils/validators";
import beautifyUnique from "mongoose-beautiful-unique-validation";

export const UserSchema = new Schema({
  name: {
    type: String,
    required: "Name is required"
  },
  password: {
    type: String,
    select: false,
    required: "Password is required"
  },
  email: {
    type: String,
    required: "Email address is required",
    unique: "User with email {VALUE} already registered",
    index: true,
    validate: [validateEmail, "Invalid email address"]
  },
  birthdate: {
    type: Date,
    required: "Date of birth is required"
  },
  phone: {
    type: String,
    required: "Phone is required",
    validate: [validatePhone, "Invalid phone"]
  },
  nationality: {
    type: String,
    required: "Nationality is required"
  },
  // This roles define the type of user
  roles: [
    {
      type: String,
      enums: ["admin", "writer", "reader"],
      default: []
    }
  ]
});
UserSchema.plugin(beautifyUnique);

export const UserModel = model("User", UserSchema);
