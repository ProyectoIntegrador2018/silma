import { Schema, model } from "mongoose";
import beautifyUnique from "mongoose-beautiful-unique-validation";

export const TextSchema = new Schema({
  writer: {
    type: Schema.Types.ObjectId,
    ref: "Writer"
  },
  title: {
    type: String,
    required: true
  },
  registerNumber: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    minlength: [20, "Description is too short. It has to be at least 20 characters."],
    maxlength: [200, "Description is too large. It has to be at most 200 characters."],
  },
  genre: {
    type: Schema.Types.ObjectId,
    ref: "Genre"
  },
  numberOfPages: {
    type: Number,
    required: true
  },
  phase: {
    type: Number,
    default: 1,
    min: 1,
    max: 4
  },
  documentPath: {
    type: String,
    default: ''
  }
});
TextSchema.plugin(beautifyUnique);

export const TextModel = model("Text", TextSchema);
