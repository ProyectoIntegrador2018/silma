import { Schema, model } from "mongoose";
import { validateEmail } from "@/utils/validators";
import beautifyUnique from "mongoose-beautiful-unique-validation";

export const WriterSchema = new Schema({
  name: {
    type: String,
    required: "Name is required",
  },
  pseudonym: { type: String },
  email: {
    type: String,
    required: "Email address is required",
    unique: "User with email {VALUE} already registered as a writer",
    index: true,
    validate: [validateEmail, "Invalid email address"],
  },
  birthdate: {
    type: Date,
    required: "Date of birth is required",
  },
  nationality: {
    type: String,
    required: "Nationality is required",
  },
  phase: { type: Number, default: 1, min: 1, max: 4 },
  isPlus: { type: Boolean, default: false },
});
WriterSchema.plugin(beautifyUnique);

export const WriterModel = model("Writer", WriterSchema);
