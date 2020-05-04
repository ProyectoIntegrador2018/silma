import { Schema, model } from "mongoose";
import {  validateURL, minLengthRule } from "@/utils/validators";
import beautifyUnique from "mongoose-beautiful-unique-validation";

export const ReaderSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  facebookLink: {
    type: String,
    validate: [validateURL, "Invalid URL"],
  },
  readingProficiency: {
    type: String,
    enum: ["3 or less", "4 to 6", "7 or more"],
    default: "4 to 6",
  },
  preferences: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: "Genre"
    }],
    validate: [minLengthRule(3), "Preferences must have at least 3 genres."]
  },
  recommended: {
    type: String,
    required: "How do you know Silma",
    default: "Nadie / Otra persona"
  },
  readFrom: {
    type: Date,
    required: "Availability to read from",
  },
  readTill: {
    type: Date,
    required: "Availability to read till",
  },
  //Futuro sprint 3
  lastReview: {
    type: Date,
    default: Date.now
  }
});
ReaderSchema.plugin(beautifyUnique);

export const ReaderModel = model("Reader", ReaderSchema);
