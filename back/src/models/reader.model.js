import { Schema, model } from "mongoose";
import {  validateURL } from "@/utils/validators";
import beautifyUnique from "mongoose-beautiful-unique-validation";

export const ReaderSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
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
