import { Schema, model } from "mongoose";
import { validateEmail, validatePhone, validateURL } from "@/utils/validators";
import beautifyUnique from "mongoose-beautiful-unique-validation";

export const ReaderSchema = new Schema({
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
  birthdate: {
    type: Date,
    required: "Date of birth is required",
  },
  phone: {
    type: String,
    required: "Phone is required",
    validate: [validatePhone, "Invalid phone"],
  },
  facebookLink: {
    type: String,
    validate: [validateURL, "Invalid URL"],
  },
  // TODO: Add loved genres as property.
  // TODO: Add available dates to read property.
  // TODO: Add recommended by property.
  readingProficiency: {
    type: String,
    enum: ["3 or less", "4 to 6", "7 or more"],
    default: "4 to 6",
  },
});
ReaderSchema.plugin(beautifyUnique);

export const ReaderModel = model("Reader", ReaderSchema);
