import { Schema, model } from "mongoose";
import beautifyUnique from "mongoose-beautiful-unique-validation";
import { rangeRule } from "@/utils/validators";

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
    minlength: [
      20,
      "Description is too short. It has to be at least 20 characters."
    ],
    maxlength: [
      200,
      "Description is too large. It has to be at most 200 characters."
    ]
  },
  genres: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subgenre"
      }
    ],
    validate: [rangeRule(1, 3), "Genres length is not inside its boundries."]
  },
  ageRange: {
    type: String,
    enum: ["10-12", "13-15", "16-18", "18+"],
    required: true
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
  numberOfChapters: {
    type: Number,
    required: true
  },
  isRejected: {
    type: Boolean,
    default: false
  },

  datesPerPhase: {
    type: Object,
    default:{
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
      7: null,
      8: null,
      9: null
    }
  }

}, {timestamps: true});
TextSchema.plugin(beautifyUnique);

export const TextModel = model("Text", TextSchema);
